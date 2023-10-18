import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="root-layout ">
      <Navbar />
      <main className="max-w-[1200px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
