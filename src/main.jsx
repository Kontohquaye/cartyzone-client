import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css";
import StoreProvider from "./services/Store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StoreProvider>
  // </React.StrictMode>
);
