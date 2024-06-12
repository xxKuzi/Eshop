import React from "react";

export default function Products_Card({ price = 399, name = "Brýle", images = [{ id: 0, url: "logo2.png" }], handleAddToCart = {}, id }) {
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;

  return (
    <div className="m-3 rounded border-2 border-blue-300">
      <div className="flex h-[390px] min-w-[318px] flex-initial flex-col items-center rounded-xl bg-white pb-4 pt-2 ">
        <a className="flex flex-col justify-center text-center" href={"/product-" + id}>
          <img className="h-[250px]" src={images[0].url} />
          <p className="text-xl font-bold">{name}</p>
          <p className="mt-2">{price}Kč</p>
        </a>
        <button className="button__positive  button button__small mt-4 text-white" onClick={() => (logged ? handleAddToCart() : (window.location.href = "/cart"))}>
          přidat do košíku
        </button>
      </div>
    </div>
  );
}
