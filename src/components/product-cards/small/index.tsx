import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { emptyProduct } from "../../../api/constants";
import { getCartContents } from "../../../api/shopify-cart";

const App = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState(emptyProduct);
  const [chosenVariant, setChosenVariant] = useState() as any;

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
      const findCheapestVariant = (arr: Array<any>) => {
        let lowestCostVariant = arr[0];
        arr.forEach((a) => {
          if (a.price < lowestCostVariant.price) {
            lowestCostVariant = a;
          }
        });
        return lowestCostVariant;
      };
      const cheapestVariant = findCheapestVariant(product.variants);
      console.log("cheapestVariant: ");
      console.log(cheapestVariant);
      setChosenVariant(cheapestVariant);
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

  const handleMenuClick = (e: any) => {
    console.log("Menu chose:");
    console.log(product.variants[e.key]);
    setChosenVariant(product.variants[e.key]);
  };

  const menu = (
    <Menu onClick={handleMenuClick} style={{ width: "250px" }}>
      {product.variants.map((v, i) => (
        <Menu.Item key={i}>{v.title}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Dropdown overlay={menu}>
        <Button
          style={{
            width: "250px",
          }}
        >
          {`${
            chosenVariant
              ? `${chosenVariant["title"]} $${chosenVariant["price"]}`
              : product["title"]
          }`}{" "}
          {chosenVariant ? <DownOutlined /> : null}
        </Button>
      </Dropdown>
      <Button
        onClick={addToCart(chosenVariant)}
        style={{
          width: "250px",
          color: "white",
          marginTop: "5px",
          backgroundColor: "#4BB00D",
        }}
      >
        Add to Cart
      </Button>
    </div>
  );

  // return (
  //   <div className="App">
  //     {product.variants.map((v) => {
  //       return (
  //         <div key={v.id}>
  //           <img
  //             alt={v.title}
  //             src={v.image.src}
  //             style={{ height: "50px", width: "50px" }}
  //           />
  //           <p>{v.title}</p>
  //           <button
  //             onClick={addToCart(v)}
  //             style={{ height: "50px", width: "100px" }}
  //           >
  //             Add to Cart
  //           </button>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
};

export default App;
