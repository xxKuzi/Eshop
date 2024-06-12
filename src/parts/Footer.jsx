import React from "react";

export default function Footer() {
  return (
    <div className="mt-[100px] flex w-full items-center justify-between bg-gray-800 px-4 py-2">
      <div className="flex w-64 justify-start">
        <img className="h-[100px] rounded-lg bg-white" src="logo.png" />
      </div>

      <div className=" flex w-64 flex-col items-center justify-center text-white">
        <a className="hover:underline" href="/">
          Domů
        </a>
        <a className="hover:underline" href="/products">
          Produkty
        </a>
        <a className="hover:underline" href="/about us">
          O nás
        </a>
        <a className="hover:underline" href="/cart">
          Košík
        </a>
        <a className="hover:underline" href="/dev">
          Develop
        </a>
      </div>
      <div className="flex w-64 justify-end">
        <p className="mr-1 font-bold text-white">TohleChces.cz</p>
      </div>
    </div>
  );
}
