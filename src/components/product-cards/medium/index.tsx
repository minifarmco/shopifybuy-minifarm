import React, { useEffect, useState } from "react";
// import Carousel from "antd/lib/carousel";
// import Image from "antd/lib/image";
import { emptyProduct } from "../../../api/constants";
import VariantPicker from "../../variant-picker";

const MediumBuyButton = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState(emptyProduct);
  const [chosenVariant, setChosenVariant] = useState() as any;
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const initProduct = async () => {
      const product = await window.shopifyClient.product
        .fetch(productId)
        .then((product: any) => {
          return product;
        });

      console.log("Variant: ");
      console.log(product);
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
      setChosenVariant(cheapestVariant);
    };
    initProduct();
  }, [productId]);

  const productImage =
    product.images && product.images[0] ? product.images[0] : {};

  return (
    <div style={{ width: "100%", maxWidth: "300px", backgroundColor: "white" }}>
      <img
        width="100%"
        alt={productImage.altText}
        src={productImage.src}
        style={{ borderRadius: "25px", overflow: "hidden" }}
      />
      <div style={{ height: "10px", width: "100%" }}></div>
      <span
        style={{
          fontSize: "1.6em",
          fontWeight: 800,
          fontFamily: `"Fira sans", Open sans`,
        }}
      >
        {product.title}
      </span>
      {chosenVariant ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
            marginTop: "5px",
          }}
        >
          <span
            style={{ fontSize: "1.3em", fontWeight: 500 }}
          >{`$${chosenVariant["price"]}`}</span>
          {chosenVariant["compareAtPrice"] ? (
            <span
              style={{
                marginLeft: "10px",
                textDecoration: "line-through",
                fontWeight: "lighter",
                fontSize: "1.1em",
              }}
            >
              {`$${chosenVariant["compareAtPrice"]}`}
            </span>
          ) : null}
        </div>
      ) : null}
      <VariantPicker
        product={product}
        chosenVariant={chosenVariant}
        quantity={quantity}
        setQuantity={setQuantity}
        setChosenVariant={setChosenVariant}
        showPrice={false}
      />
    </div>
  );
};

export default MediumBuyButton;
