import { Outlet } from "react-router-dom";

const AccountLayout = () => {
  return (
    <div className="account">
      <Outlet />
    </div>
  );
};

export default AccountLayout;
