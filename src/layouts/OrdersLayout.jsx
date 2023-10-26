import { BiSearchAlt } from "react-icons/bi";
import { Outlet } from "react-router-dom";

const OrdersLayout = () => {
  return (
    <div className="orders my-4">
      <h2 className="font-semibold text-2xl text-center">Order history</h2>
      <div className="search-section mt-5 ">
        <div className="content flex items-center justify-between">
          <div>Order no.</div>
          <form className="basis-3/4 flex items-center">
            <input
              type="text"
              className="bg-img focus:outline-none w-[90%] py-1 px-2"
            />
            <button className="px-1 py-2 bg-blue-950">
              <BiSearchAlt className="text-white font-bold w-8" />
            </button>
          </form>
        </div>
        <main className="mt-4 overflow-y-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OrdersLayout;
