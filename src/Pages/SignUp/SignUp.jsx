import { sendEmailVerification, updateProfile } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  useEffect(() => {
    document.title = "Game Verse | Sign Up";
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
      toast.error(
        "Password must have uppercase, lowercase, and be at least 6 characters"
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        sendEmailVerification(result.user).then(() =>
          toast.info("Please check your email to verify your account")
        );
        updateProfile(result.user, {
          displayName: name,
          photoURL: photoUrl,
        }).catch(console.error);
        toast.success("Sign Up successful");
        e.target.reset();
      })
      .catch(() => toast.error("Registration failed. Try a different email."));
  };

  return (
    <div>
      <ToastContainer />
      <div className="hero bg-transparent m-auto mt-[50px] mb-[50px]">
        <div className="hero-content flex-col lg:flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white">Register now!</h1>
          </div>
          <div className="card shrink-0 w-full lg:w-[500px] max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  name="photoUrl"
                  type="url"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
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
                <button className="btn bg-indigo-400 text-xl border-2 border-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400">
                  Register
                </button>
              </div>
              <p>
                Already registered?{" "}
                <Link className="text-indigo-400 font-bold" to="/sign_in">
                  Login
                </Link>{" "}
                Now!
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
