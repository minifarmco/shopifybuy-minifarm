import React from "react";
import { redirectToCheckout } from "../../api/shopify-cart";

const checkoutStyle = {
  minWidth: "200px",
  minHeight: "80px",
};

function App() {
  const onCheckoutClick = () => {
    redirectToCheckout(window.checkoutId);
  };
  return (
    <div className="App">
      <button onClick={onCheckoutClick} style={checkoutStyle}>
        Checkout
      </button>
    </div>
  );
}

export default App;
