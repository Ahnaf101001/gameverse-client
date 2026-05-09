import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserShield } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const AdminSignIn = () => {
  useEffect(() => {
    document.title = "Game Verse | Admin Sign In";
  }, []);

  const { signInUser, isAdmin, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  // If already logged in as admin, redirect
  useEffect(() => {
    if (user && isAdmin) navigate("/admin_shop");
  }, [user, isAdmin, navigate]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // 1. Sign in with Firebase
      await signInUser(email, password);

      // 2. Check admin status from server
      const res = await fetch(
        `${SERVER}/admins/check?email=${encodeURIComponent(email)}`
      );
      const data = await res.json();

      if (!data.isAdmin) {
        toast.error("Access denied. You are not an admin.");
        return;
      }

      toast.success("Admin login successful!");
      setTimeout(() => navigate("/admin_shop"), 1000);
    } catch {
      toast.error("Invalid credentials or not an admin account.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="hero bg-transparent m-auto mt-[100px] mb-[100px]">
        <div className="hero-content flex-col">
          <div className="text-center flex flex-col items-center gap-3">
            <FaUserShield className="text-yellow-400 text-6xl" />
            <h1 className="text-5xl font-bold text-white">Admin Login</h1>
            <p className="text-gray-300 text-lg">Restricted access — admins only</p>
          </div>
          <div className="card shrink-0 w-full lg:w-[500px] max-w-sm shadow-2xl bg-base-100 border-2 border-yellow-500">
            <form onSubmit={handleAdminLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Admin Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  ref={emailRef}
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
              <div className="form-control mt-6">
                <button className="btn bg-yellow-500 text-xl border-2 border-yellow-500 hover:bg-white hover:border-yellow-500 hover:text-yellow-500">
                  Admin Sign In
                </button>
              </div>
              <div className="divider">OR</div>
              <p className="text-center text-sm">
                New admin?{" "}
                <Link className="text-yellow-500 font-bold" to="/admin_sign_up">
                  Register as Admin
                </Link>
              </p>
              <p className="text-center text-sm">
                Regular user?{" "}
                <Link className="text-indigo-400 font-bold" to="/sign_in">
                  User Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
