const CheckoutButton = ({ loading, handleOrder }) => {
  return (
    <div className="mx-auto min-w-full">
      <p className="ml-3 mt-4 text-secondary font-semibold text-center">
        You can pay with paypal, a debit or credit card ,payment can be made in
        your order history.
      </p>

      <div className="place-order-btn bg-black  text-white font-bold text-lg   mt-4  hover:bg-opacity-75 w-full">
        <button
          className="text-center w-full h-full p-4"
          onClick={(e) => handleOrder(e)}
        >
          {loading ? <span className="loader"></span> : "Place order"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutButton;
