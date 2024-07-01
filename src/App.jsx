import React from "react";
import "./App.css";

import Navbar from "./parts/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Account from "./pages/Account.jsx";
import Products from "./pages/Products.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Cart from "./pages/Cart.jsx";
import Dev from "./dev/Dev.jsx";
import Delivery from "./pages/payment/Delivery.jsx";
import Summary from "./pages/payment/Summary.jsx";
import Details from "./pages/payment/Details.jsx";
import Success from "./components/payment/PaymentSuccess.jsx";
import Cancel from "./components/payment/PaymentCancel.jsx";

import { Routes, Route } from "react-router-dom";
import { Memory, useData } from "./parts/Memory.jsx";

function App() {
  const { catalog } = useData();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dev" element={<Dev />} />
        {catalog.map((item) => {
          return <Route key={item.id} path={"/product-" + item.id} element={<ProductPage data={item} />} />;
        })}
        <Route path="/payment-delivery" element={<Delivery />} />
        <Route path="/payment-details" element={<Details />} />
        <Route path="/payment-summary" element={<Summary />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-cancel" element={<Cancel />} />
      </Routes>
    </>
  );
}

export default App;
