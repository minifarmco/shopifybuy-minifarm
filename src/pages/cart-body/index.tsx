import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initFirebase } from "../../api/firebase";

const ShopifyRenderCart = () => {
  initFirebase();
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("shopping-cart")
  );
};

export default ShopifyRenderCart;
