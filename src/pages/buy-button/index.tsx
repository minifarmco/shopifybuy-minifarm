import React from "react";
import ReactDOM from "react-dom";
import TinyBuyButton from "./tiny/App";
import SmallBuyButton from "./small/App";
import MediumBuyButton from "./medium/App";
import LargeBuyButton from "./large/App";

type BuyButtonSizes = "tiny" | "small" | "medium" | "large";

const InjectShopifyBuyButton = ({
  divId,
  productId,
  size,
}: {
  divId: string;
  productId: string;
  size: BuyButtonSizes;
}) => {
  const renderBuyButtonSize = (size: BuyButtonSizes) => {
    if (size === "tiny") {
      return <TinyBuyButton productId={productId} />;
    } else if (size === "small") {
      return <SmallBuyButton productId={productId} />;
    } else if (size === "medium") {
      return <MediumBuyButton productId={productId} />;
    } else if (size === "large") {
      return <LargeBuyButton productId={productId} />;
    }
    return <p>No Size Selected</p>;
  };
  ReactDOM.render(
    <React.StrictMode>{renderBuyButtonSize(size)}</React.StrictMode>,
    document.getElementById(divId)
  );
};

export default InjectShopifyBuyButton;
