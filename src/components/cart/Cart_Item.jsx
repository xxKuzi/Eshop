import React, { useState } from "react";
import { useData } from "../../parts/Memory.jsx";

export default function Cart_Item(props) {
  let { addToCart } = useData();
  let { id, name, price, images, quantity } = props.data;
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;

  return (
    <div>
      <div className="flex items-center justify-between rounded-lg border-2 px-8 py-4">
        <div className="mr-8 flex items-center">
          <img className="mr-3 h-16 pr-3" src={images[0].url}></img>
          <p className=" text-xl font-bold">{name}</p>
        </div>
        <div className="flex items-center">
          <div className="mr-8 flex items-center rounded-xl border-2 p-3">
            <p className="mr-3">
              {" "}
              {quantity} {quantity === 0 ? "kusů" : quantity === 1 ? "kus" : quantity < 5 ? "kusy" : "kusů"}
            </p>
            <button className="mr-2" onClick={() => addToCart(id, 1)}>
              +
            </button>
            <button className="" onClick={() => addToCart(id, -1)}>
              -
            </button>
          </div>
          <p className=" mr-8 text-nowrap text-lg">{price} Kč</p>
          <p className="w-16 text-nowrap text-xl font-bold">{price * quantity} Kč</p>
        </div>
      </div>
    </div>
  );
}
