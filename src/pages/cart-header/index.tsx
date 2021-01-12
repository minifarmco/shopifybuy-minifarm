import { saveUtmParams, clearCookiesListener } from "../../api/helpers";
import { initiateShopifyCart } from "../../api/shopify-cart";
import "antd/dist/antd.css";

const ShopifyInitCart = () => {
  saveUtmParams();
  initiateShopifyCart();
  clearCookiesListener();
};

export default ShopifyInitCart;
