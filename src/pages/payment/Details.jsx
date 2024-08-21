import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useData } from "../../parts/Memory";

export default function Details() {
  const { profile, updateAndRecordProfile } = useData();
  const [form, setForm] = useState({ forename: "", surname: "", email: "", phone: "" });
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;

  useEffect(() => {
    if (!logged) {
      let data = JSON.parse(localStorage.getItem("details")) || {};
      console.log("setting data ", data);
      setForm(data);
    }
  }, []);

  useEffect(() => {
    if (logged) {
      setForm({ forename: profile.forename, surname: profile.surname, phone: profile.phone, email: profile.email, city: profile.city, street: profile.street, postcode: profile.postcode });
    }
  }, [profile]);

  function updateForm(e) {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  useEffect(() => {
    if (!logged) {
      localStorage.setItem("details", JSON.stringify(form));
    }
  }, [form]);

  function handleSubmit() {
    if (logged) {
      updateAndRecordProfile(form);
    }
    setTimeout(() => {
      window.location.href = "/payment-summary";
    }, 700);
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <p className="headline__big relative mt-6">
          <a className="absolute left-[-40px] top-[-5px]" href="http://localhost:5173/payment-delivery">
            <IoIosArrowRoundBack size={30} title="zpět" className="font-bold duration-200 hover:-translate-x-1" />
          </a>
          Dodací údaje
        </p>
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border-2 px-8 py-4">
          <div className="flex flex-col items-center p-6">
            <p className="headline__small">Kontaktní údaje</p>
            <div className="mt-4">
              <p className="mr-4">Jméno</p>
              <input className="input__normal input" name="forename" type="text" placeholder="Jakub" value={form.forename} onChange={updateForm}></input>
            </div>

            <div className="mt-4">
              <p className="mr-4">Příjmení</p>
              <input className="input__normal input" name="surname" placeholder="Jaroš" type="text" value={form.surname} onChange={updateForm}></input>
            </div>

            <div className="mt-4">
              <p className="mr-4">Email</p>
              <input disabled={logged} className="input__normal input disabled:opacity-75" name="email" placeholder="jakub.jaros@gmail.com" type="text" value={form.email} onChange={updateForm}></input>
            </div>

            <div className="mt-4">
              <p className="mr-4">Telefon</p>
              <input className="input__normal input" name="phone" placeholder="702552088" type="text" value={form.phone} onChange={updateForm}></input>
            </div>
          </div>

          <div className="mt-4 w-[320px] rounded-full border-2"></div>

          <div className="mt-8 flex flex-col items-center justify-center p-6">
            <p className="headline__small">Fakturační adresa</p>
            <div className="mt-4">
              <p className="mr-4">Ulice</p>
              <input className="input__normal input" type="text" name="street" value={form.street} onChange={updateForm}></input>
            </div>

            <div className="mt-4">
              <p className="mr-4">Město</p>
              <input className="input__normal input" type="text" name="city" value={form.city} onChange={updateForm}></input>
            </div>

            <div className="mt-4">
              <p className="mr-4">PSČ</p>
              <input className="input__normal input" type="text" name="postcode" value={form.postcode} onChange={updateForm}></input>
            </div>
          </div>

          <button className="button button__normal button__submit mt-10" onClick={handleSubmit}>
            Pokračovat
          </button>
        </div>
      </div>
    </div>
  );
}
