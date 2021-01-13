import Cookies from "js-cookie";
import url from "url-parameters";
import { UTM_PARAMS_MEMORY } from "./constants";

export const saveUtmParams = () => {
  const urlParams = url.getParams();
  let latestUtmParamsMemory: any = {};
  Object.keys(urlParams).forEach((p) => {
    if (p.indexOf("utm") > -1) {
      latestUtmParamsMemory[p] = urlParams[p];
    }
  });
  Cookies.set(UTM_PARAMS_MEMORY, JSON.stringify(latestUtmParamsMemory));
};

export const extractCheckoutIdFromWebUrl = (webUrl: string) => {
  const x = webUrl.split("/");
  const y = x[x.length - 1];
  if (y.indexOf("?") > -1) {
    const z = y.split("?");
    return z[0];
  }
  return y;
};

export const clearCookiesListener = () => {
  window.onbeforeunload = function (e: any) {
    Cookies.remove("utm_source");
  };
};
