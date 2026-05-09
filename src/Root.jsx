import { Outlet } from "react-router-dom";
import NavBar from "./Shared/NavBar/NavBar";
import Footer from "./Shared/Footer/Footer";

// Using a dark space background via CSS instead of a local asset
// so the project works without the image file being present
const Root = () => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        minHeight: "100vh",
        backgroundAttachment: "fixed",
      }}
    >
      <NavBar />
      <div className="max-w-[1660px] m-auto px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
