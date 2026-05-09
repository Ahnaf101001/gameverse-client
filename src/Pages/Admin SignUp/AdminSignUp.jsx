import { sendEmailVerification, updateProfile } from "firebase/auth";
import { FaEye, FaEyeSlash, FaUserShield } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

// A simple secret key to prevent random sign-ups as admin.
// In production, use a proper invitation / token system.
const ADMIN_SECRET = "gameverse-admin-2024";

const AdminSignUp = () => {
  useEffect(() => {
    document.title = "Game Verse | Admin Sign Up";
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAdminRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const secretKey = e.target.secretKey.value;

    // Validate admin secret key
    if (secretKey !== ADMIN_SECRET) {
      toast.error("Invalid admin secret key. Contact the system administrator.");
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
      toast.error("Password must have uppercase, lowercase, and be at least 6 characters");
      return;
    }

    try {
      // 1. Create Firebase account
      const result = await createUser(email, password);

      // 2. Update profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoUrl || "https://i.ibb.co.com/L1GSjRB/icons8-game-controller-64.png",
      });

      // 3. Send verification email
      await sendEmailVerification(result.user);

      // 4. Register email in admin collection on server
      const res = await fetch(`${SERVER}/admins/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errData = await res.json();
        toast.error(errData.message || "Failed to register admin on server.");
        return;
      }

      toast.success("Admin account created! Please verify your email.");
      setTimeout(() => navigate("/admin_sign_in"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Email may already be in use.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="hero bg-transparent m-auto mt-[50px] mb-[50px]">
        <div className="hero-content flex-col">
          <div className="text-center flex flex-col items-center gap-3">
            <FaUserShield className="text-yellow-400 text-6xl" />
            <h1 className="text-5xl font-bold text-white">Admin Registration</h1>
            <p className="text-gray-300 text-lg">
              You need a secret key to register as an admin.
            </p>
          </div>
          <div className="card shrink-0 w-full lg:w-[500px] max-w-sm shadow-2xl bg-base-100 border-2 border-yellow-500">
            <form onSubmit={handleAdminRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Admin Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL (optional)</span>
                </label>
                <input
                  name="photoUrl"
                  type="url"
                  placeholder="https://..."
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="admin@email.com"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[52px] text-xl"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Admin Secret Key</span>
                </label>
                <input
                  name="secretKey"
                  type={showSecret ? "text" : "password"}
                  placeholder="Enter secret key"
                  className="input input-bordered border-yellow-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3 top-[52px] text-xl"
                >
                  {showSecret ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-yellow-500 text-xl border-2 border-yellow-500 hover:bg-white hover:border-yellow-500 hover:text-yellow-500">
                  Register as Admin
                </button>
              </div>
              <p className="text-center text-sm">
                Already have an admin account?{" "}
                <Link className="text-yellow-500 font-bold" to="/admin_sign_in">
                  Admin Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
