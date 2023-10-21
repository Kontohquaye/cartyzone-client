import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="root-layout font-raleway">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-2">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        limit={2}
        progressClassName={"toast-bar"}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </div>
  );
};

export default RootLayout;
