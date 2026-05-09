import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaUserShield, FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const AdminPanel = () => {
  useEffect(() => {
    document.title = "Game Verse | Admin Panel";
  }, []);

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = () => {
    setLoading(true);
    fetch(`${SERVER}/admins`)
      .then((res) => res.json())
      .then((data) => {
        setAdmins(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load admins");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleRemoveAdmin = (id, email) => {
    if (!window.confirm(`Remove ${email} from admins?`)) return;
    fetch(`${SERVER}/admins/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Admin removed successfully");
          setAdmins((prev) => prev.filter((a) => a._id !== id));
        }
      })
      .catch(() => toast.error("Failed to remove admin"));
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-16 px-4">
      <ToastContainer />
      <div className="flex items-center gap-4 mb-8">
        <FaUserShield className="text-yellow-400 text-5xl" />
        <div>
          <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-300">Manage all administrators</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-white font-semibold">
            All Admins ({admins.length})
          </h2>
          <a
            href="/admin_sign_up"
            className="btn bg-yellow-500 text-white border-yellow-500 hover:bg-white hover:text-yellow-500"
          >
            + Add Admin
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-yellow-400"></span>
          </div>
        ) : admins.length === 0 ? (
          <p className="text-white text-center py-8">No admins found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table text-white">
              <thead>
                <tr className="text-yellow-400">
                  <th>#</th>
                  <th>Email</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, idx) => (
                  <tr key={admin._id} className="hover">
                    <td>{idx + 1}</td>
                    <td className="flex items-center gap-2">
                      <FaUserShield className="text-yellow-400" />
                      {admin.email}
                    </td>
                    <td>
                      {admin.createdAt
                        ? new Date(admin.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <button
                        onClick={() => handleRemoveAdmin(admin._id, admin.email)}
                        className="btn btn-sm bg-red-500 text-white border-red-500 hover:bg-white hover:text-red-500"
                      >
                        <FaTrash /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="glass rounded-2xl p-6 mt-6">
        <h3 className="text-xl text-white font-semibold mb-4">Quick Add Admin by Email</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            fetch(`${SERVER}/admins/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  toast.success(`${email} added as admin!`);
                  e.target.reset();
                  fetchAdmins();
                } else {
                  toast.error(data.message || "Failed to add admin.");
                }
              })
              .catch(() => toast.error("Error adding admin."));
          }}
          className="flex gap-4 flex-wrap"
        >
          <input
            type="email"
            name="email"
            placeholder="existing-user@email.com"
            className="input input-bordered flex-1 min-w-[200px]"
            required
          />
          <button
            type="submit"
            className="btn bg-yellow-500 text-white border-yellow-500 hover:bg-white hover:text-yellow-500"
          >
            Add as Admin
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-2">
          Note: The user must already have a Firebase account before being added here.
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
