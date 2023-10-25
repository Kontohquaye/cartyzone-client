import { createContext, useReducer } from "react";

export const Store = createContext();

// initial state
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {},
  cart: {
    shippingDetails: localStorage.getItem("shippingDetails")
      ? JSON.parse(localStorage.getItem("shippingDetails"))
      : {},
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const {
        cart: { cartItems },
      } = state;
      const newItem = action.payload;
      const existItem = cartItems.find((item) => item._id === newItem._id);
      const newCartItems = existItem
        ? cartItems.map((product) =>
            product._id === existItem._id ? newItem : product
          )
        : [...cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...newCartItems],
        },
      };

    case "CLEAR_FROM_CART":
      const productId = action.payload;

      const updatedCartItems = state.cart.cartItems.filter(
        (item) => item._id !== productId
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cart: { ...state.cart, cartItems: updatedCartItems },
      };

    // sign up and sign in
    case "SIGNIN": {
      const userDetails = action.payload;
      // console.log(userDetails);
      return { ...state, userInfo: { ...userDetails } };
    }
    case "SIGNUP":
      const userDetails = action.payload;
      return { ...state, userInfo: { ...userDetails } };

    case "ORDER_SUCCESS":
      const shippingDetails = action.payload;
      return {
        ...state,
        cart: { shippingDetails: { ...shippingDetails }, cartItems: [] },
      };

    default:
      return { ...state, cart: { ...state.cart } };
  }
};

const StoreProvider = ({ children }) => {
  const [state, ctxDispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, ctxDispatch }}>{children}</Store.Provider>
  );
};

export default StoreProvider;
