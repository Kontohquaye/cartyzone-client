import { Link, useLocation, useNavigate } from "react-router-dom";

// pages
import SearchBox from "../components/SearchBox";
import { useContext, useEffect, useState } from "react";
import { TbShoppingCartPlus, TbShoppingCartX } from "react-icons/tb";
import { toast } from "react-toastify";
import { Store } from "../services/Store";

//api
import backendInstance from "../utils/api";
//components
import Rating from "../components/Rating";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import EmptyPage from "../components/EmptyPage";

//
const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1star & up",
    rating: 1,
  },
];

const Search = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const {
    state: {
      cart: { cartItems },
    },
    ctxDispatch,
  } = useContext(Store);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchData, setSearchData] = useState({});

  //
  const [categories, setCategories] = useState([]);
  const urlQueries = new URLSearchParams(search);
  const category = urlQueries.get("category") || "all";
  const query = urlQueries.get("query") || "all";
  const price = urlQueries.get("price") || "all";
  const rating = urlQueries.get("rating") || "all";
  const order = urlQueries.get("order") || "newest";
  const page = urlQueries.get("page") || 1;
  // console.log({ query, category, page, order, rating, price });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await backendInstance.get(
          "/api/products/categories/get"
        );
        // console.log(data);
        if (data) {
          setCategories(data);
          // console.log(categories);
        }
      } catch (err) {
        toast.error("couldn't fetch categories");
        console.log(err);
      }
    };
    fetchCategories();

    const fetchProducts = async () => {
      // console.log(price);

      setLoading(true);
      try {
        const { data } = await backendInstance.get(
          `/api/products/search/products/query?category=${category}&query=${query}&order=${order}&rating=${rating}&page=${page}&price=${price}`
        );

        setLoading(false);
        setSearchData(data);
      } catch (err) {
        setLoading(false);
        setError(true);
        toast.error("error occurred");
        console.log(err);
      }
    };
    fetchProducts();
  }, [price, category, query, order, rating, page]);

  //cart
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

  //
  const handleClick = () => {
    toast.error("out of stock");
  };
  return (
    <div className="search mt-4">
      <SearchBox />
      {!loading && error && <ErrorPage />}
      {loading && !error && <LoadingPage />}
      {/* {error && <ErrorPage />} */}
      {!loading && !error && (
        <div className="content">
          <div className="filter">
            <h2 className="font-bold text-white p-2 bg-black inline-block">
              FILTER results
            </h2>
            <div className="filters mt-2">
              {/* all */}
              <div
                className={
                  category === "all" &&
                  query === "all" &&
                  rating === "all" &&
                  price === "all"
                    ? "any mb-2 font-bold text-secondary hover:text-blue-700"
                    : "hover:text-blue-700 any mb-2"
                }
              >
                <Link
                  to={`/search?category=all&query=all&rating=all&price=all`}
                >
                  All
                </Link>
              </div>
              <div className="category">
                <h3 className="font-semibold  border-b-[1px] border-[#bebebe] mb-1">
                  Categories
                </h3>
                <div className="c-list flex flex-col gap-2">
                  {categories.map((c) => (
                    <Link
                      to={`/search?category=${c}`}
                      className={
                        category === c
                          ? "text-secondary font-bold hover:text-blue-700"
                          : "hover:text-blue-700"
                      }
                      key={c}
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </div>
              {/* prices */}
              <div className="prices">
                <h3 className="font-semibold  border-b-[1px] border-[#bebebe] mt-2 mb-1">
                  Prices
                </h3>
                <div className="c-list flex flex-col gap-2">
                  {prices.map((p) => (
                    <Link
                      className={
                        price === p.value
                          ? "text-secondary font-bold hover:text-blue-700"
                          : "hover:text-blue-700"
                      }
                      key={p.name}
                      to={`/search?price=${p.value}&rating=${r.rating}&category=${category}&query=${query}&order=${order}`}
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
              {/* avg revs */}
              <div className="reviews mt-2">
                <h3 className="font-semibold  border-b-[1px] border-[#bebebe] mb-1">
                  Avg. Customer Review
                </h3>
                <div className="c-list flex flex-col gap-2">
                  {ratings.map((r) => (
                    <Link
                      className={
                        rating === `${r.rating}` ? "font-bold " : "font-light "
                      }
                      to={`/search?rating=${r.rating}&category=${category}&query=${query}&price=${price}&order=${order}`}
                      key={r.name}
                    >
                      <Rating rating={r.rating} caption={r.name} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="results mt-4">
            {/* images */}
            {searchData &&
            searchData.products &&
            searchData.products.length > 0 ? (
              <div>
                {/*order*/}
                <div className="max-w-full">
                  Sort by{" "}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(
                        `/search?category=${category}&query=${query}&rating=${rating}&price=${price}&order=${e.target.value}`
                      );
                    }}
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </select>
                </div>

                <div className=" products grid gap-2">
                  {searchData.products.map((product) => (
                    <div
                      className="product flex flex-col covered overflow-hidden transform up"
                      key={product._id}
                    >
                      {/* image section */}
                      <div className="image bg-img h-64 object-cover mb-2">
                        <Link to={`products/${product._id}`}>
                          <img
                            loading="lazy"
                            src={product.image}
                            alt={product.slug}
                            className="h-full w-full object-contain "
                          />
                        </Link>
                      </div>
                      {/* details section */}
                      <div className="details">
                        <Rating
                          rating={product.rating}
                          numReviews={product.numReviews}
                        />
                        <Link to={`products/${product._id}`}>
                          <p className="font-semibold hover:text-blue-500 hover:underline">
                            {product.name}
                          </p>
                        </Link>

                        <div className="flex justify-between items-center">
                          <p className="text-secondary font-semibold font-poppins">
                            ${product.price.toFixed(2)}
                          </p>

                          {product.countInStock > 0 ? (
                            <button
                              onClick={() => {
                                addToCartHandler(product);
                              }}
                              className="bg-primary-200 hover:bg-primary-100 w-9 h-9 rounded-full flex justify-center items-center"
                            >
                              <TbShoppingCartPlus className="text-white" />
                            </button>
                          ) : (
                            <button
                              onClick={handleClick}
                              className="bg-primary-100 hover:bg-zinc-600 w-9 h-9 rounded-full flex justify-center items-center"
                            >
                              <TbShoppingCartX className="text-white" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <EmptyPage />
            )}
            {searchData &&
              searchData.products &&
              searchData.products.length > 0 &&
              searchData.pages && (
                <div className="btns     flex justify-center mt-3 overflow-x-auto">
                  <div className="flex mx-auto p-2 gap-1 max-w-full">
                    {Array.from({ length: searchData.pages }, (_, index) => {
                      return (
                        <Link
                          to={`/search?category=${category}&query=${query}&rating=${rating}&price=${price}&order=${order}&page=${
                            index + 1
                          }`}
                          key={index}
                        >
                          <button
                            className={
                              index + 1 === Number(page)
                                ? "font-poppins font-semibold bg-primary-200 text-white w-10 h-10 rounded-lg "
                                : "font-poppins font-semibold bg-img w-10 h-10 rounded-lg "
                            }
                          >
                            {index + 1}
                          </button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
