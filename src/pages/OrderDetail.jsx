import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams();
  return (
    <div className="payment">
      <h1>order-{id}</h1>
    </div>
  );
};

export default OrderDetail;
