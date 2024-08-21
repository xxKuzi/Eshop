import React, { useState, useEffect } from "react";
import { useData } from "../../parts/Memory.jsx";
import Summary_Item from "../../components/payment/Summary_Item.jsx";

export default function Summary_Items() {
  const [data, setData] = useState([]);
  let { profile, catalog } = useData();
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;

  useEffect(() => {
    let dataArr = [];

    if (logged) {
      profile.inPayment.map((productInCart) => {
        catalog.map((productInCatalog) => {
          productInCart.id === productInCatalog.id ? dataArr.push({ ...productInCatalog, quantity: productInCart.quantity }) : null;
        });
      });
    } else {
      let inPayment = JSON.parse(localStorage.getItem("inPayment"));
      inPayment.forEach((paymentItem) => {
        catalog.forEach((catalogItem) => {
          paymentItem.id === catalogItem.id ? dataArr.push({ ...catalogItem, quantity: paymentItem.quantity }) : null;
        });
      });
    }
    setData(dataArr);
  }, [catalog]);

  return (
    <div className="mt-5">
      {data.map((product) => (
        <Summary_Item key={product.id} data={product}></Summary_Item>
      ))}
    </div>
  );
}
