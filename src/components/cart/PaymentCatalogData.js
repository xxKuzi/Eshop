import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../parts/Base.js"; // Adjust the path as necessary

export async function fetchData() {
  let querySnapshot = await getDocs(collection(db, "catalog"));
  return querySnapshot.docs.map((doc) => doc.data());
}
