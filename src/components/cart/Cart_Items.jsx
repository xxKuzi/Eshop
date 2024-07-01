import React, { useState, useEffect } from "react";
import { useData } from "../../parts/Memory.jsx";
import Item from "../../components/cart/Cart_Item.jsx";

export default function Cart_ItemsUnLogged() {
  const [data, setData] = useState([]);
  let { addToCart, profile, catalog } = useData();
  let cart = useData().profile.cart;
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;

  let unLoggedCart = JSON.parse(localStorage.getItem("cart")); // unLoggedCart

  useEffect(() => {
    let dataArr = [];

    if (logged) {
      cart.map((productInCart) => {
        catalog.map((productInCatalog) => {
          productInCart.id === productInCatalog.id ? dataArr.push({ ...productInCatalog, quantity: productInCart.quantity }) : null;
        });
      });
    } else {
      //unLogged
      if (unLoggedCart === null) {
        return;
      }

      unLoggedCart.map((productInCart) => {
        catalog.map((productInCatalog) => {
          productInCart.id === productInCatalog.id ? dataArr.push({ ...productInCatalog, quantity: productInCart.quantity }) : null;
        });
      });
    }

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
