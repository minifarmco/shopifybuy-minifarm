import Client from "shopify-buy";
import Cookies from "js-cookie";
import {
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_DOMAIN,
  SHOPIFY_TOKEN,
} from "./constants";
import { extractCheckoutIdFromWebUrl } from "./helpers";

const initNewCheckout = async () => {
  // Initiate the cart with a checkoutId
  const checkoutId = await window.shopifyClient.checkout
    .create()
    .then((checkout: any) => {
      console.log(checkout);
      return checkout.id;
    });
  console.log("checkoutId:");
  console.log(checkoutId);
  window.checkoutId = checkoutId;
  Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId);
  console.log("Initiated new checkout and saved to cookies!");
};

export const initiateShopifyCart = async () => {
  console.log(
    "Checking for existence of window.shopifyClient (Shopify Checkout API)"
  );
  console.log(window.shopifyClient);
  console.log("window.shopifyClient");
  if (!window.shopifyClient) {
    console.log("None found, initiating Shopify Checkout API");
    // Initializing the Shopify client
    const client = await Client.buildClient({
      domain: SHOPIFY_DOMAIN,
      storefrontAccessToken: SHOPIFY_TOKEN,
    });
    window.shopifyClient = client;
    // look for existing checkout in cookies
    console.log("Looking in cookies for existing checkout");
    const existingCheckoutId = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE);
    if (existingCheckoutId) {
      // check if this checkout is already completed
      console.log("Found existing checkout in cookies");
      const existingCheckout = await window.shopifyClient.checkout
        .fetch(existingCheckoutId)
        .then((checkout: any) => {
          // Do something with the checkout
          console.log("Got the Shopify checkout object");
          console.log(checkout);
          return checkout;
        });
      if (existingCheckout.orderStatusUrl) {
        console.log(
          "This existing checkout is already purchased complete. Now removing old checkout from cookies..."
        );
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
    // save cookie utm_params + checkoutId to external database
    const utm_source = Cookies.get("utm_source");
    console.log(
      `Saving to external database the utm_source=${utm_source} and webUrl=${checkout.webUrl}`
    );
    const urlPersistentCheckoutId = extractCheckoutIdFromWebUrl(
      checkout.webUrl
    );
    let params: any = {};
    const timestamp = new Date().getTime();
    if (utm_source) {
      params[`${timestamp}_initCheckout_utm_source`] = utm_source;
      params[`latest_utm_source`] = utm_source;
    }
    console.log("utm_params to save to firebase:");
    console.log(params);
    window.addToFirestore({ id: urlPersistentCheckoutId, params });
    // Do something with the checkout
    console.log(checkout);
    const webUrl = checkout.webUrl;
    const win = window.open(webUrl, "_blank");
    win?.focus();
  });
};
