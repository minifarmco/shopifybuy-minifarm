import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const ShopifyRenderCart = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("shopping-cart")
  );
};

export default ShopifyRenderCart;
