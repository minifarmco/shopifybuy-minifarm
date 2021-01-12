import { saveUtmParams } from "../../api/helpers";
import { initiateShopifyCart } from "../../api/shopify-cart";

const ShopifyInitCart = () => {
  saveUtmParams();
  initiateShopifyCart();
};

export default ShopifyInitCart;
