import { useState } from "react";
import Rating from "./Rating";
import ReactPaginate from "react-paginate";
import { TbShoppingCartPlus } from "react-icons/tb";

const Products = ({ products }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;
  const productsViewed = pageNumber * productsPerPage;

  const displayProducts = products
    .slice(productsViewed, productsViewed + productsPerPage)
    .map((product) => {
      return (
        <div
          className="product flex flex-col covered overflow-hidden transform up"
          key={product.id}
        >
          {/* image section */}
          <div className="image bg-img h-64 object-cover mb-2">
            <img
              src={product.image}
              alt={product.slug}
              className="h-full w-full object-cover "
            />
          </div>
          {/* details section */}
          <div className="details">
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <p className="font-semibold">{product.name}</p>
            <div className="flex justify-between items-center">
              <p className="text-secondary font-semibold font-poppins">
                ${product.price.toFixed(2)}
              </p>
              <button className="bg-primary-200 hover:bg-primary-100 w-9 h-9 rounded-full flex justify-center items-center">
                <TbShoppingCartPlus className="text-white" />
              </button>
            </div>
          </div>
        </div>
      );
    });

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const pageCount = Math.ceil(products.length / productsPerPage);
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
