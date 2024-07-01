import React, { useState, useEffect, useRef } from "react";
import { useData } from "../parts/Memory.jsx";
import Card from "../components/products/Products_Card.jsx";
import Footer from "../parts/Footer.jsx";
import { useLocation } from "react-router-dom";

export default function Products() {
  const { catalog, addToCart, addToLocalCart, refreshCatalog } = useData();
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;

  const allProducts = catalog.map((item) => {
    return <Card key={item.id} name={item.name} price={item.price} images={item.images} id={item.id} handleAddToCart={() => addToCart(item.id, 1)} />;
  });

  function selectedProducts(selectedIds) {
    const filteredCatalog = catalog.filter((item) => selectedIds.includes(item.id));

    return (
      <div className="flex items-center">
        {filteredCatalog.map((selectedItem, index) => (
          <div className="flex items-center" key={selectedItem.id}>
            <Card name={selectedItem.name} price={selectedItem.price} images={selectedItem.images} id={selectedItem.id} handleAddToCart={() => (logged ? addToCart(selectedItem.id, 1) : (addToLocalCart(selectedItem.id, 1), refreshCatalog()))} />
            {index !== filteredCatalog.length - 1 && <div className="mx-7 h-[250px] w-[2px] rounded bg-gray-300"></div>}
          </div>
        ))}
      </div>
    );
  }

  const location = useLocation();
  const targetRef = useRef(null);

  useEffect(() => {
    if (location.hash === "#free-time" && targetRef.current) {
      targetRef.current.scrollIntoView();
    }
  }, [location]);

  return (
    <div>
      <section id="sport" className="mt-8"></section>
      <div className="mx-24 flex flex-col items-start">
        <p className="mt-5 text-3xl font-bold">Sportovní brýle</p>
        <div className="mt-3 flex flex-wrap justify-center rounded-xl bg-gray-100  p-5">{selectedProducts([0, 1])}</div>

        <section id="free-time" className="mt-8" ref={targetRef}></section>
        <p className="text-3xl font-bold">Volnočasové brýle</p>
        <div className="mt-3 flex flex-wrap justify-center rounded-xl bg-gray-100  p-5">{selectedProducts([2, 3])}</div>

        <p className="mt-8 text-3xl font-bold">Všechny brýle</p>
        <div className="mt-3 flex flex-wrap justify-center rounded-xl bg-gray-100 p-5">{allProducts}</div>
      </div>
      <Footer />
    </div>
  );
}
