import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "./Base";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useData } from "./Memory";

export default function LogIn(props) {
  //#region --- --- --- --- --- --- --- --- --- --- INITIALIZATION --- --- --- --- --- --- --- --- --- ---
  const { addToCart } = useData();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorStorage, setErrorStorage] = useState([
    { id: 777, name: "success", state: false, message: "Success" },
    {
      id: 1,
      name: "duplicate",
      state: false,
      message: "This email address already exists",
    },
    {
      id: 2,
      name: "badFormat",
      state: false,
      message: "Zadejte prosím platný email",
    },
    {
      id: 3,
      name: "notSamePassword",
      state: false,
      message: "Vaše hesla se neshodují",
    },
    {
      id: 4,
      name: "free",
      state: false,
      message: "",
    },
    {
      id: 5,
      name: "free2",
      state: false,
      message: "",
    },
    {
      id: 6,
      name: "upperCaseEmail",
      state: false,
      message: "Emailová adresa musí být zapsána pouze malými písmeny",
    },
    {
      id: 7,
      name: "incorrectData",
      state: false,
      message: "Zadané údaje nejsou správné",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState("");

  //#endregion

  //#region --- --- --- --- --- --- --- --- --- --- FORM UPDATING --- --- --- --- --- --- --- --- --- ---

  /* Changing values */
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  /* Checking for upperCase and Special letters */
  useEffect(() => {
    const specialCharacters = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[", "]", "|", "\\", ";", ":", "'", '"', "<", ">", ",", ".", "/", "?", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    formData.email.split("").some((char) => !specialCharacters.includes(char) && char.toUpperCase() === char) ? ChangeError(6, true) : ChangeError(6, false);
  }, [formData]);

  //#endregion

  //#region --- --- --- --- --- --- --- --- --- --- ERROR HANDLING --- --- --- --- --- --- --- --- --- ---

  useEffect(() => {
    //ON
    !formData.email.includes("@") && formData.email !== "" && formData.password !== "" ? ChangeError(2, true) : ChangeError(2, false);
    //OFF
    ChangeError(7, false);
    formData.email !== "" ? ChangeError(777, false) : null;
  }, [formData]);

  /* Changing error */
  function ChangeError(objectId, value) {
    objectId === 777 && value === true ? setErrorStorage((prev) => prev.map((item) => (item.id === 777 ? { ...item, state: true } : { ...item, state: false }))) : setErrorStorage((prev) => prev.map((item) => (item.id === objectId ? { ...item, state: value } : item)));
  }

  /* Changing error text */
  useEffect(() => {
    let text = "";
    let multiple = false;
    errorStorage.map((item) => {
      item.state === true ? (multiple === true ? (text += " | " + String(item.message)) : ((text += String(item.message)), (multiple = true))) : null;
    });
    setErrorMessage(text);
  }, [errorStorage]);

  //#endregion

  //#region --- --- --- --- --- --- --- --- --- --- GOOGLE LOGIN --- --- --- --- --- --- --- --- --- ---
  function googleClick(e) {
    signInWithPopup(auth, provider).then((data) => getData(data, 1));
  }

  //#endregion

  //#region --- --- --- --- --- --- --- --- --- --- EMAIL LOGIN --- --- --- --- --- --- --- --- --- ---
  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = formData;
    if (errorMessage !== "") {
      console.log("RETURNING");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => (typeof data !== null ? getData(data, 0) : ChangeError(7, true)))
      .catch((error) => (console.log(error), error !== null ? (ChangeError(7, true), console.log(error)) : null));
  }

  //#endregion

  //#region --- --- --- --- --- --- --- --- --- --- LOGIN INTO ACCOUNT --- --- --- --- --- --- --- --- --- ---

  function successful() {
    setFormData({
      email: "",
      password: "",
    });
    ChangeError(777, true);
  }

  async function getData(data, type) {
    const uid = data.user.uid;
    if (type === 0) {
      console.log("EXISTING PROFILE LOADED");
    }
    if (type === 1) {
      const verifiedEmail = data.user.email;
      const fullName = data.user.displayName;

      // Checking if exist ? if NOT => Create a new account
      let exist = false;
      let dataObject = await getDocs(collection(db, "users"));
      dataObject.forEach((doc) => {
        doc.data().uid === uid ? (exist = true) : null;
      });

      if (!exist) {
        const docRef = await addDoc(collection(db, "users"), {
          uid: uid,
          forename: fullName.split(" ")[0].charAt(0).toUpperCase() + fullName.split(" ")[0].slice(1).toLowerCase(),
          surname: fullName.split(" ")[1].charAt(0).toUpperCase() + fullName.split(" ")[1].slice(1).toLowerCase(),
          email: verifiedEmail,
          phone: "",
          newspaper: false,
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
    let localCart = JSON.parse(localStorage.getItem("cart"));
    localStorage.setItem("toOnlineCart", JSON.stringify(localCart));

    localStorage.removeItem("details");
    localStorage.removeItem("cart");

    successful();

    setTimeout(() => {
      window.location.href = "/";
    }, 700);
  }

  //#endregion

  //#region  --- --- --- --- --- --- --- --- --- --- RETURN --- --- --- --- --- --- --- --- --- ---

  return (
    <div>
      <div className="login">
        <div className="container">
          <h1 className="headline mt-3">Přihlášení</h1>
          <input type="text" className="input__normal input mt-5" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" className="input__normal input" name="password" placeholder="Heslo" value={formData.password} onChange={handleChange} />

          <p className={`error bold mt-4 ${errorStorage[0].state ? "text-green-500" : "text-red-600"}`}>{errorMessage}</p>

          <button className="button button__normal button__submit mt-6" onClick={handleSubmit}>
            Přihlásit
          </button>

          <button className="google" onClick={googleClick}>
            <p className="google--text">Google přihlášení</p>
            <img className="google--logo" src="../../google_logo.png" alt="Google Authentication"></img>
          </button>
          <div className="endText flex items-center">
            <p className="mr-1">Ještě stále nemáš účet?</p>
            <button className="link" onClick={props.changeLoginSwitch}>
              Registrovat se
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  //#endregion
}
