import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// cookie
import Cookies from "js-cookie";
// components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";

const RootLayout = () => {
  const {
    state: { userInfo },
  } = useConte;
  useEffect(() => {
    const userCookie = Cookies.get("cartysign");
    //
    if (userCookie) {
      const maxAge = 3 * 24 * 60 * 60 * 1000;

      // Get the current time in milliseconds
      const currentTime = new Date().getTime();

      // Calculate the expiration date by adding 'maxAgeInMilliseconds' to the current time
      const expirationDate = new Date(currentTime + maxAge);

      // console.log("Expiration Date:", expirationDate);
      if (expirationDate <= new Date()) {
        // console.log("The cookie has expired.");
        userInfo = {};
        localStorage.clear();
      } else {
        // console.log("The cookie is still valid.");
      }
    }

    console.log(userCookie);
  }, []);

  return (
    <div className="root-layout font-raleway h-[100vh]">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-2 min-h-[80vh] overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        limit={2}
        progressClassName={"toast-bar"}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </div>
  );
};

export default RootLayout;
