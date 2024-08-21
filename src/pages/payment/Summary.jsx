import React, { useState, useEffect } from "react";
import { useData } from "../../parts/Memory.jsx";
import { IoIosArrowRoundBack } from "react-icons/io";
import Items from "../../components/payment/Summary_Items.jsx";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../../parts/Base";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../parts/Base.js";
import { loadStripe } from "@stripe/stripe-js";

export default function Payment_Form() {
  let { profile, catalog, addOrderToProfile, updateProfile } = useData();
  const [form, setForm] = useState({});
  const stripePromise = loadStripe("pk_test_51PFgqzBgAsz06aBbyWeh8PhdqfR9tgomzZLywE66u46cn40vNZs1cKESABxZYXzsZ5yrm3lwN1EFLpuq4VdKX9Mc00ugNhOTL4");
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;

  useEffect(() => {
    if (!logged) {
      let details = JSON.parse(localStorage.getItem("details"));
      if (details) {
        setForm(details);
      }
    }
  }, []);

  useEffect(() => {
    if (logged) {
      const { forename, surname, email, phone, street, city, postcode, packetaAddress, deliveryKind } = profile;
      setForm({ forename, surname, email, phone, street, city, postcode, packetaAddress, deliveryKind, paymentState: "pending" });
    }
  }, [profile]);

  function objectsAreEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }
    return keys1.every((key) => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
  }

  function CheckArrayEquality(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    return arr1.every((element, index) => objectsAreEqual(element, arr2[index]));
  }

  async function createOrder() {
    if (logged) {
      let paymentItems = [];

      profile.inPayment.forEach((paymentItem) => {
        catalog.forEach((catalogItem) => {
          if (catalogItem.id === paymentItem.id) {
            paymentItems.push({ ...catalogItem, quantity: paymentItem.quantity });
          }
        });
      });

      const paymentFunction = httpsCallable(functions, "createStripeCheckout");
      const stripe = await stripePromise;
      const response = await paymentFunction(paymentItems);
      let sessionId = response.data.id;
      await addOrderToProfile(sessionId);

      await setDoc(doc(collection(db, "orders"), sessionId), { ...form, products: profile.inPayment, uid: profile.uid });
      CheckArrayEquality(profile.cart, profile.inPayment) ? await updateProfile("cart", []) : null;
      await stripe.redirectToCheckout({ sessionId: sessionId });
    } else {
      let paymentItems = [];
      let inPayment = JSON.parse(localStorage.getItem("inPayment"));
      inPayment.forEach((paymentItem) => {
        catalog.forEach((catalogItem) => {
          if (catalogItem.id === paymentItem.id) {
            paymentItems.push({ ...catalogItem, quantity: paymentItem.quantity });
          }
        });
      });

      const paymentFunction = httpsCallable(functions, "createStripeCheckout");
      const stripe = await stripePromise;
      const response = await paymentFunction(paymentItems);
      let sessionId = response.data.id;

      await setDoc(doc(collection(db, "orders"), sessionId), { ...form, products: inPayment, uid: "unregistred" });
      let cart = JSON.parse(localStorage.getItem("cart"));
      CheckArrayEquality(cart, inPayment) ? localStorage.setItem("cart", JSON.stringify([])) : null;
      await stripe.redirectToCheckout({ sessionId: sessionId });
    }
  }

  function renderProfileData() {
    return (
      <div className="flex justify-between gap-8 px-6 py-4">
        <div className="flex min-w-[200px] flex-col">
          <p className="headline__small">Kontaktní údaje</p>
          <div className="h-1 w-[162px] rounded-md bg-gray-200"></div>
          <div className="mt-3 flex flex-col text-gray-600">
            <p>{form.forename + " " + form.surname}</p>
            <p>{form.phone}</p>
            <p>{form.email}</p>
            <p>{form.street + ", " + form.postcode + " " + form.city}</p>
          </div>
        </div>

        <div className="h-[170px] w-1 rounded-md bg-gray-200"></div>
        <div className="flex flex-col">
          <p className="headline__small ">Doručení</p>

          <div className="h-1 w-32 rounded-md bg-gray-200"></div>

          <div className="mt-3 flex min-w-[200px] flex-col text-gray-600">
            <p>{form.deliveryKind === 0 ? "Zásilkovna" : "Česká pošta"}</p>
            {form.deliveryKind === 0 ? (
              <div>
                <p>{form.packetaAddress}</p>
              </div>
            ) : (
              <div>
                <p>{form.street}</p>
                <p>{form.town}</p>
                <p>{form.postcode}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <p className="headline__big relative mt-6">
        <a className="absolute left-[-40px] top-[-5px]" href="http://localhost:5173/payment-details">
          <IoIosArrowRoundBack size={30} title="zpět" className="font-bold duration-200 hover:-translate-x-1" />
        </a>
        Shrnutí
      </p>
      <div className="mt-4 flex flex-col rounded-xl border-2 p-4">
        {renderProfileData()}
        <Items />
      </div>

      <div className="mt-6 flex justify-center">
        <button className="button button__normal button__submit" onClick={createOrder}>
          Zaplatit
        </button>
      </div>
    </div>
  );
}
