import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// api
import backendInstance from "../utils/api";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "./ErrorPage";

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ORDER":
      return { loading: true, error: "", order: [] };
    case "FETCH_SUCCESS":
      return { loading: false, error: "", order: action.payload };
    case "FETCH_ERROR":
      return { loading: false, error: action.payload, order: [] };
    default:
      return state;
  }
};

const OrderDetail = () => {
  const { id } = useParams();
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    order: [],
  });
  useEffect(() => {
    const fetchOrder = async () => {
      dispatch({ type: "FETCH_ORDER" });
      try {
        const {
          data: { order },
        } = await backendInstance.get(`/api/orders/order/get/${id}`, {
          withCredentials: true,
        });
        dispatch({ type: "FETCH_SUCCESS", payload: order });
      } catch (err) {
        const {
          response: {
            data: { error },
          },
        } = err;
        dispatch({ type: "FETCH_ERROR", payload: error });
        toast.error(error);
      }
    };
    fetchOrder();
  }, [id]);
  return (
    <div className="payment">
      {loading && <LoadingPage />}
      {error && <ErrorPage />}
      {!loading && !error && (
        <div className="content">
          <h1 className="font-semibold text-2xl mt-4 text-center">
            Order Details
          </h1>
          <p className="font-medium mt-2">Order-{id}</p>
          <div className="order-details"></div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
