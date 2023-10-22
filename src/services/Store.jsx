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
      const {
        cart: { cartItems },
      } = state;
      const newItem = action.payload;
      const existItem = cartItems.find((item) => item.id === newItem.id);
      const newCartItems = existItem
        ? cartItems.map((product) =>
            product.id === existItem.id ? newItem : product
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
        (item) => item.id !== productId
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cart: { ...state.cart, cartItems: updatedCartItems },
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
