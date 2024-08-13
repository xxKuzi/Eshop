import React, { useState, useEffect } from "react";
import { useData } from "../parts/Memory";
import Login from "../parts/LogIn";
import Signup from "../parts/SignUp";
import Orders from "../components/account/Account_Orders";

export default function Account() {
  const { updateProfile, profile, updateAndRecordProfile } = useData();
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;

  const [loginSwitch, setLoginSwitch] = useState(true);
  const [formData, setFormData] = useState({});

  React.useEffect(() => {
    profile.uid !== "x" && setFormData((prev) => ({ ...prev, forename: profile.forename, surname: profile.surname, city: profile.city, street: profile.street, postcode: profile.postcode }));
    console.log("street bro", profile.street);
    console.log(profile);
  }, [profile]);

  function changeForm(type, value) {
    setFormData((prev) => ({ ...prev, [type]: value }));
  }
  function capitalize(name) {
    if (!name) return ""; // Handle the case where the input might be empty or null
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

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
          <div className="relative mt-6 flex items-center gap-10">
            <p className="absolute -left-[85px] ">Jméno</p>
            <input className="input-normal input" name="forename" type="text" value={formData.forename} onChange={(e) => changeForm(e.target.name, e.target.value)}></input>
          </div>
          <div className="relative mt-6 flex items-center gap-10">
            <p className="absolute -left-[85px]">Příjmení</p>
            <input className="input-normal input" name="surname" type="text" value={formData.surname} onChange={(e) => changeForm(e.target.name, e.target.value)}></input>
          </div>

          <div className="relative mt-6 flex items-center gap-10">
            <p className="absolute -left-[85px]">Telefon</p>
            <input className="input-normal input" name="phone" type="text" value={formData.phone} onChange={(e) => changeForm(e.target.name, e.target.value)}></input>
          </div>

          <div className="relative mt-6 flex items-center gap-10">
            <p className="absolute -left-[85px]">Ulice</p>
            <input className="input-normal input" name="street" type="text" value={formData.street} onChange={(e) => changeForm(e.target.name, e.target.value)}></input>
          </div>

          <div className="relative mt-6 flex items-center gap-10">
            <p className="absolute -left-[85px]">Město</p>
            <input className="input-normal input" name="city" type="text" value={formData.city} onChange={(e) => changeForm(e.target.name, e.target.value)}></input>
          </div>

          <div className="relative mt-6 flex items-center gap-10">
            <p className="absolute -left-[85px]">PSČ</p>
            <input className="input-normal input" name="postcode" type="text" value={formData.postcode} onChange={(e) => changeForm(e.target.name, e.target.value)}></input>
          </div>

          <button className="button__small button__submit mt-8" onClick={() => updateAndRecordProfile({ ...formData, surname: capitalize(formData.surname), forename: capitalize(formData.forename) })}>
            Uložit změny
          </button>
        </div>
      )}
      {logged && (
        <div className="flex flex-col items-center">
          <Orders />
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
