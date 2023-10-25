try {
  if (coupon !== "") {
    const {
      data: { value },
    } = await backendInstance.post("/api/coupons/coupon/use", {
      name: coupon,
    });
    //second fetch
    dispatch({ type: "ADD_DISCOUNT", payload: value });
  }
  dispatch({ type: "PLACE_ORDER" });
  const { data } = await backendInstance.post(
    "/api/orders/order",
    {
      orderItems,
      shippingDetails,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice: totalPrice - discount,
      discount,
    },
    { withCredentials: true }
  );
  if (data.error) {
    dispatch({ type: "ORDER_ERROR", payload: data.error });
  } else {
    dispatch({ type: "ORDER_SUCCESS", payload: data });
    ctxDispatch({
      type: "ORDER_SUCCESS",
      payload: data.shippingDetails,
    });
    localStorage.removeItem("cartItems");
    localStorage.setItem(
      "shippingDetails",
      JSON.stringify(data.shippingDetails)
    );
    // navigate("/");
  }
} catch (error) {
  //   const {
  //     response: { data },
  //   } = error;
  //   toast.error(data.message);
  // }
  console.log(error);
}

/////////
// try {
//   dispatch({ type: "PLACE_ORDER" });
//   const { data } = await backendInstance.post(
//     "/api/orders/order",
//     {
//       orderItems,
//       shippingDetails,
//       itemsPrice,
//       shippingPrice,
//       taxPrice,
//       totalPrice: totalPrice - discount,
//       discount,
//     },
//     { withCredentials: true }
//   );
//   if (data.error) {
//     dispatch({ type: "ORDER_ERROR", payload: data.error });
//   } else {
//     dispatch({ type: "ORDER_SUCCESS", payload: data });
//     ctxDispatch({ type: "ORDER_SUCCESS", payload: data.shippingDetails });
//     localStorage.removeItem("cartItems");
//     localStorage.setItem(
//       "shippingDetails",
//       JSON.stringify(data.shippingDetails)
//     );
//     navigate("/");
//   }
//   // console.log(data);
// } catch (error) {
//   console.log(error);
//   dispatch({ type: "ORDER_ERROR", payload: getError(error) });
//   // console.log(error.message);
//   toast.error("Request failed");
//

// /////
if (coupon !== "") {
  try {
    const {
      data: { value },
    } = await backendInstance.post("/api/coupons/coupon/use", {
      name: coupon,
    });
    const deduction = value;
    console.log(deduction);
    if (value) {
      console.log(value);
      console.log(discount);
      console.log("total price is " + totalPrice);
      console.log(`old price is  ${totalPrice - discount}`);
      dispatch({ type: "ADD_DISCOUNT", payload: deduction });
      console.log(`new price is ${totalPrice - discount}`);
      console.log(discount);
    }

    // console.log(reducedPrice);
  } catch (error) {
    const {
      response: { data },
    } = error;
    toast.error(data.message);
  }
}

try {
  dispatch({ type: "PLACE_ORDER" });
  const { data } = await backendInstance.post(
    "/api/orders/order",
    {
      orderItems,
      shippingDetails,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice: totalPrice - discount,
      discount,
    },
    { withCredentials: true }
  );
  if (data.error) {
    dispatch({ type: "ORDER_ERROR", payload: data.error });
  } else {
    dispatch({ type: "ORDER_SUCCESS", payload: data });
    ctxDispatch({ type: "ORDER_SUCCESS", payload: data.shippingDetails });
    localStorage.removeItem("cartItems");
    localStorage.setItem(
      "shippingDetails",
      JSON.stringify(data.shippingDetails)
    );
    navigate("/");
  }
  // console.log(data);
} catch (error) {
  console.log(error);
  dispatch({ type: "ORDER_ERROR", payload: getError(error) });
  // console.log(error.message);
  toast.error("Request failed");
}
