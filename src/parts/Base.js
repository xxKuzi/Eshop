import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import "firebase/storage";
import "firebase/firestore"; //take out both
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCt7V3W9gKJWN_zBX80Pl54zt8QI7FX5DM",
  authDomain: "shop-tohlechces.firebaseapp.com",
  databaseURL: "https://shop-tohlechces-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shop-tohlechces",
  storageBucket: "shop-tohlechces.appspot.com",
  messagingSenderId: "37475032521",
  appId: "1:37475032521:web:d3f3a314f8d0716bd31c18",
  measurementId: "G-6ZTHR91WD8",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function listAll() {
  storage
    .ref()
    .listAll()
    .then((res) => {
      const promises = res.items.map((itemRef) => console.log(itemRef));
      Promise.all(promises)

        .catch((error) => {
          console.error("Error fetching download URLs:", error);
        });
    })
    .catch((error) => {
      console.error("Error listing files:", error);
    });
}

export { db, provider, auth, storage, app, listAll };
