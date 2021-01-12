import React, { useEffect, useState } from "react";
import { emptyProduct } from "../../../api/constants";
import { getCartContents } from "../../../api/shopify-cart";

const App = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState(emptyProduct);

  useEffect(() => {
    const initProduct = async () => {
      const product = await window.shopifyClient.product
        .fetch(productId)
        .then((product: any) => {
          // Do something with the product
          console.log("Product:");
          console.log(product);
          return product;
        });
      setProduct(product);
    };
    initProduct();
  }, [productId]);

  const addToCart = (variant: any) => async () => {
    window.toggleCartVisibility(true);
    const lineItemsToAdd = [
      {
        variantId: variant.id,
        quantity: 1,
      },
    ];
    await window.shopifyClient.checkout.addLineItems(
      window.checkoutId,
      lineItemsToAdd
    );
    const cartItems = await getCartContents();
    console.log("cartItems:");
    console.log(cartItems);
    window.updateCartItems(cartItems);
  };

  return (
    <div className="App">
      {product.variants.map((v) => {
        return (
          <div key={v.id}>
            <img
              alt={v.title}
              src={v.image.src}
              style={{ height: "50px", width: "50px" }}
            />
            <p>{v.title}</p>
            <button
              onClick={addToCart(v)}
              style={{ height: "50px", width: "100px" }}
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
