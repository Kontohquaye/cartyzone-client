import Products from "../components/Product.jsx";
import data from "../utils/data.js";

const Home = () => {
  const { products } = data;
  const featuredProducts = [];
  const allProducts = [];

  products.forEach((product) => {
    if (product.category === "Featured") {
      featuredProducts.push(product);
    }
    if (product.category !== "Featured") {
      allProducts.push(product);
    }
  });

  return (
    <div className="home mt-4">
      <h1 className="text-center sm:text-2xl font-bold">Featured Products</h1>
      <div className="featured-products grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {featuredProducts.map((product) => (
          // featured container
          <div
            className="featured basis-[30%] flex items-center justify-center h-40 "
            key={product.id}
          >
            {/* image section */}
            <div className="image basis-1/2 bg-img h-full  overflow-hidden">
              <img
                className="h-full w-full "
                src={product.image}
                alt={product.slug + "img"}
              />
            </div>
            {/* details section */}
            <div className="details basis-1/2 h-full pl-2 flex flex-col justify-between">
              {/* title and rating */}
              <div>
                <p className="font-semibold">{product.name}</p>
                <p>rating</p>
              </div>
              <div>
                <p className="text-secondary font-semibold">
                  ${product.price}
                  .00
                </p>
                <p className="text-accent font-thin">{product.brand}</p>
              </div>
              <button className="bg-primary text-white py-1">
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <Products products={allProducts} />
      <span className="loader"></span>
    </div>
  );
};

export default Home;
