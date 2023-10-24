import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";
import AccountLayout from "./layouts/AccountLayout";

// pages
import Home from "./pages/Home";
import Error from "./pages/Error";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Checkout from "./pages/Checkout";

// router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="products/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="account" element={<AccountLayout />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
