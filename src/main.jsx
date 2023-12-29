import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
// Load the .env file
// import dotenv from "dotenv";
// dotenv.config();

import App from "./App.jsx";
import "./index.css";
import StoreProvider from "./services/Store.jsx";

// if (import.meta.env.VITE_NODE_ENV === "production") disableReactDevTools();

const apiKey = import.meta.env.VITE_CLIENT_ID;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        {/* <PayPalScriptProvider
          deferLoading={true}
          options={{
            "client-id": `${apiKey}`,
            "enable-funding": "paylater,venmo,card",
            currency: "USD",
          }}
        > */}
        <App />
        {/* </PayPalScriptProvider> */}
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
