import { useContext, useReducer, useState } from "react";
import Coupon from "../components/Coupon";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// countries import / error handling
import getError, { countries } from "../utils/helper";
// context
import { Store } from "../services/Store";
// api
import backendInstance from "../utils/api";

// components
import EmptyCart from "../components/EmptyCart";
import CheckoutInfo from "../components/CheckoutInfo";
import CheckoutButton from "../components/CheckoutButton";

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "PLACE_ORDER":
      return { ...state, error: "", loading: true };
    case "ORDER_SUCCESS":
      return { ...state, error: "", loading: false };
    case "ORDER_ERROR":
      const err = action.payload;
      return { ...state, error: err, loading: false };
    case "ADD_DISCOUNT":
      return { ...state, discount: action.payload };
    default:
      return state;
  }
};

const Checkout = () => {
  // cartItems shippingAddress
  const {
    state: {
      cart: { cartItems, shippingDetails },
      userInfo,
    },
    ctxDispatch,
  } = useContext(Store);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(
    shippingDetails ? shippingDetails.firstName : ""
  );
  const [lastName, setLastName] = useState(
    shippingDetails ? shippingDetails.lastName : ""
  );
  const [email, setEmail] = useState(
    shippingDetails ? shippingDetails.email : ""
  );
  const [phone, setPhone] = useState(
    shippingDetails ? shippingDetails.phone : ""
  );
  const [address, setAddress] = useState(
    shippingDetails ? shippingDetails.address : ""
  );
  const [country, setCountry] = useState(
    shippingDetails ? shippingDetails.country : "Afghanistan"
  );
  const [city, setCity] = useState(shippingDetails ? shippingDetails.city : "");
  const [coupon, setCoupon] = useState("");
  const [postalCode, setPostalCode] = useState(
    shippingDetails ? shippingDetails.postalCode : ""
  );
  const [{ loading, error, discount }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    discount: 0,
  });

  // console.log(cartItems);
  //
  const data = {
    error,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    country,
    setCountry,
    countries,
    address,
    setAddress,
    city,
    setCity,
    postalCode,
    setPostalCode,
    cartItems,
  };

  const itemsPrice = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
  const shippingPrice = cartItems.length > 4 ? 0 : cartItems.length + 1 * 2;
  const taxPrice = Math.ceil(cartItems.length + 1 * 0.2);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const handleOrder = async (e) => {
    const orderItems = cartItems.map((item) => ({
      ...item,
      product: item._id,
    }));

    //
    const shippingDetails = {
      firstName,
      lastName,
      phone,
      email,
      address,
      city,
      postalCode,
      country,
    };
    e.preventDefault();
    // coupon
    try {
      if (coupon !== "") {
        const {
          data: { value },
        } = await backendInstance.post("/api/coupons/coupon/use", {
          name: coupon,
        });
        //second fetch
        dispatch({ type: "ADD_DISCOUNT", payload: value });
      }
      dispatch({ type: "PLACE_ORDER" });
      const { data } = await backendInstance.post(
        "/api/orders/order",
        {
          orderItems,
          shippingDetails,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice: totalPrice - discount,
          discount,
        },
        { withCredentials: true }
      );
      if (data.error) {
        dispatch({ type: "ORDER_ERROR", payload: data.error });
      } else {
        dispatch({ type: "ORDER_SUCCESS", payload: data });
        ctxDispatch({
          type: "ORDER_SUCCESS",
          payload: data.shippingDetails,
        });
        localStorage.removeItem("cartItems");
        localStorage.setItem(
          "shippingDetails",
          JSON.stringify(data.shippingDetails)
        );
        navigate("/");
      }
    } catch (error) {
      const {
        response: { data },
      } = error;
      toast.error(data.message);
    }
  };
  return (
    <div className="checkout my-4">
      {cartItems && cartItems.length > 0 ? (
        <div className="content ">
          <h1 className="text-3xl font-bold ">Checkout</h1>
          <div className="coupon w-full bg-primary-200 p-2 border-l-[6px] border-secondary text-white">
            <Coupon couponHandler={setCoupon} />
          </div>
          {/* info section */}
          <div className="grid">
            <CheckoutInfo data={data} />
            <CheckoutButton loading={loading} handleOrder={handleOrder} />
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Checkout;
