import { createContext, useReducer } from "react";

export const Store = createContext();

// initial state
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: { cartItems: [...state.cart.cartItems, action.payload] },
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
