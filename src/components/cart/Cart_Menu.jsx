import React from "react";
import { useData } from "../../parts/Memory.jsx";

export default function Cart_Menu() {
  let { profile, catalog, addToPayment } = useData();
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;
  let unLoggedCart = JSON.parse(localStorage.getItem("cart")) || []; // unLoggedCart

  return (
    <div className="mt-10 flex w-[500px] flex-col items-center justify-center rounded-lg border-4 border-gray-300 p-8">
      <p className="text-2xl font-semibold">
        Hodnota tvého košíku je{" "}
        {logged
          ? profile.cart.reduce((total, item) => {
              const catalogItem = catalog.find((catalogItem) => catalogItem.id === item.id);
              if (catalogItem) {
                return total + catalogItem.price * item.quantity;
              } else {
                return total; // Ignore items not found in the catalog
              }
            }, 0)
          : unLoggedCart
            ? unLoggedCart.reduce((total, item) => {
                const catalogItem = catalog.find((catalogItem) => catalogItem.id === item.id);
                if (catalogItem) {
                  return total + catalogItem.price * item.quantity;
                } else {
                  return total; // Ignore items not found in the catalog
                }
              }, 0)
            : 0}{" "}
        korun
      </p>
      <p className="pt-4 text-gray-500">Bezpečná platba</p>

      <button className={"mt-10 rounded-lg  p-3 text-white " + (logged ? (profile.cart.length === 0 ? "bg-gray-300" : "bg-black") : unLoggedCart.length === 0 ? "bg-gray-300" : "bg-black")} disabled={logged ? profile.cart.length === 0 : unLoggedCart.length === 0} onClick={() => addToPayment(logged ? profile.cart : unLoggedCart)}>
        Dokončit nákup
      </button>
    </div>
  );
}
