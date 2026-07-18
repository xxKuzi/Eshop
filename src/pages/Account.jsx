import React, { useState, useEffect, useRef } from "react";
import { useData } from "../parts/Memory";
import Login from "../parts/LogIn";
import Signup from "../parts/SignUp";
import Orders from "../components/account/Account_Orders";
import { useLocation } from "react-router-dom";

export default function Account() {
  const { updateProfile, profile, updateAndRecordProfile } = useData();
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;

  const [loginSwitch, setLoginSwitch] = useState(true);
  const [formData, setFormData] = useState({
    forename: "",
    surname: "",
    phone: "",
    street: "",
    city: "",
    postcode: ""
  });
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (profile.uid !== "x" && profile.uid !== "") {
      setFormData({
        forename: profile.forename || "",
        surname: profile.surname || "",
        phone: profile.phone || "",
        street: profile.street || "",
        city: profile.city || "",
        postcode: profile.postcode || ""
      });
    }
  }, [profile]);

  function changeForm(type, value) {
    setFormData((prev) => ({ ...prev, [type]: value }));
    if (errors[type]) {
      setErrors((prev) => ({ ...prev, [type]: null }));
    }
  }

  function capitalize(name) {
    if (!name) return ""; // Handle the case where the input might be empty or null
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  function validate() {
    let tempErrors = {};
    if (!formData.forename || formData.forename.trim() === "") {
      tempErrors.forename = "Jméno je povinné";
    }
    if (!formData.surname || formData.surname.trim() === "") {
      tempErrors.surname = "Příjmení je povinné";
    }
    if (!formData.phone || formData.phone.trim() === "") {
      tempErrors.phone = "Telefon je povinný";
    } else {
      const cleanPhone = formData.phone.replace(/\s+/g, "");
      if (!/^\+?[0-9]{9,15}$/.test(cleanPhone)) {
        tempErrors.phone = "Neplatný formát (9 až 15 číslic)";
      }
    }
    if (!formData.street || formData.street.trim() === "") {
      tempErrors.street = "Ulice je povinná";
    }
    if (!formData.city || formData.city.trim() === "") {
      tempErrors.city = "Město je povinné";
    }
    if (!formData.postcode || formData.postcode.trim() === "") {
      tempErrors.postcode = "PSČ je povinné";
    } else {
      const cleanPostcode = formData.postcode.replace(/\s+/g, "");
      if (!/^[0-9]{5}$/.test(cleanPostcode)) {
        tempErrors.postcode = "Neplatné PSČ (5 číslic)";
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function handleSave() {
    if (!validate()) {
      return;
    }
    updateAndRecordProfile({
      ...formData,
      surname: capitalize(formData.surname),
      forename: capitalize(formData.forename)
    });
  }

  const location = useLocation();
  const targetRef = useRef(null);

  useEffect(() => {
    if (location.hash === "#orders" && targetRef.current) {
      targetRef.current.scrollIntoView();
    }
  }, [location]);

  return (
    <div className="mt-10 flex flex-col items-center">
      {!logged && loginSwitch && <Login changeLoginSwitch={() => setLoginSwitch(loginSwitch ? false : true)} />}
      {!logged && !loginSwitch && <Signup changeLoginSwitch={() => setLoginSwitch(loginSwitch ? false : true)} />}
      {logged && (
        <div className="flex flex-col items-center rounded-lg border-4 px-16 py-8">
          <p className="headline mt-4 font-bold">Účet</p>
          <div className="mt-10 flex flex-col items-center rounded-xl border-2 border-brand-blue p-6">
            <p className="headline__small">Kontaktní údaje</p>
            <p className="mt-2">{`Jméno: ${profile.uid !== "x" ? profile.forename + " " + profile.surname : ""}`}</p>
            <p className="mt-2">{`Email: ${profile.uid !== "x" ? profile.email : ""}`}</p>
            <p className="mt-2">{`Telefon: ${profile.uid !== "x" ? profile.phone : ""}`}</p>

            <p className="headline__small mt-8">Doručovací údaje</p>
            <p className="mt-2">{`Ulice: ${profile.uid !== "x" ? profile.street : ""}`}</p>
            <p className="mt-2">{`Město: ${profile.uid !== "x" ? profile.city : ""}`}</p>
            <p className="mt-2">{`Psč: ${profile.uid !== "x" ? profile.postcode : ""}`}</p>

            <div className="mt-2 flex items-center">
              <p className="pr-3">{`Upozornění na slevy, akce na email: ${profile.newspaper ? "ANO" : "NE"}`}</p>
              <button onClick={() => updateProfile("newspaper", !profile.newspaper)} className={"button__extraSmall " + (profile.newspaper ? "button__negative" : "button__submit")}>{`${profile.newspaper ? "Vypnout" : "Zapnout"}`}</button>
            </div>
          </div>
          <div className="mx-7 mt-8 h-[2px] w-[350px] rounded bg-gray-300"></div>
          <p className="headline__small mt-8">Změnit údaje</p>
          <div className="relative mt-6 flex items-start gap-10">
            <p className="absolute -left-[85px] top-2">Jméno</p>
            <div className="flex flex-col">
              <input className={`input__normal input ${errors.forename ? "border-red-500 focus:border-red-500" : ""}`} name="forename" type="text" value={formData.forename} onChange={(e) => changeForm(e.target.name, e.target.value)}></input>
              {errors.forename && <p className="text-red-500 text-xs mt-1 w-72 text-left">{errors.forename}</p>}
            </div>
          </div>
          <div className="relative mt-6 flex items-start gap-10">
            <p className="absolute -left-[85px] top-2">Příjmení</p>
            <div className="flex flex-col">
              <input className={`input__normal input ${errors.surname ? "border-red-500 focus:border-red-500" : ""}`} name="surname" type="text" value={formData.surname} onChange={(e) => changeForm(e.target.name, e.target.value)}></input>
              {errors.surname && <p className="text-red-500 text-xs mt-1 w-72 text-left">{errors.surname}</p>}
            </div>
          </div>

          <div className="relative mt-6 flex items-start gap-10">
            <p className="absolute -left-[85px] top-2">Telefon</p>
            <div className="flex flex-col">
              <input className={`input__normal input ${errors.phone ? "border-red-500 focus:border-red-500" : ""}`} name="phone" type="text" value={formData.phone} onChange={(e) => changeForm(e.target.name, e.target.value)}></input>
              {errors.phone && <p className="text-red-500 text-xs mt-1 w-72 text-left">{errors.phone}</p>}
            </div>
          </div>

          <div className="relative mt-6 flex items-start gap-10">
            <p className="absolute -left-[85px] top-2">Ulice</p>
            <div className="flex flex-col">
              <input className={`input__normal input ${errors.street ? "border-red-500 focus:border-red-500" : ""}`} name="street" type="text" value={formData.street} onChange={(e) => changeForm(e.target.name, e.target.value)}></input>
              {errors.street && <p className="text-red-500 text-xs mt-1 w-72 text-left">{errors.street}</p>}
            </div>
          </div>

          <div className="relative mt-6 flex items-start gap-10">
            <p className="absolute -left-[85px] top-2">Město</p>
            <div className="flex flex-col">
              <input className={`input__normal input ${errors.city ? "border-red-500 focus:border-red-500" : ""}`} name="city" type="text" value={formData.city} onChange={(e) => changeForm(e.target.name, e.target.value)}></input>
              {errors.city && <p className="text-red-500 text-xs mt-1 w-72 text-left">{errors.city}</p>}
            </div>
          </div>

          <div className="relative mt-6 flex items-start gap-10">
            <p className="absolute -left-[85px] top-2">PSČ</p>
            <div className="flex flex-col">
              <input className={`input__normal input ${errors.postcode ? "border-red-500 focus:border-red-500" : ""}`} name="postcode" type="text" value={formData.postcode} onChange={(e) => changeForm(e.target.name, e.target.value)}></input>
              {errors.postcode && <p className="text-red-500 text-xs mt-1 w-72 text-left">{errors.postcode}</p>}
            </div>
          </div>

          <button className="button__small button__submit mt-8" onClick={handleSave}>
            Uložit změny
          </button>
        </div>
      )}
      {logged && (
        <div className="flex flex-col items-center">
          <section id="orders" ref={targetRef}>
            <Orders />
          </section>
          <button
            className="button__normal button__negative mt-10"
            onClick={() => {
              localStorage.setItem("uid", "x");
              window.location.reload();
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
