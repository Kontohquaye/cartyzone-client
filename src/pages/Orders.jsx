import { useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { formatDistanceToNow, format, parseISO } from "date-fns";
import { CiTrash } from "react-icons/ci";

// pages
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../pages/ErrorPage";

// api
import backendInstance from "../utils/api";

// context
import { Store } from "../services/Store";
import { Link } from "react-router-dom";
import EmptyCart from "../components/EmptyCart";

// reduder
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ORDERS":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { error: "", loading: false, orders: action.payload };
    case "FETCH_ERROR":
      return { orders: [], loading: false, error: action.payload };
    case "FETCH_DELETE":
      return { ...state, deleting: true };
    case "DELETE_SUCCESS":
      return {
        ...state,
        deleting: false,
        orders: state.orders.filter((order) => order._id !== action.payload),
      };
    case "DELETE_ERROR":
      return { ...state, deleting: false };
    default:
      return state;
  }
};

const Orders = () => {
  const [{ loading, error, orders, deleting }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    orders: [],
    deleting: false,
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
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        );
        const updatedOrders = orders.map((item) => {
          const currentDate = new Date(Date.now());
          const editedOrder = {
            ...item,
            formatedDate: format(parseISO(item.date), "MM/dd/yy"),
            dateDiff: Math.floor(
              Math.abs(currentDate - new Date(item.date)) / 1000 / 60 / 60 / 24
            ),
            agoDate: formatDistanceToNow(new Date(parseISO(item.date)), {
              addSuffix: true,
            }),
          };

          // console.log(edited);
          return editedOrder;
        });

        // console.log(updatedArray);
        // console.log(orders);
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

  const handleDelete = async (itemId) => {
    dispatch({ type: "FETCH_DELETE" });
    try {
      const {
        data: { message },
      } = await backendInstance.delete(`/api/orders/order/get/${itemId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "DELETE_SUCCESS", payload: itemId });
      toast.success(message);
    } catch (err) {
      dispatch({ type: "DELETE_ERROR" });
      const {
        response: {
          data: { error },
        },
      } = err;
      toast.error(error);
    }
  };

  return (
    <div className="orders">
      {orders.length < 1 && !loading && <EmptyCart />}
      {loading && <LoadingPage />}
      {deleting && <LoadingPage />}
      {error && <ErrorPage />}
      {!loading && !deleting && !error && orders && orders.length > 0 && (
        <div className="content mt-8 ">
          <h2 className="font-medium">Recent Orders</h2>
          <div className="table w-full min-w-[860px] overflow-x-auto pb-2">
            <div className="head grid grid-cols-7 mb-2 border-b-[1px] border-img font-light">
              <div className="order-id py-2 ">Order id</div>
              <div className="order-date py-2 ">Order date</div>
              <div className="order-price py-2 ">Total</div>
              <div className="order-paid py-2 ">payment status</div>
              <div className="order-delivered py-2 ">delivery status</div>
              <div className="order-details py-2 ">details</div>
              <div className="order-details py-2 "></div>
            </div>
            <div className="order-details">
              {orders.map((order) => (
                <div
                  className="order-list grid grid-cols-7 gap-2 "
                  key={order._id}
                >
                  <div className=" overflow-auto py-2">{order._id}</div>
                  <div className="py-2 overflow-hidden max-w-full">
                    {order.dateDiff < 1 ? (
                      <span className="max-w-full text-sm text-[#ccc] overflow-hidden font-light inline-block text-ellipsis whitespace-nowrap">
                        {order.agoDate}
                      </span>
                    ) : (
                      <span className="max-w-full font-light inline-block text-ellipsis whitespace-nowrap">
                        {order.formatedDate}
                      </span>
                    )}
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
                  <div className="delete py-2 ">
                    <CiTrash
                      className="cursor-pointer"
                      onClick={() => handleDelete(order._id)}
                    />
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
