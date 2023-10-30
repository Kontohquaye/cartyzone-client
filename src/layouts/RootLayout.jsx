import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
// ctx
import { Store } from "../services/Store";

// cookie
import Cookies from "js-cookie";
// components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import { useEffect } from "react";

const RootLayout = () => {
  //
  const navigate = useNavigate();
  const {
    state: { userInfo },
    ctxDispatch,
  } = useContext(Store);
  useEffect(() => {
    if (document.cookie) {
      const cookies = document.cookie.split(";");
      const decodedCookies =
        cookies && cookies.map((cookie) => decodeURIComponent(cookie));
      // console.log(decodedCookies);
      if (decodedCookies) {
        const decodedUserCookies = decodedCookies.filter((cookie) =>
          cookie.includes("cartysign")
        );
        // console.log(decodedUserCookies);
        const cookieValue = decodedUserCookies[0].split("exp");
        const cookieExp = Number(cookieValue[1]);
        const currentDate = new Date(Date.now());

        if (currentDate.getTime() > cookieExp) {
          toast.info("log in section expired");
          ctxDispatch({ type: "LOGIN_EXPIRED" });
          localStorage.removeItem("userInfo");
          navigate("/");
        }
      }
    }
  }, [userInfo]);

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
