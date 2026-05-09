import { useEffect } from "react";
import AdminShopSection from "../../Utilities/Admin Shop Section/AdminShopSection";
import { ToastContainer } from "react-toastify";

const AdminShop = () => {
  useEffect(() => {
    document.title = "Game Verse | Admin Shop";
  }, []);

  return (
    <div>
      <ToastContainer />
      <AdminShopSection />
    </div>
  );
};

export default AdminShop;
