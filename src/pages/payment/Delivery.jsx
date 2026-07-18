import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useData } from "../../parts/Memory";

export default function Delivery() {
  const [form, setForm] = useState({
    deliveryKind: 0,
    street: "",
    city: "",
    postcode: "",
    phone: "",
    email: "",
    packetaAddress: ""
  });
  const [errors, setErrors] = useState({});
  const { profile, updateAndRecordProfile } = useData();
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      let data = JSON.parse(localStorage.getItem("details")) || {};
      setForm((prev) => ({ ...prev, ...data }));
    }
  }, []);

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
    if (logged) {
      const { forename, surname, email, phone, street, city, postcode, packetaAddress, deliveryKind } = profile;
      setForm({
        street: street || "",
        city: city || "",
        postcode: postcode || "",
        phone: phone || "",
        email: email || "",
        packetaAddress: packetaAddress || "",
        deliveryKind: deliveryKind !== undefined ? deliveryKind : 0
      });
    }
  }, [profile]);

  function updateFormDelivery(kind) {
    setForm((prev) => {
      return { ...prev, deliveryKind: kind };
    });
    setErrors({});
  }

  useEffect(() => {
    if (!logged) {
      localStorage.setItem("details", JSON.stringify(form));
    }
  }, [form]);

  function validate() {
    let tempErrors = {};
    if (form.deliveryKind === 0) {
      if (!form.packetaAddress || form.packetaAddress.trim() === "") {
        tempErrors.packetaAddress = "Adresa Zásilkovny je povinná";
      }
    } else if (form.deliveryKind === 1) {
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
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function next(e) {
    if (!validate()) {
      return;
    }
    if (logged) {
      updateAndRecordProfile(form);
    }

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
          <p>Momentálně funguje doručení přes zásilkovnu jenom takto:</p>

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
            <input placeholder="Žďár nad Sázavou, nám. Republiky 2631/12 (Traficon-Iqos)" name="packetaAddress" onChange={updateForm} value={form.packetaAddress} className={`input__small mt-6 w-[450px] ${errors.packetaAddress ? "!border-red-500 focus:!border-red-500" : ""}`}></input>
            {errors.packetaAddress && <p className="text-red-500 text-xs mt-1 text-center w-[450px]">{errors.packetaAddress}</p>}
          </div>
          <button className="button__normal button__submit mt-10" onClick={next}>
            Pokračovat
          </button>
        </div>
      )}

      {form.deliveryKind === 1 && (
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border-2 p-6">
          <div className="flex flex-col items-center">
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

          <button className="button__normal button__submit mt-10" onClick={next}>
            Pokračovat
          </button>
        </div>
      )}
    </div>
  );
}
