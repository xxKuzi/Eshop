import React from "react";
import { useState } from "react";
import { auth, provider, db } from "./Base";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function SignUp(props) {
  //#region --- --- --- --- --- --- --- --- --- --- INITIALIZATION --- --- --- --- --- --- --- --- --- ---
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    newspaper: false,
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

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  React.useEffect(() => {
    const specialCharacters = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[", "]", "|", "\\", ";", ":", "'", '"', "<", ">", ",", ".", "/", "?", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    formData.email.split("").some((char) => !specialCharacters.includes(char) && char.toUpperCase() === char) ? ChangeError(6, true) : ChangeError(6, false);
  }, [formData]);

  //#endregion

  //#region --- --- --- --- --- --- --- --- --- --- ERROR HANDLING --- --- --- --- --- --- --- --- --- ---

  //After formData UPDATE
  React.useEffect(() => {
    //ON
    !formData.email.includes("@") && formData.email !== "" && formData.password !== "" ? ChangeError(2, true) : ChangeError(2, false);

    //OFF
    formData.password.length >= 6 ? ChangeError(4, false) : null;
    ChangeError(3, false);
    ChangeError(5, false);
    ChangeError(7, false);
    formData.email !== "" ? ChangeError(777, false) : null;
  }, [formData]);

  /* Changing error */
  function ChangeError(objectId, value) {
    objectId === 777 && value === true ? setErrorStorage((prev) => prev.map((item) => (item.id === 777 ? { ...item, state: true } : { ...item, state: false }))) : setErrorStorage((prev) => prev.map((item) => (item.id === objectId ? { ...item, state: value } : item)));
  }

  /* Changing error text */
  React.useEffect(() => {
    let text = "";
    let multiple = false;
    errorStorage.map((item) => {
      item.state === true ? (multiple === true ? (text += " | " + String(item.message)) : ((text += String(item.message)), (multiple = true))) : null;
    });
    errorStorage[0].state === true ? setSuccess(true) : setSuccess(false);
    setErrorMessage(text);
  }, [errorStorage]);

  //#endregion

  //#region  --- --- --- --- --- --- --- --- --- --- GOOGLE SIGNUP --- --- --- --- --- --- --- --- --- ---

  function googleClick(e) {
    signInWithPopup(auth, provider).then((data) => getData(data));
  }

  //#endregion

  //#region  --- --- --- --- --- --- --- --- --- --- EMAIL SIGNUP --- --- --- --- --- --- --- --- --- ---

  function handleSubmit(event) {
    event.preventDefault();
    const { email, password, confirmPassword } = formData;

    password !== confirmPassword ? ChangeError(3, true) : ChangeError(3, false);
    password.length < 6 ? ChangeError(4, true) : ChangeError(4, false);

    if (errorMessage !== "" || password.length < 6 || formData.password !== formData.confirmPassword) {
      console.log("RETURNING");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => (typeof data !== null ? getData(data) : ChangeError(6, true)))
      .catch((error) => (console.log(error), error.message.includes("already") === true ? ChangeError(5, true) : setErrorMessage((prev) => prev + error.message.split("(")[1].split(")")[0])));
  }

  //#endregion

  //#region  --- --- --- --- --- --- --- --- --- --- CREATE AN ACCOUNT --- --- --- --- --- --- --- --- --- ---

  function successful() {
    setFormData({
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
      newspaper: false,
    });
    ChangeError(777, true);
  }

  const getData = async (data) => {
    const uid = data.user.uid;
    const verifiedEmail = data.user.email;

    localStorage.setItem("uid", data.user.uid);

    // Checking if exist ? if YES => sign in (ONLY GOOGLE)
    let exist = false;
    let dataObject = await getDocs(collection(db, "users"));
    dataObject.forEach((doc) => {
      doc.data().uid === uid ? (exist = true) : null;
    });

    if (!exist) {
      const docRef = await addDoc(collection(db, "users"), {
        uid: uid,
        nickname: verifiedEmail.split("@")[0],
        email: verifiedEmail,
        newspaper: formData.newspaper,
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
    <div className="signup">
      <div className="container">
        <h1 className="headline mt-3">Sign up</h1>
        <input type="text" className="input__normal input mt-5" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
        <input type="text" className="input__normal input" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <input type="text" className="input__normal input" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        <div className="marketing">
          <input id="newspaper" className="mr-2" type="checkbox" name="newspaper" onChange={handleChange} checked={formData.newspaper} />
          <label htmlFor="newspaper">I want to receive newsletter with exclusive bonuses</label>
        </div>

        <label className={`error bold ${success === false ? "red" : "green"}`}>{errorMessage}</label>

        <button className="button button__normal button__submit mt-10">Sign up</button>
        <button type="button" className="google" onClick={googleClick}>
          <p className="google--text">Sign up with Google</p>
          <img className="google--logo" src="../../google_logo.png" alt="Google Authentication"></img>
        </button>

        <div className="endText flex items-center">
          <p className="mr-1">Already have an account?</p>
          <button className="link" onClick={props.changeLoginSwitch}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );

  //#endregion
}
