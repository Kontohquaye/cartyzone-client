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

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "PLACE_ORDER":
      return { error: "", loading: true };
    case "ORDER_SUCCESS":
      return { error: "", loading: false };
    case "ORDER_ERROR":
      const err = action.payload;
      return { error: err, loading: false };
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
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
  });

  // console.log(cartItems);
  //

  const handleOrder = async (e) => {
    const itemsPrice = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
    const shippingPrice = cartItems.length > 4 ? 0 : cartItems.length + 1 * 2;
    const taxPrice = Math.ceil(cartItems.length + 1 * 0.2);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    let reducedPrice;
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
    if (coupon !== "") {
      try {
        const {
          data: { value },
        } = await backendInstance.post("/api/coupons/coupon/use", {
          name: coupon,
        });
        reducedPrice = totalPrice - value;
        // console.log(reducedPrice);
      } catch (error) {
        reducedPrice = totalPrice;
        const {
          response: { data },
        } = error;
        toast.error(data.message);
      }
    } else {
      reducedPrice = totalPrice;
    }

    try {
      dispatch({ type: "PLACE_ORDER" });
      const { data } = await backendInstance.post(
        "/api/orders/order",
        {
          orderItems,
          shippingDetails,
          itemsPrice: reducedPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        { withCredentials: true }
      );
      if (data.error) {
        dispatch({ type: "ORDER_ERROR", payload: data.error });
      } else {
        dispatch({ type: "ORDER_SUCCESS", payload: data });
        ctxDispatch({ type: "ORDER_SUCCESS", payload: data.shippingDetails });
        localStorage.removeItem("cartItems");
        localStorage.setItem(
          "shippingDetails",
          JSON.stringify(data.shippingDetails)
        );
        navigate("/");
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
      dispatch({ type: "ORDER_ERROR", payload: getError(error) });
      // console.log(error.message);
      toast.error("Request failed");
    }
  };

  return (
    <div className="checkout my-4">
      {cartItems && cartItems.length > 0 ? (
        <div className="content overflow-x-auto">
          <h1 className="text-3xl font-bold ">Checkout</h1>
          <div className="coupon w-full bg-primary-200 p-2 border-l-[6px] border-secondary text-white">
            <Coupon couponHandler={setCoupon} />
          </div>
          {/* info section */}
          <div className="grid">
            <div className="details grid">
              <div className="checkout-info">
                <div className="billing">
                  <h2 className="mt-8 text-lg font-bold">Billing Details</h2>
                  {/* name */}
                  <div className="name mt-4 ">
                    <div className="first-name basis-1/2">
                      <label htmlFor="firstname" className="text-sm font-bold">
                        First Name <span className=" text-secondary ">*</span>
                      </label>
                      {error && error.firstName ? (
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          value={firstName}
                          placeholder={error.firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                          className="bg-img border border-secondary focus:outline-slate-400 w-full py-1 px-2"
                        />
                      ) : (
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                          className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                        />
                      )}
                    </div>
                    <div className="last-name basis-1/2 mt-4">
                      <label htmlFor="lastname" className="text-sm font-bold">
                        Last Name <span className=" text-secondary">*</span>
                      </label>
                      {error && error.lastName ? (
                        <input
                          type="text"
                          name="lastname"
                          id="lastname"
                          value={lastName}
                          placeholder={error.lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                          className="bg-img border border-secondary focus:outline-slate-400 w-full py-1 px-2"
                        />
                      ) : (
                        <input
                          type="text"
                          name="lastname"
                          id="lastname"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                          className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                        />
                      )}
                    </div>
                  </div>
                  {/* email and phone */}
                  <div className="email-phone mt-4 ">
                    <div className="email basis-1/2 ">
                      <label htmlFor="email" className="text-sm font-bold">
                        Email
                      </label>
                      {error && error.email ? (
                        <input
                          type="text"
                          name="email"
                          id="email"
                          value={email + "is not a valid email"}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          className="bg-img border border-secondary focus:outline-slate-400 w-full py-1 px-2"
                        />
                      ) : (
                        <input
                          type="text"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                        />
                      )}
                    </div>
                    <div className="phone basis-1/2 mt-4">
                      <label htmlFor="phone" className="text-sm font-bold">
                        Phone <span className=" text-secondary">*</span>
                      </label>
                      {error && error.phone ? (
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={phone}
                          placeholder={error.phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          className="bg-img border border-secondary focus:outline-slate-400 w-full py-1 px-2"
                        />
                      ) : (
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                        />
                      )}
                    </div>
                  </div>
                  {/* country */}
                  <div className="country mt-4">
                    <label htmlFor="country" className="text-sm font-bold">
                      Country <span className=" text-secondary">*</span>
                    </label>
                    <select
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                      className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                    >
                      {countries.map((country) => (
                        <option
                          value={country}
                          key={country}
                          className="bg-white "
                        >
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* address */}
                  <div className="address mt-4">
                    <label htmlFor="address" className="text-sm font-bold">
                      Address <span className=" text-secondary">*</span>
                    </label>
                    {error && error.address ? (
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={address}
                        placeholder={error.address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                        className="bg-img border border-secondary focus:outline-slate-400 w-full py-1 px-2"
                      />
                    ) : (
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                        className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                      />
                    )}
                  </div>
                  {/* city /town - postal code */}
                  <div className="city-postal mt-4 ">
                    <div className="city-code basis-1/2">
                      <label htmlFor="city" className="text-sm font-bold">
                        City <span className=" text-secondary">*</span>
                      </label>
                      {error && error.city ? (
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={city}
                          placeholder={error.city}
                          onChange={(e) => {
                            setCity(e.target.value);
                          }}
                          className="bg-img border-secondary border focus:outline-slate-400 w-full py-1 px-2"
                        />
                      ) : (
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                          }}
                          className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                        />
                      )}
                    </div>
                    <div className="postal basis-1/2 mt-4">
                      <label htmlFor="postal" className="text-sm font-bold">
                        Postcode/ZIP <span className=" text-secondary">*</span>
                      </label>
                      {error && error.postalCode ? (
                        <input
                          type="text"
                          name="postal"
                          id="postal"
                          value={postalCode}
                          placeholder={error.postalCode}
                          onChange={(e) => {
                            setPostalCode(e.target.value);
                          }}
                          className="bg-img border-secondary border focus:outline-slate-400 w-full py-1 px-2 "
                        />
                      ) : (
                        <input
                          type="text"
                          name="postal"
                          id="postal"
                          value={postalCode}
                          onChange={(e) => {
                            setPostalCode(e.target.value);
                          }}
                          className="bg-img focus:outline-slate-400 w-full py-1 px-2 "
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="order">
                <h1 className="mt-8  text-lg font-bold">Your order</h1>
                <div className="order-table overflow-y-auto max-h-[385px]">
                  {/* heaader */}
                  <div className="title flex justify-between bg-img py-2 items-center px-3 font-bold text-sm">
                    <p className="basis-1/2">PRODUCT</p>
                    <p className="basis-1/2">TOTAL</p>
                  </div>
                  {/* content */}
                  {cartItems &&
                    cartItems.length > 0 &&
                    cartItems.map((product) => (
                      <div
                        className="product flex items-center justify-between w-full"
                        key={product._id}
                      >
                        <div className="left basis-1/2 py-2 px-3 bg-[#f5f5f5]">
                          {product.name}
                          <span className="pl-1 font-medium font-poppins">
                            x{product.quantity}
                          </span>
                        </div>
                        <div className="right basis-1/2 py-2 pl-2 font-poppins font-light">
                          $ {(product.price * product.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  {/* total */}
                  <div className="total flex">
                    <p className="basis-1/2 pl-3 py-2 bg-[#f5f5f5]  font-bold">
                      Total
                    </p>
                    <p className="basis-1/2 pl-2 py-2 font-poppins font-semibold">
                      ${" "}
                      {cartItems
                        .reduce((a, b) => a + b.quantity * b.price, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto min-w-full">
              <p className="ml-3 mt-4 text-secondary font-semibold text-center">
                You can pay with paypal, a debit or credit card ,payment can be
                made in your order history.
              </p>

              <div className="place-order-btn bg-black  text-white font-bold text-lg   mt-4  hover:bg-opacity-75 w-full">
                <button
                  className="text-center w-full h-full p-4"
                  onClick={(e) => handleOrder(e)}
                >
                  {loading ? <span className="loader"></span> : "Place order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Checkout;
