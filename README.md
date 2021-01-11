# MiniFarm Shopify Buy Button

This repo is a custom Shopify Buy Button made for www.mini-farm.co
It is powered by the [Shopify BuyJS SDK](https://github.com/Shopify/js-buy-sdk).

## How to Deploy
1. Make sure `"noEmit": false` in `tsconfig.json`
2. Run `$ yarn webpack`
3. Upload the output file `dist/minifarm-shopifybuy.js` to Firebase Storage and set to public
4. Import the script into your HTML. Below is a sample.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <h1>MiniFarm Shopify Buy JS</h1>
    <div id="root"></div>

    <script src="https://firebasestorage.googleapis.com/v0/b/mini-farm-storefront.appspot.com/o/Minifarm-ShopifyBuyJS%2Fminifarm-shopifybuy.js?alt=media&token=c6896d9d-cefb-4d9f-8a21-d5e1b12f7a7a"></script>
  </body>
</html>
```