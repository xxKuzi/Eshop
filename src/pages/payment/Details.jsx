import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function Details() {
  const [form, setForm] = useState({ forename: "", surname: "", phoneNumber: "" });

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("details")) || {};

    setForm(data);
  }, []);

  function updateForm(e) {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(form));
  }, [form]);

  return (
    <div>
      <div className="flex flex-col items-center">
        <p className="headline__big relative mt-6">
          <a className="absolute left-[-40px] top-[-5px]" href="http://localhost:5173/payment-delivery">
            <IoIosArrowRoundBack size={30} className="font-bold" />
          </a>
          Kontaktní údaje
        </p>

        <div className="mt-4 flex flex-col items-center rounded-xl border-2 p-6">
          <div>
            <p className="mr-4">Jméno</p>
            <input className="input__normal input" name="forename" type="text" placeholder="Jakub" value={form.forename} onChange={updateForm}></input>
          </div>

          <div className="mt-4">
            <p className="mr-4">Příjmení</p>
            <input className="input__normal input" name="surname" placeholder="Jaroš" type="text" value={form.surname} onChange={updateForm}></input>
          </div>

          <div className="mt-4">
            <p className="mr-4">Telefon</p>
            <input className="input__normal input" name="phoneNumber" placeholder="702552088" type="text" value={form.phoneNumber} onChange={updateForm}></input>
          </div>

          <a className="mt-10" href="http://localhost:5173/payment-summary">
            <button className="button button__normal button__submit">Pokračovat</button>
          </a>
        </div>
      </div>
    </div>
  );
}
