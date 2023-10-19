import { Outlet } from "react-router-dom";

// components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="root-layout font-poppins">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
