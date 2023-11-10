import { Helmet } from "react-helmet-async";
import Products from "../components/Product.jsx";
import Rating from "../components/Rating.jsx";
import LoadingPage from "../components/LoadingPage.jsx";
import { Link } from "react-router-dom";
import { useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

// context
import { Store } from "../services/Store.jsx";

// backend url
import backendInstance from "../utils/api.js";

// helpers
import getError from "../utils/helper.js";
import Error from "./Error.jsx";
import SearchBox from "../components/SearchBox.jsx";

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { loading: true, products: [], error: "" };
    // success
    case "FETCH_SUCCESS":
      const { products } = action.payload;
      // console.log(products);
      return { loading: false, products: products, error: "" };

    // failed fetch
    case "FETCH_FAIL":
      return { loading: false, products: [], error: action.payload };
  }
};

const initialState = {
  loading: true,
  error: "",
  products: [],
};

const Home = () => {
  const [{ loading, products, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_DATA" });
        const { data } = await backendInstance.get("/api/products");
        // console.log(data);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
        toast.error(getError(error));
      }
    };
    fetchData();
  }, []);
  // const { products } = data;
  const featuredProducts = [];
  const allProducts = [];
  const { state, ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  products.forEach((product) => {
    if (product.category === "Featured") {
      featuredProducts.push(product);
    }
    if (product.category !== "Featured") {
      allProducts.push(product);
    }
  });

  // add to cart Handler
  const addToCartHandler = (product) => {
    const existItem = cartItems.find((item) => item._id === product._id);
    if (!existItem) {
      toast.success("new item added to cart");
    }

    const quantity = existItem ? (existItem.quantity += 1) : 1;
    if (product.countInStock > quantity) {
      ctxDispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    }
    if (product.countInStock < quantity) {
      toast.error("stock is less than quantity needed");
      return;
    }
    // console.log(cartItems);
  };

  const handleClick = () => {
    toast.error("out of stock");
  };

  return (
    <div className="home mt-4">
      <Helmet>
        <title>Cartyzone | Home</title>
      </Helmet>
      {error && <Error />}
      {/* featured Products */}
      <SearchBox />
      {products && products.length > 0 && (
        <h1 className="text-center sm:text-2xl font-bold">Featured Products</h1>
      )}
      {loading && products && products.length < 1 && <LoadingPage />}
      <div className="featured-products grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products &&
          featuredProducts.map((product) => (
            // featured container
            <div
              className="featured basis-[30%] flex items-center justify-center h-40 "
              key={product._id}
            >
              {/* image section */}
              <div className="image basis-1/2 bg-img h-full  overflow-hidden up">
                <Link to={`products/${product._id}`}>
                  <img
                    className="h-full w-full object-contain "
                    src={product.image}
                    alt={product.slug + "img"}
                    loading="lazy"
                  />
                </Link>
              </div>
              {/* details section */}
              <div className="details basis-1/2 h-full pl-2 flex flex-col justify-between">
                {/* title and rating */}
                <div>
                  <Link to={`products/${product._id}`}>
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
      {!loading && products.length > 0 && <Products products={allProducts} />}
    </div>
  );
};

export default Home;
