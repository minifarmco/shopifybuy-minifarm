import { saveUtmParams, clearCookiesListener } from "../../api/helpers";
import { initiateShopifyCart } from "../../api/shopify-cart";

const ShopifyInitCart = () => {
  saveUtmParams();
  initiateShopifyCart();
  clearCookiesListener();
};

export default ShopifyInitCart;
