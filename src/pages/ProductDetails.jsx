import { useParams } from "react-router-dom";
import data from "../utils/data";
import { Helmet } from "react-helmet-async";
import Rating from "../components/Rating";

const ProductDetails = () => {
  const { slug } = useParams();
  const { products } = data;
  const product = products.find((x) => x.slug === slug);

  return (
    <div className="product-details min-h-[80vh]">
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      {/* details section */}
      <div className="details   my-4 md:flex gap-2 md:h-[70vh]">
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
        <div className="info mt-3 md:mt-0  w-full">
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
          <div className="bottom-details md:flex md:flex-col md:justify-between">
            <div className="mb-2">
              <p className="font-semibold">Product description :</p>
              <p className="h-40 overflow-scroll max-w-full whitespace-normal overflow-x-hidden">
                {product.description}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <button className="bg-primary-200 hover:bg-primary-100 text-white  hover:bg-slate-400 p-2  rounded-3xl mt-2 w-1/2 md:mt-1  ">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
