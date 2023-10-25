import { useState } from "react";

const Coupon = ({ couponHandler }) => {
  const [couponValue, setCouponValue] = useState("");
  const updateCoupon = () => {
    couponHandler(couponValue);
  };
  return (
    <div className="coupon">
      <div className="content flex items-center w-full text-xs">
        <p className="whitespace-nowrap mr-2 font-light">Have a coupon?</p>
        <input
          type="text"
          value={couponValue}
          placeholder="Click here to enter your code"
          onChange={(e) => {
            setCouponValue(e.target.value);
          }}
          onBlur={(e) => {
            setCouponValue(e.target.value);
            updateCoupon();
          }}
          className="focus:outline-none font-poppins w-full bg-inherit font-semibold"
        />
      </div>
    </div>
  );
};

export default Coupon;
