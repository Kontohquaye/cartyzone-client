import { useContext, useEffect, useReducer, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import { PiCalendarBlank } from "react-icons/pi";
import { BsPrinter } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { MdLocalShipping } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// api
import backendInstance from "../utils/api";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "./ErrorPage";
// ctx
import { Store } from "../services/Store";
import PayPalButton from "../components/PaypalButton";

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ORDER":
      return { loading: true, error: "", order: {} };
    case "FETCH_SUCCESS":
      return { loading: false, error: "", order: action.payload };
    case "FETCH_ERROR":
      return { loading: false, error: action.payload, order: {} };

    default:
      return state;
  }
};

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    state: { userInfo },
  } = useContext(Store);
  const [{ loading, error, order, loadingPay, successPay }, dispatch] =
    useReducer(reducer, {
      loading: false,
      error: "",
      order: {},
    });
  const printPageRef = useRef();

  useEffect(() => {
    const fetchOrder = async () => {
      dispatch({ type: "FETCH_ORDER" });
      try {
        const { data } = await backendInstance.get(
          `/api/orders/order/get/${id}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        // console.log(data[0]);
        dispatch({ type: "FETCH_SUCCESS", payload: data[0] });
      } catch (err) {
        // console.log(err);
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

    // paypal
  }, [id]);

  const handlePrint = () => {
    // console.log("Print");

    //
    const printContent = ReactDOMServer.renderToStaticMarkup(
      <div className="content" ref={printPageRef}>
        <h1 className="font-semibold text-2xl mt-4 text-center">
          Order Details
        </h1>
        <div className="flex justify-between items-center">
          <div className="left flex items-center">
            <PiCalendarBlank className="text-2xl" />
            <span className="font-poppins font-semibold">
              {format(parseISO(order.date), "EEE MMM dd, yyyy h:mma")}
            </span>
          </div>
          <div className="right cursor-pointer" onClick={handlePrint}>
            <BsPrinter className="text-2xl" />
          </div>
        </div>
        <p className="font-medium mt-2 text-[#999] border-b-[1px] border-img p-2 mb-2">
          Order ID: # {id}
        </p>

        <div className="order-details mt-2">
          <div className="info overflow-x-auto ">
            <div className="details grid grid-cols-3 gap-3 min-w-[900px] py-2 ">
              {/* customer-section */}
              <div className="customer">
                <div className="title ">
                  <div className="account flex items-center">
                    <div className="bg-blue-200 p-1 rounded-full">
                      <BiSolidUser className="text-2xl text-blue-600" />
                    </div>

                    <span className="ml-2 font-semibold">Customer</span>
                  </div>
                </div>
                <div className="details mt-2">
                  <p className="name flex items-center">
                    <span className="font-semibold">Name: </span>{" "}
                    <span className="ml-2 text-[#999] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full">
                      {order.shippingDetails.firstName +
                        " " +
                        order.shippingDetails.firstName}
                    </span>
                  </p>
                  <p className="email flex items-center">
                    <span className="font-semibold">E-mail: </span>{" "}
                    <span className="ml-2 text-[#999] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full">
                      {order.shippingDetails.email}
                    </span>
                  </p>
                  <p className="phone flex items-center">
                    <span className="font-semibold">Phone: </span>{" "}
                    <span className="ml-2 text-[#999] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full font-poppins">
                      {order.shippingDetails.phone}
                    </span>
                  </p>
                </div>
              </div>

              {/* order info */}
              <div className="order-info">
                <div className="title">
                  <div className="account flex items-center">
                    <div className="bg-blue-200 p-1 rounded-full">
                      <MdLocalShipping className="text-2xl text-blue-600" />
                    </div>
                    <span className="ml-2 font-semibold">Order Info</span>
                  </div>
                </div>
                <div className="details mt-2">
                  <p className="shipping flex items-center">
                    <span className="font-semibold">Shipping: </span>{" "}
                    <span className="ml-2 text-[#999] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full">
                      Fargo express
                    </span>
                  </p>
                  <p className="payment flex items-center">
                    <span className="font-semibold">Payment method: </span>{" "}
                    <span className=" text-[#999] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full ml-1">
                      Card / paypal
                    </span>
                  </p>
                  <p className="Status">
                    <span className="font-semibold">Status: </span>{" "}
                    <span
                      className={
                        order.isPaid
                          ? "text-green-400 font-semibold"
                          : "text-red-400 font-semibold"
                      }
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </p>
                </div>
              </div>
              {/* delivery */}
              <div className="delivery">
                <div className="title">
                  <div className="account flex items-center">
                    <div className="bg-blue-200 p-1 rounded-full">
                      <FaLocationDot className="text-2xl text-blue-600" />
                    </div>
                    <span className="ml-2 font-semibold">Deliver to</span>
                  </div>
                </div>
                <div className="details mt-2">
                  <p className="city flex items-center">
                    <span className="font-semibold">City: </span>{" "}
                    <span className=" text-[#999] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full ml-1">
                      {order.shippingDetails.city}
                    </span>
                  </p>
                  <p className="address flex max-h-[24px] overflow-y-auto hover:cursor-grab ">
                    <span className="font-semibold">Address: </span>{" "}
                    <span className="text-[#999] ml-1">
                      {order.shippingDetails.address +
                        ", " +
                        order.shippingDetails.country}
                    </span>
                  </p>
                  <p className="postal-code flex items-center">
                    <span className="font-semi-bold">Postal Code: </span>{" "}
                    <span className="text-[#888] font-medium font-poppins">
                      {order.shippingDetails.postalCode}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="status"></div>
          </div>
          <div className="items mt-3 min-w-[500px] overflow-x-auto">
            <div className="title grid grid-cols-4 text-[#999] font-semibold py-2 border-b-[1px] border-[#ccc] mb-3">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>
            <div className="items-detail flex flex-col gap-2">
              {order.orderItems.map((item) => (
                <div
                  className="item font-poppins grid grid-cols-4"
                  key={item.product}
                >
                  <div className="img rounded-md h-12 w-12 overflow-hidden bg-img">
                    <img
                      className="w-full h-full object-contain"
                      src={item.image}
                      alt={item.slug}
                    />
                  </div>
                  <div className="price ">${item.price.toFixed(2)}</div>
                  <div className="quantity pl-2">{item.quantity}</div>
                  <div className="total">$ {item.quantity * item.price}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="summary"></div>
        </div>
      </div>
    );

    const printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.open();
    printWindow.document.write(`
    <html>
      <head>
        <title>Order details</title>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.print();
  };
  return (
    <div className="payment">
      {loading && <LoadingPage />}
      {error && <ErrorPage />}
      {!loading && !error && order && order.shippingDetails && (
        <div className="content" ref={printPageRef}>
          <h1 className="font-semibold text-2xl mt-4 text-center">
            Order Details
          </h1>
          <div className="flex justify-between items-center">
            <div className="left flex items-center">
              <PiCalendarBlank className="text-2xl" />
              <span className="font-poppins font-semibold">
                {format(parseISO(order.date), "EEE MMM dd, yyyy h:mma")}
              </span>
            </div>
            <div className="right cursor-pointer" onClick={handlePrint}>
              <BsPrinter className="text-2xl" />
            </div>
          </div>
          <p className="font-medium mt-2 text-[#999] border-b-[1px] border-img p-2 mb-2">
            Order ID: # {id}
          </p>

          <div className="order-details mt-2">
            <div className="info overflow-x-auto ">
              <div className="details grid grid-cols-3 gap-3 min-w-[900px] py-2 ">
                {/* customer-section */}
                <div className="customer">
                  <div className="title ">
                    <div className="account flex items-center">
                      <div className="bg-blue-200 p-1 rounded-full">
                        <BiSolidUser className="text-2xl text-blue-600" />
                      </div>

                      <span className="ml-2 font-semibold">Customer</span>
                    </div>
                  </div>
                  <div className="details mt-2">
                    <p className="name flex items-center">
                      <span className="font-semibold">Name: </span>{" "}
                      <span className="ml-2 text-[#999] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full">
                        {order.shippingDetails.firstName +
                          " " +
                          order.shippingDetails.firstName}
                      </span>
                    </p>
                    <p className="email flex items-center">
                      <span className="font-semibold">E-mail: </span>{" "}
                      <span className="ml-2 text-[#999] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full">
                        {order.shippingDetails.email}
                      </span>
                    </p>
                    <p className="phone flex items-center">
                      <span className="font-semibold">Phone: </span>{" "}
                      <span className="ml-2 text-[#999] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full font-poppins">
                        {order.shippingDetails.phone}
                      </span>
                    </p>
                  </div>
                </div>

                {/* order info */}
                <div className="order-info">
                  <div className="title">
                    <div className="account flex items-center">
                      <div className="bg-blue-200 p-1 rounded-full">
                        <MdLocalShipping className="text-2xl text-blue-600" />
                      </div>
                      <span className="ml-2 font-semibold">Order Info</span>
                    </div>
                  </div>
                  <div className="details mt-2">
                    <p className="shipping flex items-center">
                      <span className="font-semibold">Shipping: </span>{" "}
                      <span className="ml-2 text-[#999] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full">
                        Fargo express
                      </span>
                    </p>
                    <p className="payment flex items-center">
                      <span className="font-semibold">Payment method: </span>{" "}
                      <span className=" text-[#999] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full ml-1">
                        Card / paypal
                      </span>
                    </p>
                    <p className="Status">
                      <span className="font-semibold">Status: </span>{" "}
                      <span
                        className={
                          order.isPaid
                            ? "text-green-400 font-semibold"
                            : "text-red-400 font-semibold"
                        }
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </p>
                  </div>
                </div>
                {/* delivery */}
                <div className="delivery">
                  <div className="title">
                    <div className="account flex items-center">
                      <div className="bg-blue-200 p-1 rounded-full">
                        <FaLocationDot className="text-2xl text-blue-600" />
                      </div>
                      <span className="ml-2 font-semibold">Deliver to</span>
                    </div>
                  </div>
                  <div className="details mt-2">
                    <p className="city flex items-center">
                      <span className="font-semibold">City: </span>{" "}
                      <span className=" text-[#999] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full ml-1">
                        {order.shippingDetails.city}
                      </span>
                    </p>
                    <p className="address flex max-h-[24px] overflow-y-auto hover:cursor-grab ">
                      <span className="font-semibold">Address: </span>{" "}
                      <span className="text-[#999] ml-1">
                        {order.shippingDetails.address +
                          ", " +
                          order.shippingDetails.country}
                      </span>
                    </p>
                    <p className="postal-code flex items-center">
                      <span className="font-semi-bold">Postal Code: </span>{" "}
                      <span className="text-[#888] font-medium font-poppins">
                        {order.shippingDetails.postalCode}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="status"></div>
            </div>
            <div className=" overflow-x-auto">
              <div className="items mt-3 min-w-[630px] ">
                <div className="title grid grid-cols-4 text-[#999] font-semibold py-2 border-b-[1px] border-[#ccc] mb-3">
                  <div>Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Total</div>
                </div>
                <div className="items-detail flex flex-col gap-2 pb-2">
                  {order.orderItems.map((item) => (
                    <div
                      className="item font-poppins grid grid-cols-4"
                      key={item.product}
                    >
                      <div className="product flex items-center">
                        <div className="img rounded-md h-12 w-12 overflow-hidden bg-img">
                          <img
                            className="w-full h-full object-contain"
                            src={item.image}
                            alt={item.slug}
                          />
                        </div>
                        <p className="ml-1 text-sm">{item.name}</p>
                      </div>
                      <div className="price leading-[48px]">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="quantity pl-2 leading-[48px]">
                        {item.quantity}
                      </div>
                      <div className="total leading-[48px]">
                        $ {item.quantity * item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="summary mt-3 ">
              <h2 className="font-semibold text-center mb-3 border-y-[1px] border-[#ccc]">
                Order Summary
              </h2>
              <ul className="sm:w-1/2 lg:w-1/3 mx-auto max-w-full ">
                <li className="flex justify-between items-center font-medium">
                  <p className="basis-1/2">Subtotal</p>
                  <p className="basis-1/2 font-poppins flex justify-end ">
                    $ {(order.totalPrice + order.discount).toFixed(2)}
                  </p>
                </li>
                {order.discount !== 0 && (
                  <li className="flex justify-between items-center">
                    <p className="basis-1/2">discount</p>
                    <p className="basis-1/2 font-poppins flex justify-end ">
                      $ {order.discount.toFixed(2)}
                    </p>
                  </li>
                )}
                <li className="flex justify-between items-center">
                  <span className="basis-1/2">shipping </span>
                  <span className="basis-1/2 font-poppins flex justify-end">
                    $ {order.shippingPrice.toFixed(2)}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="basis-1/2">tax price</span>
                  <span className="basis-1/2 font-poppins flex justify-end">
                    $ {order.taxPrice.toFixed(2)}
                  </span>
                </li>
                <li className="flex justify-between items-center font-bold">
                  <span className="basis-1/2">Total</span>
                  {order.discount !== 0 ? (
                    <div className="basis-1/2 font-poppins flex whitespace-nowrap justify-end ">
                      <span className="line-through text-secondary">
                        ${(order.totalPrice + order.discount).toFixed(2)}{" "}
                      </span>
                      <span className="pl-[1px]">
                        {" "}
                        ${order.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="basis-1/2 font-poppins flex justify-end">
                      $ {order.totalPrice.toFixed(2)}
                    </span>
                  )}
                </li>
                {!loading && !error && order && !order.isPaid && (
                  <div className="paypal-buttons ">
                    <PayPalButton order={order} orderId={id} />
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
