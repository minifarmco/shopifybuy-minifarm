import React, { useEffect, useState } from "react";
import ShoppingCardSidebar from "./components/shopping-cart";
import SmallBuyButton from "./components/product-cards/small";
import { initiateShopifyCart } from "./api/shopify-cart";
import { initFirebase } from "./api/firebase";

function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    initiateShopifyCart();
    initFirebase();
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return loaded ? (
    <div>
      <h1>Mini-Farm Shopify Buy Button Development Sandbox</h1>
      <ShoppingCardSidebar />
      <button onClick={() => console.log("click me")}>click me</button>

      <div
        style={{
          height: "200vh",
          width: "100vw",
          backgroundColor: "rgba(123,123,123,0.1)",
        }}
      >
        Hello World
        <SmallBuyButton
          productId={"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0MDIwMTU3Mjc2NjA="}
        />
      </div>
    </div>
  ) : null;
}

export default App;
