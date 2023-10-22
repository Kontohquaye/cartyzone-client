import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../services/Store";
import { Link, useNavigate } from "react-router-dom";
import emptyCart from "../assets/empty-cart.jpg";
import { CiTrash } from "react-icons/ci";

const Cart = () => {
  const navigate = useNavigate();
  const redirectBack = () => {
    navigate(-1);
  };
  const {
    state: {
      cart: { cartItems },
    },
    ctxDispatch,
  } = useContext(Store);
  // console.log(cartItems);
  return (
    <div className="cart min-h-[70vh] ">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center mt-3 mb-7">
        Shopping cart
      </h1>
      {/* cart display */}
      {cartItems && cartItems.length <= 0 && (
        <div className="emptycart  w-full h-[70vh]">
          <img
            className="h-[90%] w-full mx-auto  object-contain"
            src={emptyCart}
            alt="empty cart"
          />
          <p className="font-semibold text-center">
            Cart is empty,{" "}
            <span
              className="underline text-blue-600 whitespace-nowrap"
              onClick={redirectBack}
            >
              <Link>Go Shopping</Link>
            </span>
          </p>
        </div>
      )}
      {cartItems && cartItems.length !== 0 && (
        <div className="cart-items grid grid-cols-2">
          {/* left */}
          <div className="left flex flex-col gap-2 bg-img p-3">
            {/* flex col */}

            <div className="title-section flex justify-evenly font-bold mb-2">
              {/* display at end? */}
              <div className="empty"></div>
              <div className="title">PRODUCT</div>
            </div>
            {cartItems.map((product) => (
              // list (flex)
              <div className="row flex " key={product.id}>
                {/* list image */}
                <div className="image basis-1/2  flex justify-center">
                  <div className="overflow-hidden w-32 h-32 bg-[#dddcdc]">
                    <img
                      className="w-full h-full object-contain"
                      src={product.image}
                      alt={product.slug}
                    />
                  </div>
                </div>
                <div className="info basis-1/2">
                  <Link
                    to={`/products/${product.slug}`}
                    className="font-semibold hover:underline hover:text-blue-600"
                  >
                    <h2>{product.name}</h2>
                  </Link>
                  <p className="font-extralight">{product.brand}</p>
                </div>
              </div>
            ))}
          </div>
          {/* right */}
          <div className="right py-3 pl-9">
            <div className="title-section flex justify-between font-bold mb-2">
              <p>PRICE</p>
              <p>QTY</p>
              <p>TOTAL</p>
              <p></p>
            </div>
            {cartItems.map((product) => (
              // right flex row(3)
              <div
                className="row flex justify-between font-semibold h-32 items-center"
                key={product.id}
              >
                <div>$ {product.price.toFixed(2)}</div>
                {/* cart update section */}
                <div className="flex bg-img">
                  <div className="px-2 py-1 bg-[#dddcdc]">
                    <button>-</button>
                  </div>

                  <p className="px-2 py-1 mx-[2px]">{product.quantity}</p>
                  <div className="px-2 py-1 bg-[#dddcdc]">
                    <button>+</button>
                  </div>
                </div>
                <div>$ {(product.price * product.quantity).toFixed(2)}</div>
                <div>
                  <CiTrash className="font-bold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {cartItems && cartItems.length > 0 && (
        <div className="checkout  text-white  flex justify-center mt-4">
          <div className="content bg-primary-200 p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col justify-center items-center gap-3">
            <div className="subtotal flex justify-evenly">
              <span className="font-bold">SUBTOTAL</span>
              <span className="font-semibold ">
                ${" "}
                {cartItems
                  .reduce((a, b) => a + b.price * b.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="check-out-btn">
              <Link to="/signin?redirect=shipping">
                <button className="bg-secondary font-bold py-2 px-4 rounded-md">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
