import React from "react";
import ReactDOM from "react-dom";
import TinyBuyButton from "../../components/product-cards/tiny";
import SmallBuyButton from "../../components/product-cards/small";
import MediumBuyButton from "../../components/product-cards/medium";
import LargeBuyButton from "../../components/product-cards/large";

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
