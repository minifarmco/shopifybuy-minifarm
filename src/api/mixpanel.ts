import * as mixpanel from "mixpanel-browser";
import Cookies from "js-cookie";
import {
  MIXPANEL_TOKEN,
  SHOPIFY_CHECKOUT_ID_COOKIE,
  UTM_PARAMS_MEMORY,
} from "./constants";

export const initMixpanel = async () => {
  console.log("Inititializing mixpanel...");
  mixpanel.init(MIXPANEL_TOKEN, { ignore_dnt: true });
};

export const trackEvent = async ({
  eventName,
  data,
}: {
  eventName: string;
  data: any;
}) => {
  let params: any = {};
  const checkoutId = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE);
  params["checkoutId"] = checkoutId;
  const latestUtmParamsMemory = Cookies.get(UTM_PARAMS_MEMORY) || "";
  params = {
    ...params,
    ...JSON.parse(latestUtmParamsMemory),
    ...data,
  };
  params["event"] = eventName;
  params["eventAction"] = eventName;
  // do something with existingCheckout
  mixpanel.track(eventName, params);
};
