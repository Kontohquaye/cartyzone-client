import emptyCart from "../assets/empty-cart.jpg";

const EmptyPage = () => {
  return (
    <div className="empty-page">
      <div className="content w-full h-[500px]">
        <img
          src={emptyCart}
          alt="empty cart"
          className="w-full h-full object-contain"
        />
        <p className="font-semibold text-center">No product found</p>
      </div>
    </div>
  );
};

export default EmptyPage;
