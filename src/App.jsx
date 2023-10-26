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
import OrdersLayout from "./layouts/OrdersLayout";

// pages
import Home from "./pages/Home";
import Error from "./pages/Error";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import ErrorPage from "./pages/ErrorPage";

// router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="products/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route
        path="account"
        element={<AccountLayout />}
        errorElement={<Error />}
      >
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="orders"
          element={<OrdersLayout />}
          errorElement={<Error />}
        >
          <Route index element={<Orders />} />
          <Route path="order/:id" element={<OrderDetail />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
