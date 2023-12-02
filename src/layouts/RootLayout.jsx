import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ctx
import { Store } from "../services/Store";

// components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="root-layout font-raleway h-[100vh]">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-2 min-h-[80vh] overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        limit={3}
        progressClassName={"toast-bar"}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </div>
  );
};

export default RootLayout;
