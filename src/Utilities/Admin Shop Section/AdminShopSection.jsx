import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AdminShopCards from "../Admin Shop Cards/AdminShopCards";
import { toast } from "react-toastify";

const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const AdminShopSection = () => {
  const [dataLength, setDataLength] = useState(6);
  const [shops, setShops] = useState(useLoaderData());

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this game?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${SERVER}/shop/${id}`, { method: "DELETE" });
      if (response.ok) {
        setShops(shops.filter((shop) => shop._id !== id));
        toast.success("Game deleted successfully!");
      } else {
        toast.error("Failed to delete the game.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="m-auto text-center flex flex-col gap-[32px] text-white mb-8">
        <h1 className="text-5xl font-bold">Manage Games</h1>
        <p className="text-xl text-gray-300">
          Total: {shops.length} games — you can update or delete any game below.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 mt-[50px]">
        {shops.slice(0, dataLength).map((shop) => (
          <AdminShopCards key={shop._id} shop={shop} handleDelete={handleDelete} />
        ))}
      </div>
      <div className="text-center mt-[50px] mb-[50px]">
        {dataLength < shops.length && (
          <button
            onClick={() => setDataLength(shops.length)}
            className="btn text-xl border-indigo-400 hover:border-indigo-400 bg-indigo-400 hover:bg-white hover:text-indigo-400 text-white"
          >
            Show All Games
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminShopSection;
