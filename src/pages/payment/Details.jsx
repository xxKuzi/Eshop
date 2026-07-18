import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useData } from "../../parts/Memory";

export default function Details() {
  const { profile, updateAndRecordProfile } = useData();
  const [form, setForm] = useState({
    forename: "",
    surname: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postcode: ""
  });
  const [errors, setErrors] = useState({});
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;

  useEffect(() => {
    if (!logged) {
      let data = JSON.parse(localStorage.getItem("details")) || {};
      console.log("setting data ", data);
      setForm((prev) => ({ ...prev, ...data }));
    }
  }, []);

  useEffect(() => {
    if (logged) {
      setForm({
        forename: profile.forename || "",
        surname: profile.surname || "",
        phone: profile.phone || "",
        email: profile.email || "",
        city: profile.city || "",
        street: profile.street || "",
        postcode: profile.postcode || ""
      });
    }
  }, [profile]);

  function validate() {
    let tempErrors = {};
    if (!form.forename || form.forename.trim() === "") {
      tempErrors.forename = "Jméno je povinné";
    }
    if (!form.surname || form.surname.trim() === "") {
      tempErrors.surname = "Příjmení je povinné";
    }
    if (!form.email || form.email.trim() === "") {
      tempErrors.email = "Email je povinný";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      tempErrors.email = "Neplatný formát emailu";
    }
    if (!form.phone || form.phone.trim() === "") {
      tempErrors.phone = "Telefon je povinný";
    } else {
      const cleanPhone = form.phone.replace(/\s+/g, "");
      if (!/^\+?[0-9]{9,15}$/.test(cleanPhone)) {
        tempErrors.phone = "Neplatný formát (9 až 15 číslic)";
      }
    }
    if (!form.street || form.street.trim() === "") {
      tempErrors.street = "Ulice je povinná";
    }
    if (!form.city || form.city.trim() === "") {
      tempErrors.city = "Město je povinné";
    }
    if (!form.postcode || form.postcode.trim() === "") {
      tempErrors.postcode = "PSČ je povinné";
    } else {
      const cleanPostcode = form.postcode.replace(/\s+/g, "");
      if (!/^[0-9]{5}$/.test(cleanPostcode)) {
        tempErrors.postcode = "Neplatné PSČ (5 číslic)";
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function updateForm(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }

  useEffect(() => {
    if (!logged) {
      localStorage.setItem("details", JSON.stringify(form));
    }
  }, [form]);

  function handleSubmit() {
    if (!validate()) {
      return;
    }
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
            <div className="mt-4 flex flex-col items-center">
              <p className="mb-1 w-full text-left">Jméno</p>
              <input className={`input__normal input ${errors.forename ? "border-red-500 focus:border-red-500" : ""}`} name="forename" type="text" placeholder="Jakub" value={form.forename} onChange={updateForm}></input>
              {errors.forename && <p className="text-red-500 text-xs mt-1 w-72 text-left">{errors.forename}</p>}
            </div>

            <div className="mt-4 flex flex-col items-center">
              <p className="mb-1 w-full text-left">Příjmení</p>
              <input className={`input__normal input ${errors.surname ? "border-red-500 focus:border-red-500" : ""}`} name="surname" placeholder="Jaroš" type="text" value={form.surname} onChange={updateForm}></input>
              {errors.surname && <p className="text-red-500 text-xs mt-1 w-72 text-left">{errors.surname}</p>}
            </div>

            <div className="mt-4 flex flex-col items-center">
              <p className="mb-1 w-full text-left">Email</p>
              <input disabled={logged} className={`input__normal input disabled:opacity-75 ${errors.email ? "border-red-500 focus:border-red-500" : ""}`} name="email" placeholder="jakub.jaros@gmail.com" type="text" value={form.email} onChange={updateForm}></input>
              {errors.email && <p className="text-red-500 text-xs mt-1 w-72 text-left">{errors.email}</p>}
            </div>

            <div className="mt-4 flex flex-col items-center">
              <p className="mb-1 w-full text-left">Telefon</p>
              <input className={`input__normal input ${errors.phone ? "border-red-500 focus:border-red-500" : ""}`} name="phone" placeholder="702552088" type="text" value={form.phone} onChange={updateForm}></input>
              {errors.phone && <p className="text-red-500 text-xs mt-1 w-72 text-left">{errors.phone}</p>}
            </div>
          </div>

          <div className="mt-4 w-[320px] rounded-full border-2"></div>

          <div className="mt-8 flex flex-col items-center justify-center p-6">
            <p className="headline__small">Fakturační adresa</p>
            <div className="mt-4 flex flex-col items-center">
              <p className="mb-1 w-full text-left">Ulice</p>
              <input className={`input__normal input ${errors.street ? "border-red-500 focus:border-red-500" : ""}`} type="text" name="street" value={form.street} onChange={updateForm}></input>
              {errors.street && <p className="text-red-500 text-xs mt-1 w-72 text-left">{errors.street}</p>}
            </div>

            <div className="mt-4 flex flex-col items-center">
              <p className="mb-1 w-full text-left">Město</p>
              <input className={`input__normal input ${errors.city ? "border-red-500 focus:border-red-500" : ""}`} type="text" name="city" value={form.city} onChange={updateForm}></input>
              {errors.city && <p className="text-red-500 text-xs mt-1 w-72 text-left">{errors.city}</p>}
            </div>

            <div className="mt-4 flex flex-col items-center">
              <p className="mb-1 w-full text-left">PSČ</p>
              <input className={`input__normal input ${errors.postcode ? "border-red-500 focus:border-red-500" : ""}`} type="text" name="postcode" value={form.postcode} onChange={updateForm}></input>
              {errors.postcode && <p className="text-red-500 text-xs mt-1 w-72 text-left">{errors.postcode}</p>}
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
