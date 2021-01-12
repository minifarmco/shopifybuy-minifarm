import Cookies from "js-cookie";

export const saveUtmParams = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const utmSource = urlParams.get("utm_source") || "";
  if (utmSource) {
    console.log(`Found utm_source=${utmSource} and saving it to cookie...`);
    Cookies.set("utm_source", utmSource);
  }
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
