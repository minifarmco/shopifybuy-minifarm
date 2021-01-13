import React, { useEffect, useState } from "react";
// @ts-ignore
import useDimensions from "react-use-dimensions";
// import Carousel from "antd/lib/carousel";
// import Image from "antd/lib/image";
import { emptyProduct } from "../../../api/constants";
import VariantPicker from "../../variant-picker";

const LargeBuyButton = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState(emptyProduct);
  const [chosenVariant, setChosenVariant] = useState() as any;
  const [quantity, setQuantity] = useState(1);

  const [ref, dimensions] = useDimensions();

  const isExtraLarge = () => {
    return dimensions.width > 500;
  };

  useEffect(() => {
    const initProduct = async () => {
      const product = await window.shopifyClient.product
        .fetch(productId)
        .then((product: any) => {
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
      setChosenVariant(cheapestVariant);
    };
    initProduct();
  }, [productId]);

  const renderTitleAndVariantPicker = () => {
    return (
      <div>
        <span style={{ fontSize: "1.6em", fontWeight: 800 }}>
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

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        maxWidth: "1200px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: isExtraLarge() ? "row" : "column",
        justifyContent: isExtraLarge() ? "space-between" : "flex-start",
      }}
    >
      <div style={{ width: isExtraLarge() ? "49%" : "100%" }}>
        {/* <Carousel
          effect="scrollx"
          dots
          style={{
            borderRadius: "25px",
            overflow: "hidden",
          }}
        >
          {product.images.map((img: any) => (
            <Image
              preview={false}
              width="100%"
              alt={img.altText}
              src={img.src}
              style={{ borderRadius: "25px", overflow: "hidden" }}
            />
          ))}
        </Carousel> */}
        {product.images[0] ? (
          <img
            width="100%"
            alt={product.images[0].altText}
            src={product.images[0].src}
            style={{ borderRadius: "25px", overflow: "hidden" }}
          />
        ) : null}

        <div style={{ height: "10px", width: "100%" }}></div>
        {isExtraLarge() ? null : renderTitleAndVariantPicker()}
      </div>
      <div
        style={{
          marginTop: "20px",
          width: isExtraLarge() ? "49%" : "100%",
        }}
      >
        {isExtraLarge() ? renderTitleAndVariantPicker() : null}
        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
      </div>
    </div>
  );
};

export default LargeBuyButton;
