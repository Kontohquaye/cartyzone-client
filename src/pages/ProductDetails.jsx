import { useParams } from "react-router-dom";
import data from "../utils/data";
import { Helmet } from "react-helmet-async";
import Rating from "../components/Rating";
import { toast } from "react-toastify";
import { useContext } from "react";
import { Store } from "../services/Store";

const ProductDetails = () => {
  const { slug } = useParams();
  const { products } = data;
  const {
    state: {
      cart: { cartItems },
    },
    ctxDispatch,
  } = useContext(Store);
  const product = products.find((x) => x.slug === slug);
  const handleClick = () => {
    toast.error("out of stock");
  };

  // add to cart functionality
  const addToCartHandler = (product) => {
    const existItem = cartItems.find((item) => item.id === product.id);
    const quantity = existItem ? (existItem.quantity += 1) : 1;

    if (product.countInStock < quantity) {
      toast.error("stock is less than quantity needed");
      return;
    } else {
      ctxDispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    } // console.log(cartItems);
  };

  return (
    <div className="product-details min-h-[80vh]">
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      {/* details section */}
      <div className="details sm:flex   my-4  gap-2 sm:h-[60vh]">
        {/* image section */}
        <div className="image overflow-hidden h-96 md:h-full bg-img w-full">
          <img
            src={product.image}
            alt={product.name}
            className="object-center object-contain w-full h-full"
          />
        </div>
        {/*  */}
        {/* info */}
        <div className="info mt-3  sm:mt-0 h-full  w-full sm:flex sm:flex-col ">
          <div className="top-details">
            <div>
              <h1 className="font-bold  text-2xl">{product.name}</h1>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </div>

            {/* stock */}
            <div className="mt-4 md:mt-10">
              {product.countInStock > 0 ? (
                <p className="flex  justify-between items-center">
                  <span className="font-semibold">Status:</span>

                  <span className=" bg-green-100 px-4 py-2 rounded-md text-green-800 font-bold ml-2">
                    In Stock
                  </span>
                </p>
              ) : (
                <p className="flex  justify-between">
                  <span className="font-semibold">Status:</span>

                  <span className="bg-red-100 px-4 py-2 rounded-md text-red-700 font-bold ml-2">
                    Out of Stock
                  </span>
                </p>
              )}
            </div>
            <p className="font-poppins mt-4 flex justify-between items-center mb-4 md:mt-7">
              <span className="font-semibold ">Price :</span>
              <span className="font-bold text-secondary px-4 py-2">
                ${product.price.toFixed(2)}
              </span>
            </p>
          </div>
          {/* bottom section */}
          <div className="bottom-details sm:flex sm:flex-col sm:justify-between h-full ">
            <div className="mb-2 sm:mb-0">
              <p className="font-semibold">Product description :</p>
              <p className="max-h-24 overflow-scroll w-full whitespace-normal overflow-x-hidden">
                {product.description}
              </p>
            </div>
            <div className="flex justify-center items-center">
              {product.countInStock > 0 ? (
                <button
                  onClick={() => {
                    addToCartHandler(product);
                  }}
                  className="bg-primary-200 hover:bg-primary-100 text-white  hover:bg-slate-400 p-2  rounded-3xl mt-2 sm:mt-0 w-1/2   "
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  onClick={handleClick}
                  className="bg-primary-200 hover:bg-primary-100 text-white  hover:bg-slate-400 p-2  rounded-3xl mt-2 sm:mt-0 w-1/2   "
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
