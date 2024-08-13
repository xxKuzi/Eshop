import React, { useState, useEffect } from "react";
import Packeta from "../../components/payment/Packeta.jsx";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useData } from "../../parts/Memory";

export default function Delivery() {
  const [form, setForm] = useState({ deliveryKind: 0 });
  const { profile, updateAndRecordProfile } = useData();
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      let data = JSON.parse(localStorage.getItem("details")) || { deliveryKind: 0 };
      setForm(data);
    }
  }, []);

  function updateForm(e) {
    setForm((form) => {
      return { ...form, [e.target.name]: e.target.value };
    });
  }

  useEffect(() => {
    if (logged) {
      setForm(profile);
      console.log("hello");
      console.log(profile);
    }
  }, [profile]);

  function updateFormDelivery(kind) {
    setForm((prev) => {
      return { deliveryKind: kind };
    });
  }

  useEffect(() => {
    if (!logged) {
      localStorage.setItem("details", JSON.stringify(form));
    }
    console.log("update");
    console.log("form ", form);
  }, [form]);

  function next() {
    updateAndRecordProfile(form);
    setTimeout(() => {
      navigate("/payment-details");
    }, 700);
  }
  return (
    <div className="mb-8 flex flex-col items-center">
      <p className="headline__big relative mt-6">
        <a className="absolute left-[-40px] top-[-5px]" href="http://localhost:5173/cart">
          <IoIosArrowRoundBack size={30} title="zpět" className="font-bold duration-200 hover:-translate-x-1" />
        </a>
        Kam to máme poslat?
      </p>

      <div className="mt-4 flex rounded-xl border-2">
        <button className={(form.deliveryKind === 0 && "rounded-xl border-2 border-brand-blue duration-200") + " button mr-4 w-32 p-4"} onClick={() => updateFormDelivery(0)}>
          Zásilkovna
        </button>
        <div className="mr-4 h-16 w-[2px] rounded border-2"></div>
        <button className={(form.deliveryKind === 1 && "rounded-xl border-2 border-brand-blue duration-200") + " button w-32 p-4"} onClick={() => updateFormDelivery(1)}>
          Česká pošta
        </button>
      </div>

      {form.deliveryKind === 0 && (
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border-2 p-6">
          <p>Momentálně funguje doručení přes zásilkovnu následovně:</p>

          <div className="flex flex-col items-center justify-center p-4">
            <div className="mt-8 flex gap-4">
              <p className="mr-4 text-4xl font-bold">1</p>
              <p className="mr-2 text-3xl">Přejdete na stránku Zásilkovny</p>
              <a className="flex items-center" target="_blank" href="https://www.zasilkovna.cz/pobocky">
                <p className="text-2xl font-bold text-red-600 underline">ZDE</p>
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-xl p-4">
            <div className="mt-8 flex gap-4">
              <p className="mr-4 text-4xl font-bold">2</p>
              <p className="mr-2 text-3xl">Vyberete si prodejnu a zkopírujete adresu</p>
            </div>

            <img className="mt-4 max-h-[155px] object-contain" src="packeta_2.png" />
          </div>

          <div className="flex flex-col justify-center rounded-xl  p-4">
            <div className="relative mt-8 flex gap-4">
              <p className="mr-4 text-4xl font-bold">3</p>
              <p className=" mr-2 text-3xl">Vložte ji sem</p>

              <p className="absolute right-[-75px] top-0 text-8xl font-bold text-green-500 ">:{")"}</p>
            </div>
            <input placeholder="Žďár nad Sázavou, nám. Republiky 2631/12 (Traficon-Iqos)" name="packetaAddress" onChange={updateForm} value={form.packetaAddress} className="input__small mt-6 w-[450px]"></input>
          </div>
          <button className="button__normal button__submit mt-10" onClick={next}>
            Pokračovat
          </button>
        </div>
      )}

      {form.deliveryKind === 1 && (
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border-2 p-6">
          <div>
            <p className="mr-4">Ulice</p>
            <input className="input__normal input" type="text" name="street" value={form.street} onChange={updateForm}></input>
          </div>

          <div className="mt-4">
            <p className="mr-4">Město</p>
            <input className="input__normal input" type="text" name="city" value={form.city} onChange={updateForm}></input>
          </div>

          <div className="mt-4">
            <p className="mr-4">PSČ</p>
            <input className="input__normal input" type="text" name="psc" value={form.psc} onChange={updateForm}></input>
          </div>

          <button className="button__normal button__submit mt-10" onClick={next}>
            Pokračovat
          </button>
        </div>
      )}
    </div>
  );
}
