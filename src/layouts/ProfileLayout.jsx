import { useContext } from "react";
import { Store } from "../services/Store";
import { Outlet } from "react-router-dom";
import { PiPasswordThin } from "react-icons/pi";

const ProfileLayout = () => {
  const {
    state: { userInfo },
  } = useContext(Store);
  return (
    <div className="profile">
      <h2 className="text-center mt-4">
        <span className="font-semibold">Hello, </span>{" "}
        <span className="font-bold text-secondary">{userInfo.username}</span>
      </h2>
      <div className="password flex justify-center items-center max-w-lg mx-auto">
        <div className="flex">
          <PiPasswordThin className="mr-1 font-extrabold text-2xl text-purple-600" />
          <p className="text-primary-200 font-semibold">
            Update password and or username
          </p>
        </div>
      </div>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
