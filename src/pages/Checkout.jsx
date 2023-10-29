import { useContext, useReducer, useState } from "react";
import Coupon from "../components/Coupon";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// countries import / error handling
import { countries } from "../utils/helper";
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
      return { ...state, error: {}, loading: true };
    case "ORDER_SUCCESS":
      return { ...state, error: {}, loading: false };
    case "ORDER_ERROR":
      const err = action.payload;
      return { ...state, error: err, loading: false };
    case "ADD_DISCOUNT":
      return { ...state, discountLoading: true };
    case "DISCOUNT_ADDED":
      return { ...state, discountLoading: false };
    case "DISCOUNT_ERROR":
      return { ...state, discountLoading: false };
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
  const [discount, setDiscount] = useState(0);
  const [{ loading, error, discountLoading }, dispatch] = useReducer(reducer, {
    loading: false,
    error: {},
    discountLoading: false,
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
  // var discount = 0; //not react
  const handleCoupon = async (e) => {
    e.preventDefault();
    if (coupon.length < 1) {
      toast.info("please enter a coupon  or skip");
    } else {
      try {
        dispatch({ type: "ADD_DISCOUNT" });
        const {
          data: { value },
        } = await backendInstance.post("/api/coupons/coupon/use", {
          name: coupon,
        });

        if (value) {
          dispatch({ type: "DISCOUNT_ADDED" });
          setDiscount(value);
          toast.success(`$ ${value}.00 discount added`);
          // console.log(value, discount);
        } else {
          setDiscount(0);
          dispatch({ type: "DISCOUNT_ERROR" });
        }
        //second fetch
        // dispatch({ type: "ADD_DISCOUNT", payload: val });
      } catch (err) {
        const {
          response: {
            data: { message },
          },
        } = err;
        toast.error(message);
        setDiscount(0);
        console.log(discount);
        dispatch({ type: "DISCOUNT_ERROR" });
      }
    }
  };
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
      dispatch({ type: "PLACE_ORDER" });
      const date = new Date(Date.now());
      const { data: res } = await backendInstance.post(
        "/api/orders/order",
        {
          orderItems,
          shippingDetails,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice: totalPrice - discount,
          discount,
          date: date,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      // console.log(res);
      if (res.error) {
        dispatch({ type: "ORDER_ERROR", payload: res.error });
      } else {
        dispatch({ type: "ORDER_SUCCESS", payload: res });
        ctxDispatch({
          type: "ORDER_SUCCESS",
          payload: res.shippingDetails,
        });
        localStorage.removeItem("cartItems");
        localStorage.setItem(
          "shippingDetails",
          JSON.stringify(res.shippingDetails)
        );
        navigate("/");
      }
    } catch (error) {
      // console.log(error);
      const {
        response: { data },
      } = error;
      // console.log(data.message);
      dispatch({ type: "ORDER_ERROR", payload: data.message });
      toast.error(data.message);
    }
  };
  return (
    <div className="checkout my-4">
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      {cartItems && cartItems.length > 0 ? (
        <div className="content ">
          <h1 className="text-3xl font-bold ">Checkout</h1>
          <div className="coupon w-full bg-primary-200 p-2 border-l-[6px] border-secondary text-white">
            <Coupon couponHandler={setCoupon} />
          </div>
          <button
            onClick={handleCoupon}
            className="w-[97px] text-center whitespace-nowrap bg-primary-200 hover:opacity-80 text-white font-semibold px-1 py-2 mt-1 rounded-md"
          >
            {discountLoading ? (
              <span className="loader h-[20px] w-[20px]"></span>
            ) : (
              "use coupon"
            )}
          </button>

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
