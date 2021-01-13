import React, { useEffect, useState } from "react";
import ShoppingCardSidebar from "./components/shopping-cart";
import SmallBuyButton from "./components/product-cards/small";
import MediumBuyButton from "./components/product-cards/medium";
import LargeBuyButton from "./components/product-cards/large";
import { initiateShopifyCart, fetchAllProducts } from "./api/shopify-cart";
import { initFirebase } from "./api/firebase";

function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    initiateShopifyCart();
    initFirebase();
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
    setTimeout(() => {
      fetchAllProducts();
    }, 2000);
  }, []);

  return loaded ? (
    <div>
      <h1>Mini-Farm Shopify Buy Button Development Sandbox</h1>
      <ShoppingCardSidebar />

      <div
        style={{
          height: "200vh",
          width: "100vw",
          padding: "50px",
        }}
      >
        {/* <div style={{ width: "300px", border: "0px solid blue" }}>
          <SmallBuyButton
            productId={"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0MDIyMjc0NDE3MDg="}
          />
        </div>
        <div style={{ width: "800px", border: "0px solid blue" }}>
          <MediumBuyButton
            productId={"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0MTI2NzE5MTQwMjg="}
          />
        </div>
        <div style={{ width: "500px", border: "0px solid blue" }}>
          <LargeBuyButton
            productId={"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzUyMzM1MDEwMTIwMTI="}
          />
        </div> */}
        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
            border: "0px solid blue",
          }}
        >
          <LargeBuyButton
            productId={"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzUyMzM1MDEwMTIwMTI="}
          />
        </div>
      </div>
    </div>
  ) : null;
}

export default App;
