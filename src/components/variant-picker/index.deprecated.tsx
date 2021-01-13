// import React from "react";
// import Dropdown from "antd/lib/dropdown";
// import Menu from "antd/lib/menu";
// import Button from "antd/lib/button";
// import Input from "antd/lib/input";
// import { DownOutlined } from "@ant-design/icons";
// import { COLORS } from "../../api/constants";
// import { getCartContents } from "../../api/shopify-cart";

// const VariantPicker = ({
//   product,
//   chosenVariant,
//   quantity,
//   setQuantity,
//   setChosenVariant,
//   showPrice,
// }: {
//   product: any;
//   chosenVariant: any;
//   quantity: number;
//   setQuantity: Function;
//   setChosenVariant: Function;
//   showPrice?: Boolean;
// }) => {
//   const handleMenuClick = (e: any) => {
//     setChosenVariant(product.variants[e.key]);
//   };

//   const updateQuantity = (e: any) => {
//     setQuantity(e.target.value);
//   };

//   const addToCart = (variant: any) => async () => {
//     window.toggleCartVisibility(true);
//     const lineItemsToAdd = [
//       {
//         variantId: variant.id,
//         quantity: Number(quantity),
//       },
//     ];
//     await window.shopifyClient.checkout.addLineItems(
//       window.checkoutId,
//       lineItemsToAdd
//     );
//     const cartItems = await getCartContents();
//     window.updateCartItems(cartItems);
//     setTimeout(() => {
//       setQuantity(1);
//     }, 1000);
//   };

//   const menu = (
//     <Menu
//       onClick={handleMenuClick}
//       style={{ width: "100%", overflow: "hidden" }}
//     >
//       {product.variants.length === 1 ? (
//         <Menu.Item
//           key={0}
//           style={{ overflow: "hidden", width: "100%", textAlign: "left" }}
//         >
//           {product.title}
//         </Menu.Item>
//       ) : (
//         product.variants.map((v: any, i: number) => (
//           <Menu.Item key={i}>{v.title}</Menu.Item>
//         ))
//       )}
//     </Menu>
//   );

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <Dropdown overlay={menu}>
//         <Button
//           style={{
//             width: "100%",
//             overflow: "hidden",
//             textAlign: "left",
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           {`${
//             chosenVariant
//               ? product.variants.length === 1
//                 ? `${product["title"]}${
//                     showPrice ? ` $${chosenVariant["price"]}` : ""
//                   }`
//                 : `${chosenVariant["title"]}${
//                     showPrice ? ` $${chosenVariant["price"]}` : ""
//                   }`
//               : product["title"]
//           }`}{" "}
//           {chosenVariant ? <DownOutlined /> : null}
//         </Button>
//       </Dropdown>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           marginTop: "5px",
//           alignItems: "stretch",
//         }}
//       >
//         <Input
//           value={quantity}
//           onChange={updateQuantity}
//           style={{
//             width: "50px",
//             height: "40px",
//             textAlign: "center",
//             borderRadius: "5px 0px 0px 5px",
//             marginRight: "-5px",
//           }}
//         />
//         <Button
//           onClick={addToCart(chosenVariant)}
//           style={{
//             flex: 1,
//             height: "40px",
//             color: "white",
//             backgroundColor: COLORS.green,
//             fontWeight: "bold",
//             borderRadius: "0px 5px 5px 0px",
//           }}
//         >
//           Add to Cart
//         </Button>
//       </div>
//     </div>
//   );
// };

// VariantPicker.defaultProps = {
//   showPrice: true,
// };

// export default VariantPicker;

export const purpose = "deprecated";
