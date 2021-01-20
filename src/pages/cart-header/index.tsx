import { saveUtmParams, clearCookiesListener } from "../../api/helpers";
import { initiateShopifyCart } from "../../api/shopify-cart";
// import { initMixpanel } from "../../api/mixpanel";

const ShopifyInitCart = () => {
  saveUtmParams();
  // initMixpanel();
  initiateShopifyCart();
  clearCookiesListener();
};

export default ShopifyInitCart;
