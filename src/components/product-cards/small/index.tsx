import React, { useEffect, useState } from "react";
import { emptyProduct } from "../../../api/constants";
import VariantPicker from "../../variant-picker";

const SmallBuyButton = ({ productId }: { productId: string }) => {
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

  return (
    <div style={{ width: "100%" }}>
      <VariantPicker
        product={product}
        chosenVariant={chosenVariant}
        quantity={quantity}
        setQuantity={setQuantity}
        setChosenVariant={setChosenVariant}
      />
    </div>
  );
};

export default SmallBuyButton;
