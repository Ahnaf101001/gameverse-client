import { sendPasswordResetEmail } from "firebase/auth";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import auth from "../../firebase/firebase.init";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  useEffect(() => {
    document.title = "Game Verse | Sign In";
  }, []);

  const { signInUser, signInWithGoogle, signInWithGithub } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        if (result.user.emailVerified) {
          toast.success("Log in successful");
        } else {
          toast.warning("Please verify your email to login.");
        }
        e.target.reset();
        navigate("/");
      })
      .catch(() => toast.error("Invalid email or password"));
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Google sign in successful");
        navigate("/");
      })
      .catch(() => toast.error("Failed to sign in with Google"));
  };

  const handleGithubSignIn = () => {
    signInWithGithub()
      .then(() => {
        toast.success("GitHub sign in successful");
        navigate("/");
      })
      .catch(() => toast.error("Failed to sign in with GitHub"));
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.warning("Please provide an email");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast.warning("Please provide a valid email");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => toast.success("Check your email"))
      .catch(() => toast.error("Failed to send reset email"));
  };

  return (
    <div>
      <ToastContainer />
      <div className="hero bg-transparent m-auto mt-[100px] mb-[100px]">
        <div className="hero-content flex-col lg:flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white">Login now!</h1>
          </div>
          <div className="card shrink-0 w-full lg:w-[500px] max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogIn} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  ref={emailRef}
                  placeholder="email"
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
                <label className="label">
                  <button
                    onClick={handleForgetPassword}
                    type="button"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </button>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-indigo-400 text-xl border-2 border-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400">
                  Sign In
                </button>
              </div>
              <p>
                Not a member?{" "}
                <Link className="text-indigo-400 font-bold" to="/sign_up">
                  Register
                </Link>{" "}
                Now!
              </p>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="btn text-xl flex items-center gap-2"
                >
                  <FaGoogle /> Google
                </button>
                <button
                  type="button"
                  onClick={handleGithubSignIn}
                  className="btn text-xl flex items-center gap-2"
                >
                  <FaGithub /> Github
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
