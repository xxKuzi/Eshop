import React, { useState, useEffect } from "react";
import { useData } from "../../parts/Memory.jsx";
import { IoIosArrowRoundBack } from "react-icons/io";
import Items from "../../components/payment/Summary_Items.jsx";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../parts/Base";

export default function Payment_Form() {
  let { profile, setOpenOrder } = useData();
  const [form, setForm] = useState({});

  useEffect(() => {
    let delivery = JSON.parse(localStorage.getItem("delivery"));
    let details = JSON.parse(localStorage.getItem("details"));

    let data = { ...delivery, ...details };

    setForm(data);
  }, []);

  async function handlePayment() {
    fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [...profile.inPayment],
      }),
    })
      .then((res) => {
        console.log("Session :", res);
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function createOrder() {
    const docRef = await addDoc(collection(db, "orders"), { ...form, products: profile.inPayment, uid: profile.uid });

    setOpenOrder(docRef.id);
    handlePayment();
  }

  function renderProfileData() {
    return (
      <div className="flex justify-center gap-8 p-2">
        <div className="flex flex-col">
          <p className="headline__small font-semibold">Údaje</p>
          <div className="h-1 w-32 rounded-md bg-gray-200"></div>
          <div className="mt-3 flex flex-col">
            <p>{form.forename + " " + form.surname}</p>
            <p>{form.phoneNumber}</p>
          </div>
        </div>

        <div className="h-[170px] w-1 rounded-md bg-gray-200"></div>
        <div className="flex flex-col">
          <p className="headline__small font-semibold">Doručení</p>

          <div className="h-1 w-32 rounded-md bg-gray-200"></div>

          <div className="mt-3 flex flex-col">
            <p>{form.kind === 0 ? "Zásilkovna" : "Česká pošta"}</p>
            {form.kind === 0 ? (
              <div>
                <p>{form.shopAdress}</p>
              </div>
            ) : (
              <div>
                <p>{form.street}</p>
                <p>{form.town}</p>
                <p>{form.psc}</p>
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
          <IoIosArrowRoundBack size={30} className="font-bold" />
        </a>
        Shrnutí
      </p>
      <div className="mt-4 flex flex-col rounded-xl border-2 p-4">{renderProfileData()}</div>
      <Items />
      <div className="mt-6 flex justify-center">
        <button className="button button__normal button__submit" onClick={createOrder}>
          Zaplatit
        </button>
      </div>
    </div>
  );
}
