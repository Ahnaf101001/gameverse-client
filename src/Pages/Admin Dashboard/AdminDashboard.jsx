import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import ADBHCards from "../../Utilities/AdminDashboardHistoryCards/ADBHCards";
import "react-toastify/dist/ReactToastify.css";

const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const AdminDashboard = () => {
  useEffect(() => {
    document.title = "Game Verse | Admin Dashboard";
  }, []);

  const [dataLength, setDataLength] = useState(6);
  const { user } = useContext(AuthContext);
  const [ordered, setOrdered] = useState([]);

  // Admin sees ALL orders (no email filter)
  useEffect(() => {
    fetch(`${SERVER}/dash_board`)
      .then((res) => res.json())
      .then((data) => setOrdered(data));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Approve and remove this order?")) return;
    fetch(`${SERVER}/dash_board/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Order approved and removed!");
          setOrdered((prev) => prev.filter((o) => o._id !== id));
        }
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="grid lg:grid-cols-4 animate__animated animate__fadeIn">
        {/* Admin profile sidebar */}
        <section className="col-span-1">
          <div className="hero bg-transparent m-auto mt-[100px]">
            <div className="hero-content flex-col">
              <h1 className="text-4xl font-bold text-yellow-400">Admin Profile</h1>
              <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border-2 border-yellow-500 mb-[50px]">
                <div className="card-body">
                  <div className="m-auto">
                    <img
                      className="h-[150px] w-[150px] rounded-full object-cover"
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co.com/L1GSjRB/icons8-game-controller-64.png"
                      }
                      alt="Admin"
                    />
                  </div>
                  <div className="badge badge-warning mx-auto font-bold">ADMIN</div>
                  <div className="form-control mt-2">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input type="text" value={user?.displayName || "Admin"} readOnly className="input input-bordered" />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input type="email" value={user?.email || ""} readOnly className="input input-bordered" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All orders */}
        <section className="col-span-3 mt-[50px]">
          <div className="text-center mb-6">
            <h2 className="text-3xl text-white font-bold">
              All Pending Orders ({ordered.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {ordered.slice(0, dataLength).map((order) => (
              <ADBHCards key={order._id} order={order} handleDelete={handleDelete} />
            ))}
          </div>
          {ordered.length === 0 && (
            <p className="text-white text-xl text-center mt-12">
              No pending orders.
            </p>
          )}
        </section>
      </div>

      <div className="text-center mt-[50px] mb-[50px]">
        {dataLength < ordered.length && (
          <button
            onClick={() => setDataLength(ordered.length)}
            className="btn text-xl border-indigo-400 bg-indigo-400 hover:bg-white hover:text-indigo-400 text-white"
          >
            Show All
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
