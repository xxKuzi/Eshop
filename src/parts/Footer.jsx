import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="mt-[100px] flex w-full items-center justify-between bg-gray-800 px-4 py-2">
      <div className="flex w-64 justify-start">
        <img className="h-[60px] rounded-lg bg-white" src="logo.png" />
      </div>

      <div className=" flex w-64 items-center justify-center gap-6 text-nowrap text-white">
        <Link className="hover:underline" to="/">
          Domů
        </Link>
        <Link className="hover:underline" to="/products">
          Produkty
        </Link>
        <Link className="hover:underline" to="/blog">
          Blog
        </Link>
        <Link className="hover:underline" to="/about-us">
          O nás
        </Link>
        <Link className="hover:underline" to="/cart">
          Košík
        </Link>
        <Link className="hover:underline" to="/dev">
          Develop
        </Link>
      </div>
      <div className="flex w-64 justify-end">
        <p className="mr-1 font-bold text-white">TohleChces.cz</p>
      </div>
    </div>
  );
}
