import { Link } from "react-router-dom";
import emptyCart from "../assets/empty-cart.jpg";

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <div className="content w-full h-[70vh]">
        <img
          src={emptyCart}
          alt="empty cart"
          className="w-full h-full object-contain"
        />
        <p className="font-semibold text-center">
          Cart is empty,{" "}
          <span className="underline text-blue-600 whitespace-nowrap">
            <Link to="/">Go Shopping</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmptyCart;
