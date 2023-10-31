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
import ProfileLayout from "./layouts/ProfileLayout";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import ErrorPage from "./pages/ErrorPage";
import SearchOrder from "./pages/SearchOrder";
import UpdatePassword from "./pages/UpdatePassword";

// router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/cartyzone-client/"
      element={<RootLayout />}
      errorElement={<Error />}
    >
      <Route index element={<Home />} />
      <Route path="products/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      {/* account route */}
      <Route
        path="account"
        element={<AccountLayout />}
        errorElement={<Error />}
      >
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        {/* profile */}
        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<UpdatePassword />} />
        </Route>
        <Route
          path="orders"
          element={<OrdersLayout />}
          errorElement={<Error />}
        >
          <Route index element={<Orders />} />
          <Route path="search" element={<SearchOrder />} />
        </Route>
      </Route>
      {/* order details */}
      <Route path="orders/order/:id" element={<OrderDetail />} />
      <Route path="*" exact={true} element={<ErrorPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
