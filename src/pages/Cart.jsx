import React from "react";

import Menu from "../components/cart/Cart_Menu.jsx";
import Items from "../components/cart/Cart_Items.jsx";
import BluredItems from "../components/cart/Cart_BluredItems.jsx";

export default function Cart() {
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;

  return (
    <div className="flex flex-col items-center">
      {logged ? (
        <div className="flex flex-col items-center">
          <Menu />
          <Items />
        </div>
      ) : (
        <div className="relative flex flex-col items-center">
          <div className="pointer-events-none flex flex-col items-center opacity-30">
            <Menu />
            <BluredItems />
          </div>
          <div className="absolute top-[200px] flex flex-col items-center rounded-lg border-2 bg-white p-8">
            <p>Pro použití košíku se prosím příhlaste se</p>
            <a href="/account">
              <button className="button button__normal button__positive mt-4">přihlásit se</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
