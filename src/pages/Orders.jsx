import { useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";

// pages
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../pages/ErrorPage";

// api
import backendInstance from "../utils/api";

// context
import { Store } from "../services/Store";
import { Link } from "react-router-dom";

// reduder
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ORDERS":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { error: "", loading: false, orders: action.payload };
    case "FETCH_ERROR":
      return { orders: [], loading: false, error: action.payload };
  }
};

const Orders = () => {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    orders: [],
  });
  const {
    state: { userInfo },
    ctxDispatch,
  } = useContext(Store);
  const { id } = userInfo;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_ORDERS" });
        const {
          data: { orders },
        } = await backendInstance.post(
          "/api/orders/user/all",
          { user: id },
          { withCredentials: true }
        );
        const updatedOrders = orders.map((item) => ({
          ...item,
          date: formatDistanceToNow(new Date(item.date), { addSuffix: true }),
        }));

        // console.log(updatedArray);
        console.log(orders);
        dispatch({ type: "FETCH_SUCCESS", payload: updatedOrders });
      } catch (err) {
        const {
          response: {
            data: { error },
          },
        } = err;
        dispatch({ type: "FETCH_ERROR", payload: error });
        toast.error(error);
        // console.log(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders">
      {loading && <LoadingPage />}
      {error && <ErrorPage />}
      {!loading && !error && orders && orders.length > 0 && (
        <div className="content mt-8 ">
          <h2 className="font-medium">Recent Orders</h2>
          <div className="table w-full min-w-[860px] overflow-x-auto h-[250px]">
            <div className="head grid grid-cols-6 border-b-[1px] border-img font-light">
              <div className="order-id py-2 flex-1">Order id</div>
              <div className="order-date py-2 flex-1">Order date</div>
              <div className="order-price py-2 flex-1">Total</div>
              <div className="order-paid py-2 flex-1">payment status</div>
              <div className="order-delivered py-2 flex-1">delivery status</div>
              <div className="order-details py-2 flex-1"></div>
            </div>
            <div className="order-details">
              {orders.map((order) => (
                <div
                  className="order-list grid grid-cols-6 gap-2 "
                  key={order._id}
                >
                  <div className=" overflow-auto py-2">{order._id}</div>
                  <div className="py-2 overflow-hidden max-w-full">
                    <span className="max-w-full font-light inline-block text-ellipsis">
                      {order.date}
                    </span>
                  </div>
                  <div className="py-2 overflow-hidden">
                    <span className="max-w-full font-poppins inline-block text-ellipsis">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="py-2">
                    <span className="max-w-full inline-block text-ellipsis">
                      {order.isPaid ? (
                        <span className="text-green-400 font-semibold ">
                          Paid
                        </span>
                      ) : (
                        <span className="text-red-400 font-semibold  ">
                          Not Paid
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="py-2 overflow-hidden">
                    <span className="max-w-full inline-block text-ellipsis">
                      {order.isDelivered ? (
                        <span className="text-green-400 font-semibold  ">
                          Delivered
                        </span>
                      ) : (
                        <span className="text-red-400 font-semibold  ">
                          Not Delivered
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="py-2 overflow-hidden">
                    <Link
                      to={`/orders/order/${order._id}`}
                      className="max-w-full inline-block text-ellipsis hover:text-blue-500 hover:underline"
                    >
                      view details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
