import { useState } from "react";

const Coupon = () => {
  const [clicked, setClicked] = useState(false);
  const [initialText, setInitialText] = useState("");
  const [couponValue, setCouponValue] = useState(
    "Click here to enter your code"
  );
  return (
    <div className="coupon">
      <div className="content flex items-center w-full text-xs">
        <p className="whitespace-nowrap mr-2 font-light">Have a coupon?</p>
        <input
          type="text"
          value={clicked ? initialText : couponValue}
          onClick={() => {
            setClicked(true);
          }}
          onChange={(e) => {
            setClicked(false);
            setCouponValue(e.target.value);
            setInitialText(couponValue);
          }}
          className="focus:outline-none w-full bg-inherit font-semibold"
        />
      </div>
    </div>
  );
};

export default Coupon;
