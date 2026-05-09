import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Profile = () => {
  useEffect(() => {
    document.title = "Game Verse | Profile";
  }, []);

  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="hero bg-transparent m-auto mt-[100px] mb-[100px]">
        <div className="hero-content flex-col">
          <h1 className="text-5xl font-bold text-white">User Profile</h1>
          <div className="card shrink-0 w-full lg:w-[500px] max-w-sm shadow-2xl bg-base-100 mb-[50px]">
            <div className="card-body">
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
                <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Email</span></label>
                <input type="email" value={user?.email || ""} readOnly className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Photo URL</span></label>
                <input type="url" value={user?.photoURL || ""} readOnly className="input input-bordered" />
              </div>
              <p className="mt-3">
                Want to{" "}
                <Link to="/update_profile">
                  <span className="text-indigo-400 font-semibold">Update Profile</span>
                </Link>{" "}
                ?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
