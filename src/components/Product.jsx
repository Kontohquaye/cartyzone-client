import { useContext, useState } from "react";
import Rating from "./Rating";
import ReactPaginate from "react-paginate";
import { TbShoppingCartPlus, TbShoppingCartX } from "react-icons/tb";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../services/Store";

const Products = ({ products }) => {
  const {
    state: {
      cart: { cartItems },
    },
    ctxDispatch,
  } = useContext(Store);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;
  const productsViewed = pageNumber * productsPerPage;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const pageCount = Math.ceil(products.length / productsPerPage);

  // disabled button
  const handleClick = () => {
    toast.error("out of stock");
  };

  // add to cart handler
  const addToCartHandler = (product) => {
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? (existItem.quantity += 1) : 1;

    if (product.countInStock < quantity) {
      toast.error("stock is less than quantity needed");
      return;
    }
    if (product.countInStock > quantity) {
      ctxDispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    }
    // console.log(cartItems);
  };

  // product display
  const displayProducts = products
    .slice(productsViewed, productsViewed + productsPerPage)
    .map((product) => {
      return (
        <div
          className="product flex flex-col covered overflow-hidden transform up"
          key={product._id}
        >
          {/* image section */}
          <div className="image bg-img h-64 object-cover mb-2">
            <Link to={`/products/${product.slug}`}>
              <img
                src={product.image}
                alt={product.slug}
                className="h-full w-full object-cover "
              />
            </Link>
          </div>
          {/* details section */}
          <div className="details">
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <Link to={`/products/${product.slug}`}>
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
      );
    });

  return (
    <div className="products">
      <h1 className="text-center sm:text-2xl font-bold  mt-14">Products</h1>
      {/* products section-grid */}
      <div className="product-section grid gap-14 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {displayProducts}
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={changePage}
        activeClassName="active-page"
        disabledClassName="disabled-page"
        containerClassName="paginate-container"
      />
    </div>
  );
};

export default Products;
