// import { PayPalButtons } from "@paypal/react-paypal-js";
// import { toast } from "react-toastify";
// import { useContext } from "react";

// // api
// import backendInstance from "../utils/api";
// // ctx
// import { Store } from "../services/Store";

// const PayPalButton = ({ order, orderId }) => {
//   const {
//     state: { userInfo },
//   } = useContext(Store);
//   const handleApprove = async (orderID, order) => {
//     // console.log(orderID);
//     const {
//       id,
//       status,
//       update_time,
//       payer: { email_address },
//     } = order;
//     try {
//       const data = await backendInstance.put(
//         `api/orders/order/${orderId}/pay`,
//         {
//           id,
//           status,
//           update_time,
//           email_address,
//         },
//         { headers: { authorization: `Bearer ${userInfo.token}` } }
//       );
//       // console.log(data);
//       window.location.reload();
//     } catch (err) {
//       if (err.response.data.message) {
//         const {
//           response: {
//             data: { message },
//           },
//         } = err;
//         toast.error(message);
//       } else {
//         toast.error(err.message);
//       }
//       console.log(err);
//     }
//     // console.log({ order: { id, status, update_time, email_address } });
//   };

//   return (
//     <PayPalButtons
//       style={{
//         color: "silver",
//         layout: "vertical",
//         height: 48,
//         tagline: false,
//         shape: "rect",
//       }}
//       createOrder={(data, actions) => {
//         return actions.order.create({
//           purchase_units: [
//             {
//               amount: {
//                 value: order.totalPrice,
//               },
//             },
//           ],
//         });
//       }}
//       onApprove={async (data, actions) => {
//         const order = await actions.order.capture();
//         // console.log("order:", order);
//         handleApprove(data.orderID, order);
//       }}
//       onCancel={(data) => {
//         toast.info("purchase canceled!");
//         console.log("payment cancelled", data);
//       }}
//       onError={(err) => {
//         toast.error(err.err);
//       }}
//     />
//   );
// };

// export default PayPalButton;
