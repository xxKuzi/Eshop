import React from "react";

import Menu from "../components/cart/Cart_Menu.jsx";
import Items from "../components/cart/Cart_Items.jsx";

export default function Cart() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <Menu />
        <Items />
      </div>
    </div>
  );
}
