import React from "react";

const CartRow = ({
  cartItem,
  updateVariantCount,
}: {
  cartItem: any;
  updateVariantCount: Function;
}) => {
  return (
    <div
      key={cartItem["id"]}
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginBottom: "20px",
      }}
    >
      <div style={{ flex: 1 }}>
        <img
          src={cartItem.variant.image.src}
          alt={cartItem.variant.image.altText}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div style={{ width: "10px", height: "100%" }}></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          flex: 3,
        }}
      >
        <span style={{ fontWeight: 500, fontSize: "0.9em" }}>
          {cartItem.title}
        </span>
        <span style={{ fontWeight: 400, fontSize: "0.8em" }}>
          {cartItem.variant.title}
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "5px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.15)",
              borderRadius: "3px",
            }}
          >
            <button
              onClick={updateVariantCount({
                id: cartItem["id"],
                currentQuantity: cartItem["quantity"],
                amount: -1,
              })}
              style={{
                width: "30px",
                borderRadius: "3px 0px 0px 3px",
                border: "0px solid white",
              }}
            >
              -
            </button>
            <input
              readOnly
              value={cartItem["quantity"]}
              style={{
                width: "40px",
                textAlign: "center",
                borderRadius: "0px",
                border: "0px solid white",
              }}
            ></input>
            <button
              onClick={updateVariantCount({
                id: cartItem["id"],
                currentQuantity: cartItem["quantity"],
                amount: 1,
              })}
              style={{
                width: "30px",
                borderRadius: "0px 3px 3px 0px",
                border: "0px solid white",
              }}
            >
              +
            </button>
          </div>
          <div>
            <span style={{ fontWeight: 500, fontSize: "1em" }}>{`$${(
              cartItem["quantity"] * cartItem["variant"]["price"]
            ).toFixed(2)}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartRow;
