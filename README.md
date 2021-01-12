# MiniFarm Shopify Buy Button

This repo is a custom Shopify Buy Button made for www.mini-farm.co
It is powered by the [Shopify BuyJS SDK](https://github.com/Shopify/js-buy-sdk).

## How to Deploy
1. Make sure `"noEmit": false` in `tsconfig.json`
2. Run `$ yarn webpack`
3. Upload the output files `dist/*` to [Firebase Storage folder](https://console.firebase.google.com/u/2/project/mini-farm-storefront/storage/mini-farm-storefront.appspot.com/files~2FMinifarm-ShopifyBuyJS) and set to public
4. Import the script into webflow. Below is a generalized HTML example. See demo.html for a real example.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
    <!-- header-placement.html -->
  </head>

  <body>
    <h1>MiniFarm Shopify Buy JS</h1>

    <section id="product-list">
      <!-- buy-button-placement.html -->
    </section>

    <!-- body-placement.html -->
  </body>
</html>
```

## To Do

### Higher Priority ToDos

- Pretty up the styling

- A convinent helper function to get all the product IDs

- Dynamically save UTM params

- Integrate mixpanel

- Push events to google analytics window.dataLayer

- Decide whether to keep or remove firebase firestore

- Make public the firebase storage of our scripts, so that we dont need to overwrite the script url every time

### Lower Priority Todos

- Refactor the header script so that you can pass in shopify store url & token from external script instead of it being encapsulated in the minified script. same for mixpanel tokens

- A way to render collections

- Open Source it