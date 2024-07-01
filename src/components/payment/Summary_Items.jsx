import React, { useState, useEffect } from "react";
import { useData } from "../../parts/Memory.jsx";
import Summary_Item from "../../components/payment/Summary_Item.jsx";

export default function Cart_ItemsUnLogged() {
  const [data, setData] = useState([]);
  let { addToCart, profile, catalog } = useData();

  useEffect(() => {
    let dataArr = [];

    profile.inPayment.map((productInCart) => {
      catalog.map((productInCatalog) => {
        productInCart.id === productInCatalog.id ? dataArr.push({ ...productInCatalog, quantity: productInCart.quantity }) : null;
      });
    });

    setData(dataArr);
  }, [catalog]);

  return (
    <div className="mt-5">
      {data.map((product) => (
        <Summary_Item key={product.id} addToCart={(id, currentQuantity) => addToCart(id, currentQuantity)} data={product}></Summary_Item>
      ))}
    </div>
  );
}
