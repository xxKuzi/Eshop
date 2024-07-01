import React from "react";

import { useData } from "../parts/Memory.jsx";
import Item from "./cart/Cart_Item.jsx";

export default function Cart_BluredItems() {
  const catalog = useData().catalog;

  return (
    <div className="mt-8">
      {catalog.map((product, i) => {
        if (i === 3) {
          return;
        }
        return <Item key={product.id} data={{ ...product, quantity: i < 1 ? i + 1 : 2 }}></Item>;
      })}
    </div>
  );
}
