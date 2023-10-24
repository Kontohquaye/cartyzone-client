import { useContext, useState } from "react";
import Coupon from "../components/Coupon";

// countries import
import { countries } from "../utils/helper";
// context
import { Store } from "../services/Store";

// components
import EmptyCart from "../components/EmptyCart";

const Checkout = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();

  // cartItems
  const {
    state: {
      cart: { shippingDetails, cartItems },
      userInfo,
    },
    ctxDispatch,
  } = useContext(Store);

  return (
    <div className="checkout my-4">
      {cartItems && cartItems.length > 0 ? (
        <div className="content">
          <h1 className="text-3xl font-bold ">Checkout</h1>
          <div className="coupon w-full bg-primary-200 p-2 border-l-[6px] border-secondary text-white">
            <Coupon />
          </div>
          {/* info section */}
          <div className="details grid max-h-[70vh]">
            <div className="checkout-info">
              <div className="billing">
                <h2 className="mt-8 text-lg font-bold">Billing Details</h2>
                {/* name */}
                <div className="name mt-4 flex justify-between items-center gap-7">
                  <div className="first-name basis-1/2">
                    <label htmlFor="firstname" className="text-sm font-bold">
                      First Name <span className=" text-secondary ">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                    />
                  </div>
                  <div className="last-name basis-1/2">
                    <label htmlFor="lastname" className="text-sm font-bold">
                      Last Name <span className=" text-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                    />
                  </div>
                </div>
                {/* email and phone */}
                <div className="email-phone mt-4 flex justify-between items-center gap-7">
                  <div className="email basis-1/2">
                    <label htmlFor="email" className="text-sm font-bold">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                    />
                  </div>
                  <div className="phone basis-1/2">
                    <label htmlFor="phone" className="text-sm font-bold">
                      Phone <span className=" text-secondary">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                    />
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
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                  />
                </div>
                {/* city /town - postal code */}
                <div className="city-postal mt-4 flex justify-between items-center gap-7">
                  <div className="city-postal basis-1/2">
                    <label htmlFor="city" className="text-sm font-bold">
                      City <span className=" text-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                    />
                  </div>
                  <div className="postal basis-1/2">
                    <label htmlFor="postal" className="text-sm font-bold">
                      Postcode/ZIP <span className=" text-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      name="postal"
                      id="postal"
                      className="bg-img focus:outline-slate-400 w-full py-1 px-2 "
                    />
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
                  <p className="basis-1/2 pl-3 py-2">
                    ${" "}
                    {cartItems
                      .reduce((a, b) => a + b.quantity * b.price, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="ml-3 mt-4 text-secondary font-semibold text-center">
            You can pay with paypal, a debit or credit card{" "}
          </p>

          <div className="place-order-btn bg-black  text-white font-bold text-lg   mt-4  hover:bg-opacity-75 w-full">
            <button className="text-center w-full h-full p-4">
              Place order
            </button>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Checkout;
