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
        window.checkoutId = existingCheckoutId;
      }
    } else {
      // Initiate the cart with a checkoutId
      initNewCheckout();
    }
  } else {
    console.error("window.shopifyClient was found");
  }
};

export const redirectToCheckout = (checkoutId: string) => {
  window.shopifyClient.checkout.fetch(checkoutId).then((checkout: any) => {
    const checkoutId = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE);
    // save cookie utm_params + checkoutId to external database
    const currentUtmMemoryString: any = Cookies.get(UTM_PARAMS_MEMORY) || {};
    const currentUtmMemory = JSON.parse(currentUtmMemoryString);

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
    window.addToFirestore({ id: urlPersistentCheckoutId, params });

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
      return checkout.lineItems;
    });
};

const fetchNextPage = async (
  prevSet: Array<any>,
  cumulativeSet: Array<any>
): Promise<any> => {
  const nextSet = await window.shopifyClient
    .fetchNextPage(prevSet)
    .then((data: any) => {
      return data.model;
    });
  const updatedCumulativeSet = [...cumulativeSet, ...nextSet];
  if (nextSet.length > 0) {
    return fetchNextPage(nextSet, updatedCumulativeSet);
  }
  return updatedCumulativeSet;
};

export const fetchAllProducts = async () => {
  const allProducts = await window.shopifyClient.product
    .fetchAll()
    .then((products: any) => {
      return fetchNextPage(products, products);
    });
  console.log("fetchAllProducts");
  console.log(allProducts);
  return allProducts;
};
