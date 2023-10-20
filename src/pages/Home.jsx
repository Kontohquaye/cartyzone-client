import { Helmet } from "react-helmet-async";
import Products from "../components/Product.jsx";
import Rating from "../components/Rating.jsx";
import data from "../utils/data.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";

// context
import { Store } from "../services/Store.jsx";

const Home = () => {
  const { products } = data;
  const featuredProducts = [];
  const allProducts = [];
  const { state, ctxDispatch } = useContext(Store);
  const { cart: cartItems } = state;
  const { cartItems: cartItemList } = cartItems;

  products.forEach((product) => {
    if (product.category === "Featured") {
      featuredProducts.push(product);
    }
    if (product.category !== "Featured") {
      allProducts.push(product);
    }
  });

  // add to cart Handler
  const addToCartHandler = (item) => {
    ctxDispatch({ type: "ADD_TO_CART", payload: item });
    localStorage.setItem("cartItems", JSON.stringify(cartItemList));
  };

  const handleClick = () => {
    toast.error("out of stock");
  };

  return (
    <div className="home mt-4">
      <Helmet>
        <title>Cartyzone | Home</title>
      </Helmet>
      {/* featured Products */}
      <h1 className="text-center sm:text-2xl font-bold">Featured Products</h1>
      <div className="featured-products grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {featuredProducts.map((product) => (
          // featured container
          <div
            className="featured basis-[30%] flex items-center justify-center h-40 "
            key={product.id}
          >
            {/* image section */}
            <div className="image basis-1/2 bg-img h-full  overflow-hidden up">
              <Link to={`/products/${product.slug}`}>
                <img
                  className="h-full w-full "
                  src={product.image}
                  alt={product.slug + "img"}
                />
              </Link>
            </div>
            {/* details section */}
            <div className="details basis-1/2 h-full pl-2 flex flex-col justify-between">
              {/* title and rating */}
              <div>
                <Link to={`/products/${product.slug}`}>
                  <p className="font-semibold hover:text-blue-500 hover:underline">
                    {product.name}
                  </p>
                </Link>

                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </div>
              <div>
                <p className="text-secondary font-semibold font-poppins">
                  ${product.price}
                  .00
                </p>
                <p className="text-accent font-thin">{product.brand}</p>
              </div>
              {product.countInStock > 0 ? (
                <button
                  className="bg-primary-200 hover:bg-primary-100 text-white py-1 hover:bg-slate-400"
                  onClick={() => {
                    addToCartHandler(product);
                  }}
                >
                  Add To Cart
                </button>
              ) : (
                <button
                  onClick={handleClick}
                  className="bg-primary-200 hover:bg-primary-100 text-white py-1 hover:bg-slate-400 "
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Products */}
      <Products products={allProducts} />
    </div>
  );
};

export default Home;
