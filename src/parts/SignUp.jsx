import React from "react";
import { useState } from "react";
import { auth, provider, db } from "./Base";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function SignUp(props) {
  //#region --- --- --- --- --- --- --- --- --- --- INITIALIZATION --- --- --- --- --- --- --- --- --- ---

  const [formData, setFormData] = useState({
    forename: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    newspaper: false,
  });

  const [errorStorage, setErrorStorage] = useState([
    { id: 777, name: "success", state: false, message: "Success" },
    {
      id: 1,
      name: "nothing",
      state: false,
      message: "",
    },
    {
      id: 2,
      name: "badFormat",
      state: false,
      message: "Zadejte prosím platný email",
    },
    {
      id: 3,
      name: "notFilled",
      state: false,
      message: "Prosím vyplňte všechny údaje",
    },
    {
      id: 4,
      name: "tooShort",
      state: false,
      message: "Vaše heslo je příliš krátké (alespoň 6 znaků)",
    },
    {
      id: 5,
      name: "already",
      state: false,
      message: "Účet s tímto emailem již existuje",
    },
    {
      id: 6,
      name: "upperCaseEmail",
      state: false,
      message: "Emailová adresa musí být zapsána pouze malými písmeny",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState();

  //#endregion

  //#region --- --- --- --- --- --- --- --- --- --- FORM UPDATING --- --- --- --- --- --- --- --- --- ---

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  React.useEffect(() => {
    const specialCharacters = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[", "]", "|", "\\", ";", ":", "'", '"', "<", ">", ",", ".", "/", "?", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    formData.email.split("").some((char) => !specialCharacters.includes(char) && char.toUpperCase() === char) ? changeError(6, true) : changeError(6, false);

    let empty = false;
    Object.values(formData).forEach((value) => {
      if (value === "") {
        empty = true;
      }
    });
    if (!empty) {
      changeError(3, false);
    }
  }, [formData]);

  //#endregion

  //#region --- --- --- --- --- --- --- --- --- --- ERROR HANDLING --- --- --- --- --- --- --- --- --- ---

  //After formData UPDATE
  React.useEffect(() => {
    //ON
    !formData.email.includes("@") && formData.email !== "" && formData.phone !== "" ? changeError(2, true) : changeError(2, false);

    //OFF
    formData.password.length >= 6 ? changeError(4, false) : null;
    changeError(5, false);
    formData.email !== "" ? changeError(777, false) : null;
  }, [formData]);

  /* Changing error */
  function changeError(objectId, value) {
    setErrorStorage((prev) => prev.map((item) => (item.id === objectId ? { ...item, state: value } : item)));
  }

  /* Changing error text */
  React.useEffect(() => {
    let errors = (
      <div className="flex flex-col items-center">
        {errorStorage
          .filter((item) => item.state === true)
          .map((item) => (
            <p key={item.id}>{item.message}</p>
          ))}
      </div>
    );
    setErrorMessage(errors);
  }, [errorStorage]);

  //#endregion

  //#region  --- --- --- --- --- --- --- --- --- --- GOOGLE SIGNUP --- --- --- --- --- --- --- --- --- ---

  function googleClick(e) {
    signInWithPopup(auth, provider).then((data) => getData(data, 1));
  }

  //#endregion

  //#region  --- --- --- --- --- --- --- --- --- --- EMAIL SIGNUP --- --- --- --- --- --- --- --- --- ---

  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = formData;

    password.length < 6 ? changeError(4, true) : changeError(4, false);

    let empty = false;
    Object.values(formData).forEach((item) => {
      if (item === "") {
        empty = true;
      }
    });
    if (empty) {
      changeError(3, true);
    } else {
      changeError(3, false);
    }

    if (errorMessage !== "" || password.length < 6 || empty) {
      console.log("RETURNING");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => (typeof data !== null ? getData(data, 0) : changeError(6, true)))
      .catch((error) => (console.log(error), error.message.includes("already") === true ? changeError(5, true) : setErrorMessage((prev) => prev + error.message.split("(")[1].split(")")[0])));
  }

  //#endregion

  //#region  --- --- --- --- --- --- --- --- --- --- CREATE AN ACCOUNT --- --- --- --- --- --- --- --- --- ---

  function successful() {
    setFormData({
      forename: "",
      surname: "",
      email: "",
      phone: "",
      password: "",
      newspaper: false,
    });
    changeError(777, true);
  }

  const getData = async (data, type) => {
    //type 0 - normal registration | 1 - Google registration
    const uid = data.user.uid;
    const verifiedEmail = data.user.email;

    if (type === 0) {
      const docRef = await addDoc(collection(db, "users"), {
        uid: uid,
        email: verifiedEmail,
        phone: formData.phone,
        newspaper: formData.newspaper,
        forename: formData.forename.split("")[0].toUpperCase() + formData.forename.substring(1),
        surname: formData.surname.charAt(0).toUpperCase() + formData.surname.substring(1),
        cart: [],
        inPayment: [],
        city: "",
        street: "",
        postcode: "",
        deliveryKind: "",
        packetaAddress: "",
      });
      console.log("CREATING NEW PROFILE");
    }

    if (type === 1) {
      const fullName = data.user.displayName;

      // Checking if exist ? if YES => only log in
      let exist = false;
      let dataObject = await getDocs(collection(db, "users"));
      dataObject.forEach((doc) => {
        doc.data().uid === uid ? (exist = true) : null;
      });

      if (!exist) {
        const docRef = await addDoc(collection(db, "users"), {
          uid: uid,
          email: verifiedEmail,
          phone: "",
          newspaper: true,
          forename: fullName.split(" ")[0].charAt(0).toUpperCase() + fullName.split(" ")[0].slice(1).toLowerCase(),
          surname: fullName.split(" ")[1].charAt(0).toUpperCase() + fullName.split(" ")[1].slice(1).toLowerCase(),
          cart: [],
          inPayment: [],
          city: "",
          street: "",
          postcode: "",
          deliveryKind: "",
          packetaAddress: "",
        });
        console.log("CREATING NEW PROFILE");
      } else {
        console.log("EXISTING PROFILE LOADED");
      }
    }

    localStorage.setItem("uid", uid);
    successful();

    setTimeout(() => {
      window.location.href = "/";
    }, 700);
  };

  //#endregion

  //#region  --- --- --- --- --- --- --- --- --- --- RETURN --- --- --- --- --- --- --- --- --- ---

  return (
    <div className="signup">
      <div className="container">
        <h1 className="headline mt-3">Registrace</h1>

        <input type="text" className="input__normal input mt-5" name="forename" placeholder="Jméno" value={formData.forename} onChange={handleChange} />
        <input type="text" className="input__normal input" name="surname" placeholder="Příjmení" value={formData.surname} onChange={handleChange} />
        <input type="text" className="input__normal input" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="text" className="input__normal input" name="phone" placeholder="Telefon" value={formData.phone} onChange={handleChange} />
        <input type="text" className="input__normal input" name="password" placeholder="Heslo" value={formData.password} onChange={handleChange} />
        <div className="marketing">
          <input id="newspaper" className="mr-2 mt-2" type="checkbox" name="newspaper" onChange={handleChange} checked={formData.newspaper} />
          <label htmlFor="newspaper" className="font-normal">
            Chci dostávat informace o akčních nabídkách
          </label>
        </div>

        <p className={`error bold mt-4 ${errorStorage[0].state ? "text-green-500" : "text-red-600"}`}>{errorMessage}</p>

        <button className="button button__normal button__submit mt-6" onClick={handleSubmit}>
          Registrovat
        </button>
        <button type="button" className="google" onClick={googleClick}>
          <p className="google--text">Google přihlášení</p>
          <img className="google--logo" src="../../google_logo.png" alt="Google Authentication"></img>
        </button>

        <div className="endText flex items-center">
          <p className="mr-1">Již máš účet?</p>
          <button className="link" onClick={props.changeLoginSwitch}>
            Přihlásit se
          </button>
        </div>
      </div>
    </div>
  );

  //#endregion
}
