import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Button, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { emptyProduct } from "../../../api/constants";
import { getCartContents } from "../../../api/shopify-cart";

const App = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState(emptyProduct);
  const [chosenVariant, setChosenVariant] = useState() as any;
  const [quantity, setQuantity] = useState(1);
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
    console.log(quantity);
    const lineItemsToAdd = [
      {
        variantId: variant.id,
        quantity: Number(quantity),
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
    setTimeout(() => {
      setQuantity(1);
    }, 1000);
  };

  const updateQuantity = (e: any) => {
    setQuantity(e.target.value);
  };

  const handleMenuClick = (e: any) => {
    console.log("Menu chose:");
    console.log(product.variants[e.key]);
    setChosenVariant(product.variants[e.key]);
  };

  const menu = (
    <Menu onClick={handleMenuClick} style={{ width: "250px" }}>
      {product.variants.length === 1 ? (
        <Menu.Item key={0}>{product.title}</Menu.Item>
      ) : (
        product.variants.map((v, i) => <Menu.Item key={i}>{v.title}</Menu.Item>)
      )}
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
              ? product.variants.length === 1
                ? `${product["title"]} $${chosenVariant["price"]}`
                : `${chosenVariant["title"]} $${chosenVariant["price"]}`
              : product["title"]
          }`}{" "}
          {chosenVariant ? <DownOutlined /> : null}
        </Button>
      </Dropdown>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "5px" }}>
        <Input
          value={quantity}
          onChange={updateQuantity}
          style={{ width: "50px", height: "40px", textAlign: "center" }}
        />
        <Button
          onClick={addToCart(chosenVariant)}
          style={{
            width: "200px",
            height: "40px",
            color: "white",
            backgroundColor: "#4BB00D",
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default App;
