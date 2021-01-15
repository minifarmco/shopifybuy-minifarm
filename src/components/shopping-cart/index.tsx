import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./shopping-cart.css";
import useWindowSize from "../../api/hooks/useWindowSize";
import CartSVG from "../../assets/cart.svg";
import { SHOPIFY_CHECKOUT_ID_COOKIE, COLORS } from "../../api/constants";
import { redirectToCheckout, getCartContents } from "../../api/shopify-cart";
import CartRow from "../cart-row";

const ShoppingCardSidebar = () => {
  const [visible, setVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]) as Array<any>;
  const [incrementButtonsDisabled, setIncrementButtonsDisabled] = useState(
    false
  );

  const windowSize = useWindowSize();

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
    if (!incrementButtonsDisabled) {
      setIncrementButtonsDisabled(true);
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
          return checkout.lineItems;
        });
      window.updateCartItems(lineItems);
      setIncrementButtonsDisabled(false);
    }
  };

  const countCartQuantity = () => {
    return cartItems.reduce((acc: number, curr: any) => {
      return acc + curr.quantity;
    }, 0);
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
        zIndex: 999,
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
        {countCartQuantity() === 0 || visible ? null : (
          <button
            onClick={toggleDrawer}
            style={{
              position: "absolute",
              width: "50px",
              padding: "5px 5px 5px 5px",
              right: visible ? 300 : 0,
              top: "45%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: COLORS.green,
              border: "0px solid white",
              cursor: "pointer",
              borderRadius: "5px 0px 0px 5px",
            }}
          >
            <span style={{ color: "white" }}>{countCartQuantity()}</span>
            <img src={CartSVG} alt="view cart" />
          </button>
        )}

        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            overflow: "hidden",
            width: visible ? 320 : 0,
            display: visible ? "flex" : "none",
            backgroundColor: "white",
            height: windowSize.height,
            right: 0,
            top: 0,
            position: "absolute",
            zIndex: 9999,
            boxShadow: "-5px 0px 5px #888888",
            padding: "10px 20px 20px 20px",
          }}
        >
          <div
            style={{
              height: windowSize.height - 270,
              maxHeight: windowSize.height - 270,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              <div
                style={{
                  height: "40px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{ color: "gray", fontSize: "1.3em", fontWeight: 350 }}
                >
                  Cart
                </span>
                <span
                  onClick={toggleDrawer}
                  style={{
                    fontSize: "1.3em",
                    fontWeight: 500,
                    color: "gray",
                    border: "2px solid rgba(50,166,249,0.6)",
                    padding: "0px 10px 0px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  X
                </span>
              </div>
              <div
                className="shopping-cart-list"
                style={{ height: windowSize.height - 180, overflowY: "scroll" }}
              >
                {cartItems.map((p: any, i: number) => (
                  <CartRow
                    key={i}
                    cartItem={p}
                    updateVariantCount={updateVariantCount}
                  />
                ))}
              </div>
            </div>
            <div style={{ marginBottom: "30px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: "5px",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8em",
                    color: "gray",
                  }}
                >
                  SUBTOTAL
                </span>
                <span
                  style={{
                    fontSize: "1em",
                    color: "gray",
                  }}
                >{`$${calculateTotalBill(cartItems).toFixed(2)}`}</span>
              </div>
              <span
                style={{
                  fontSize: "0.75em",
                  fontWeight: 400,
                  color: "gray",
                  width: "100%",
                  alignSelf: "center",
                }}
              >{`Shipping and discount codes are added at checkout.`}</span>
              <button
                onClick={onCheckoutClick}
                style={{
                  width: "100%",
                  height: "40px",
                  backgroundColor: COLORS.green,
                  color: "white",
                  border: "0px solid white",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCardSidebar;
