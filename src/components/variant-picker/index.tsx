import React from "react";
import { COLORS } from "../../api/constants";
import { getCartContents } from "../../api/shopify-cart";
import { trackEvent } from "../../api/mixpanel";

const VariantPicker = ({
  product,
  chosenVariant,
  quantity,
  setQuantity,
  setChosenVariant,
  showPrice,
}: {
  product: any;
  chosenVariant: any;
  quantity: number;
  setQuantity: Function;
  setChosenVariant: Function;
  showPrice?: Boolean;
}) => {
  const handleMenuClick = (e: any) => {
    const variant = product.variants.find((v: any) => v.id === e.target.value);
    setChosenVariant(variant);
  };

  const updateQuantity = (e: any) => {
    setQuantity(e.target.value);
  };

  const addToCart = (variant: any) => async () => {
    window.toggleCartVisibility(true);
    const lineItemsToAdd = [
      {
        variantId: variant.id,
        quantity: Number(quantity),
      },
    ];
    const data = {
      addToCart_value: Number(variant.price),
      addToCart_item_title: variant.title,
      addToCart_item_shopify_sku: variant.sku,
      addToCart_item_shopify_id: variant.id,
    };
    trackEvent({
      eventName: "AddToCart",
      data,
    });
    await window.shopifyClient.checkout.addLineItems(
      window.checkoutId,
      lineItemsToAdd
    );
    const cartItems = await getCartContents();
    window.updateCartItems(cartItems);
    setTimeout(() => {
      setQuantity(1);
    }, 1000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <select
        id="select-variant"
        value={chosenVariant ? chosenVariant.id : ""}
        onChange={handleMenuClick}
        style={{
          height: "40px",
          fontSize: "1em",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {product.variants.map((v: any, i: number) => (
          <option
            key={i}
            value={v.id}
            style={{
              height: "40px",
              fontSize: "1em",
              padding: "10px",
            }}
          >
            {v.title}
          </option>
        ))}
      </select>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "5px",
          alignItems: "stretch",
        }}
      >
        <input
          value={quantity}
          onChange={updateQuantity}
          style={{
            width: "50px",
            height: "40px",
            maxHeight: "40px",
            minHeight: "40px",
            textAlign: "center",
            borderRadius: "5px 0px 0px 5px",
            marginRight: "-5px",
            border: `2px solid ${COLORS.green}`,
          }}
        />
        <button
          onClick={addToCart(chosenVariant)}
          style={{
            flex: 1,
            minHeight: "40px",
            color: "white",
            backgroundColor: COLORS.green,
            fontWeight: "bold",
            fontSize: "1em",
            borderRadius: "0px 5px 5px 0px",
            border: `2px solid ${COLORS.green}`,
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

VariantPicker.defaultProps = {
  showPrice: true,
};

export default VariantPicker;
