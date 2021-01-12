import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SHOPIFY_CHECKOUT_ID_COOKIE } from "../../api/constants";
import { redirectToCheckout, getCartContents } from "../../api/shopify-cart";

const ShoppingCardSidebar = () => {
  const [visible, setVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]) as Array<any>;

  window.updateCartItems = (cartItems: Array<any>) => {
    setCartItems(cartItems);
  };
  window.toggleCartVisibility = (bool: boolean) => {
    setVisible(bool);
  };

  const initCartItems = async () => {
    const cartItems = await getCartContents();
    window.updateCartItems(cartItems);
  };

  useEffect(() => {
    initCartItems();
  }, []);

  const toggleDrawer = () => {
    console.log("showDrawer");
    setVisible(!visible);
  };

  const calculateTotalBill = (cart: Array<any>) => {
    return cart.reduce((acc, curr) => {
      return acc + curr["quantity"] * curr["variant"]["price"];
    }, 0);
  };

  const updateVariantCount = ({
    id,
    currentQuantity,
    amount,
  }: {
    id: string;
    currentQuantity: number;
    amount: number;
  }) => async () => {
    const lineItemsToUpdate = [];
    if (currentQuantity + amount < 0) {
      lineItemsToUpdate.push({ id: id, quantity: 0 });
    } else {
      lineItemsToUpdate.push({ id: id, quantity: currentQuantity + amount });
    }
    const checkoutId = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE);
    const lineItems = await window.shopifyClient.checkout
      .updateLineItems(checkoutId, lineItemsToUpdate)
      .then((checkout: any) => {
        // Do something with the updated checkout
        console.log(checkout.lineItems);
        return checkout.lineItems;
      });
    window.updateCartItems(lineItems);
  };

  const onCheckoutClick = () => {
    redirectToCheckout(window.checkoutId);
  };

  return (
    <div
      onClick={toggleDrawer}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        minHeight: "100vh",
        width: visible ? "100vw" : 0,
        backgroundColor: visible ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0)",
        zIndex: 98,
      }}
    >
      <div
        style={{
          height: "100vh",
          minHeight: "100vh",
          width: visible ? "100vw" : 0,
          position: "relative",
        }}
      >
        <button
          onClick={toggleDrawer}
          style={{
            position: "absolute",
            width: "50px",
            height: "50px",
            right: visible ? 300 : 0,
            top: "45%",
            display: "block",
          }}
        >
          Cart
        </button>
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            overflow: "hidden",
            width: visible ? 300 : 0,
            display: visible ? "block" : "none",
            backgroundColor: "gray",
            height: "100vh",
            right: 0,
            top: 0,
            position: "absolute",
            zIndex: 99,
          }}
        >
          <h1 style={{ color: "white" }}>Mini-Farm</h1>
          <div>
            {cartItems.map((p: any, i: number) => (
              <div
                key={p["id"]}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <button
                  onClick={updateVariantCount({
                    id: p["id"],
                    currentQuantity: p["quantity"],
                    amount: -1,
                  })}
                >
                  -
                </button>
                <input
                  readOnly
                  value={p["quantity"]}
                  style={{ width: "50px" }}
                ></input>
                <button
                  onClick={updateVariantCount({
                    id: p["id"],
                    currentQuantity: p["quantity"],
                    amount: 1,
                  })}
                >
                  +
                </button>
                <div>{`${p["title"]} - ${p["variant"]["title"]} ($${
                  p["quantity"] * p["variant"]["price"]
                })`}</div>
              </div>
            ))}
          </div>
          <div>
            <h2>{`Total $${calculateTotalBill(cartItems)}`}</h2>
            <button
              onClick={onCheckoutClick}
              style={{
                minWidth: "200px",
                minHeight: "80px",
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCardSidebar;
