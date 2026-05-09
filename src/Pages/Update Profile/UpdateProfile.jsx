import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  useEffect(() => {
    document.title = "Game Verse | Update Profile";
  }, []);

  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    updateProfile(user, {
      displayName: data.displayName,
      photoURL: data.photoURL,
    })
      .then(() => toast.success("Profile updated successfully!"))
      .catch(() => toast.error("Failed to update profile."));
  };

  return (
    <div>
      <ToastContainer />
      <div className="hero bg-transparent m-auto mt-[100px] mb-[100px]">
        <div className="hero-content flex-col">
          <h1 className="text-5xl font-bold text-white">Update Profile</h1>
          <div className="card shrink-0 w-full lg:w-[500px] max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="m-auto">
                <img
                  className="h-[150px] w-[150px] rounded-full object-cover"
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co.com/L1GSjRB/icons8-game-controller-64.png"
                  }
                  alt="Profile"
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Name</span></label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  {...register("displayName", { required: true })}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Photo URL</span></label>
                <input
                  type="url"
                  defaultValue={user?.photoURL}
                  {...register("photoURL", { required: true })}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Email</span></label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  className="input input-bordered opacity-60"
                />
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn text-xl w-full border-indigo-400 bg-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400 text-white"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
