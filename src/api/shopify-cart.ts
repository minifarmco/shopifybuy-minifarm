import Client from "shopify-buy";
import Cookies from "js-cookie";
import {
  SHOPIFY_CHECKOUT_ID_COOKIE,
  UTM_PARAMS_MEMORY,
  SHOPIFY_DOMAIN,
  SHOPIFY_TOKEN,
} from "./constants";
import { extractCheckoutIdFromWebUrl } from "./helpers";
import { trackEvent } from "./mixpanel";

const initNewCheckout = async () => {
  // Initiate the cart with a checkoutId
  const checkoutId = await window.shopifyClient.checkout
    .create()
    .then((checkout: any) => {
      return checkout.id;
    });
  window.checkoutId = checkoutId;
  Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId);
};

export const initiateShopifyCart = async () => {
  if (!window.shopifyClient) {
    // Initializing the Shopify client
    const client = await Client.buildClient({
      domain: SHOPIFY_DOMAIN,
      storefrontAccessToken: SHOPIFY_TOKEN,
    });
    window.shopifyClient = client;
    // look for existing checkout in cookies
    const existingCheckoutId = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE);
    if (existingCheckoutId) {
      // check if this checkout is already completed
      const existingCheckout = await window.shopifyClient.checkout
        .fetch(existingCheckoutId)
        .then((checkout: any) => {
          // Do something with the checkout
          return checkout;
        });
      if (existingCheckout.orderStatusUrl) {
        // Initiate the cart with a checkoutId
        initNewCheckout();
      } else {
        console.log("There is an existing incomplete checkout. lets use that");
        window.checkoutId = existingCheckoutId;
      }
    } else {
      console.log(
        "No existing checkout found in cookies. Initiating a new one!"
      );
      // Initiate the cart with a checkoutId
      initNewCheckout();
    }
  } else {
    console.log("window.shopifyClient was found");
  }
};

export const redirectToCheckout = (checkoutId: string) => {
  window.shopifyClient.checkout.fetch(checkoutId).then((checkout: any) => {
    const checkoutId = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE);
    // save cookie utm_params + checkoutId to external database
    const currentUtmMemoryString: any = Cookies.get(UTM_PARAMS_MEMORY) || {};
    const currentUtmMemory = JSON.parse(currentUtmMemoryString);
    console.log(
      `Saving to external database the utm memory for webUrl=${checkout.webUrl}`
    );
    const urlPersistentCheckoutId = extractCheckoutIdFromWebUrl(
      checkout.webUrl
    );
    let params: any = {};
    const timestamp = new Date().getTime();
    Object.keys(currentUtmMemory).forEach((k) => {
      params[`${timestamp}_${k}`] = currentUtmMemory[k];
      params[`latest_${k}`] = currentUtmMemory[k];
      params[`checkoutId`] = checkoutId;
      params[`checkoutUrlId`] = urlPersistentCheckoutId;
    });
    console.log("utm_params to save to firebase:");
    console.log(params);
    window.addToFirestore({ id: urlPersistentCheckoutId, params });
    // Do something with the checkout
    console.log(checkout);

    const data = {
      initCheckout_value: Number(checkout.totalPrice),
    };
    trackEvent({
      eventName: "InitiateCheckout",
      data,
    });

    const webUrl = checkout.webUrl;
    const win = window.open(webUrl, "_blank");
    win?.focus();
  });
};

export const getCartContents = async () => {
  const checkoutId = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE);
  return window.shopifyClient.checkout
    .fetch(checkoutId)
    .then((checkout: any) => {
      // Do something with the checkout
      console.log(checkout);
      return checkout.lineItems;
    });
};

export const fetchAllProducts = async () => {
  return window.shopifyClient.product.fetchAll().then((products: any) => {
    return products;
  });
};
