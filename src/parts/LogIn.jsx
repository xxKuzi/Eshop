import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "./Base";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function LogIn(props) {
  //#region --- --- --- --- --- --- --- --- --- --- INITIALIZATION --- --- --- --- --- --- --- --- --- ---
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
      message: "Your email is not in right format",
    },
    {
      id: 3,
      name: "notSamePassword",
      state: false,
      message: "Your passwords are not the same",
    },
    {
      id: 4,
      name: "tooShort",
      state: false,
      message: "Your password is too short (at least 6 characters)",
    },
    {
      id: 5,
      name: "already",
      state: false,
      message: "This email is already registered",
    },
    {
      id: 6,
      name: "upperCaseEmail",
      state: false,
      message: "Your email has to be lower case",
    },
    {
      id: 7,
      name: "incorrectData",
      state: false,
      message: "You have entered incorrect data",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState("");

  const [success, setSuccess] = useState(false);

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
    ChangeError(5, false);
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
    errorStorage[0].state === true ? setSuccess(true) : setSuccess(false);
    setErrorMessage(text);
  }, [errorStorage]);

  //#endregion

  //#region --- --- --- --- --- --- --- --- --- --- GOOGLE LOGIN --- --- --- --- --- --- --- --- --- ---
  function googleClick(e) {
    signInWithPopup(auth, provider).then((data) => getData(data));
  }

  //#endregion

  //#region --- --- --- --- --- --- --- --- --- --- EMAIL LOGIN --- --- --- --- --- --- --- --- --- ---
  function handleSubmit(event) {
    event.preventDefault();
    const { email: email, password: password } = formData;

    if (errorMessage !== "") {
      console.log("RETURNING");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((data) => (typeof data !== null ? getData(data) : ChangeError(7, true)))
      .catch((error) => (console.log(error), error !== null ? ChangeError(7, true) : null));
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

  const getData = async (data) => {
    const uid = data.user.uid;
    const verifiedEmail = data.user.email;

    localStorage.setItem("uid", uid);

    // Checking if exist ? if NOT => Create a new account (ONLY GOOGLE)
    let exist = false;
    let dataObject = await getDocs(collection(db, "users"));
    dataObject.forEach((doc) => {
      doc.data().uid === uid ? (exist = true) : console.log(doc.data().uid + " " + uid);
    });

    if (!exist) {
      const docRef = await addDoc(collection(db, "users"), {
        uid: uid,
        nickname: verifiedEmail.split("@")[0],
        email: verifiedEmail,
        newspaper: false,
        cart: [],
      });
      console.log("CREATING NEW PROFILE");
    } else {
      console.log("EXISTING PROFILE LOADED");
    }

    successful();

    setTimeout(() => {
      window.location.href = "/";
    }, 700);
  };

  //#endregion

  //#region  --- --- --- --- --- --- --- --- --- --- RETURN --- --- --- --- --- --- --- --- --- ---

  return (
    <div>
      <div className="login">
        <div className="container">
          <h1 className="headline mt-3">Log in</h1>
          <input type="text" className="input__normal input mt-5" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
          <input type="text" className="input__normal input" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

          <p className={`error bold ${errorStorage[0].state ? "green" : "red"}`}>{errorMessage}</p>

          <button className="button button__normal button__submit mt-10" onClick={handleSubmit}>
            Sign up
          </button>

          <button className="google" onClick={googleClick}>
            <p className="google--text">Log in with Google</p>
            <img className="google--logo" src="../../google_logo.png" alt="Google Authentication"></img>
          </button>
          <div className="endText flex items-center">
            <p className="mr-1">Still don't have an account?</p>
            <button className="link" onClick={props.changeLoginSwitch}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  //#endregion
}
