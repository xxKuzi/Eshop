import React, { useState, useEffect } from "react";
import { useData } from "../../parts/Memory.jsx";
import Item from "../../components/cart/Cart_Item.jsx";

export default function Cart_Items() {
  const [data, setData] = useState([]);
  let { addToCart, profile, catalog } = useData();
  let cart = useData().profile.cart;

  useEffect(() => {
    if (profile.uid === "x" || cart.length === 0) {
      // "x" if it is not connected to net OR logged out
      return;
    }

    let dataArr = [];

    cart.map((productInCart) => {
      catalog.map((productInCatalog) => {
        productInCart.id === productInCatalog.id ? dataArr.push({ ...productInCatalog, quantity: productInCart.quantity }) : null;
      });
    });

    setData(dataArr);
  }, [catalog]);

  return (
    <div className="mt-5">
      {data.map((product) => (
        <Item key={product.id} addToCart={(id, currentQuantity) => addToCart(id, currentQuantity)} data={product}></Item>
      ))}
    </div>
  );
}
