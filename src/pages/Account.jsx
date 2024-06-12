import React, { useState, useEffect } from "react";
import { useData } from "../parts/Memory";
import Login from "../parts/LogIn";
import Signup from "../parts/SignUp";
import { MdLocalGasStation } from "react-icons/md";

export default function Account() {
  const { updateProfile, profile } = useData();

  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;

  const [loginSwitch, setLoginSwitch] = useState(true);
  const [newNickname, setNewNickname] = useState();

  React.useEffect(() => {
    profile.uid !== "x" && setNewNickname(profile.nickname);
  }, [profile]);

  return (
    <div className="mt-10 flex flex-col items-center">
      {!logged && loginSwitch && <Login changeLoginSwitch={() => setLoginSwitch(loginSwitch ? false : true)} />}
      {!logged && !loginSwitch && <Signup changeLoginSwitch={() => setLoginSwitch(loginSwitch ? false : true)} />}
      {logged && (
        <div className="flex flex-col items-center rounded-lg border-2 px-16 py-8">
          <p className="headline mt-4">Účet</p>
          <p className="mt-10">{`přezdívka: ${profile.uid !== "x" ? profile.nickname : ""}`}</p>
          <p className="mt-2">{`email: ${profile.uid !== "x" ? profile.email : ""}`}</p>
          <div className="mt-2 flex items-center">
            <p className="pr-3">{`upozornění na slevy, akce na email: ${profile.newspaper ? "ANO" : "NE"}`}</p>
            <button onClick={() => updateProfile("newspaper", !profile.newspaper)} className={"button__extraSmall " + (profile.newspaper ? "button__negative" : "button__submit")}>{`${profile.newspaper ? "Vypnout" : "Zapnout"}`}</button>
          </div>
          <div className="mx-7 mt-8 h-[2px] w-[350px] rounded bg-gray-300"></div>
          <p className="headline__small mt-8">Změnit přezdívku</p>
          <input className="input-normal input mt-6" type="text" value={newNickname} onChange={(e) => setNewNickname(e.target.value)}></input>
          <button className="button__small button__submit mt-8" onClick={() => updateProfile("nickname", newNickname)}>
            Změnit přezdívku
          </button>
        </div>
      )}
      {logged && (
        <div>
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
