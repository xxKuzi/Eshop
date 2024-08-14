import React, { useEffect } from "react";
import { useData } from "../../parts/Memory.jsx";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../parts/Base.js";

export default function PaymentCancel() {
  const { addOrderToProfile } = useData();

  useEffect(() => {
    console.log("Payment was canceled");
    addOrderToProfile(false);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="mt-32 flex flex-col items-center rounded-lg border-2 border-red-200 p-8">
        <p className="headline text-black">Něco se nepovedlo :{"("}</p>
        <a className="mt-6" href="http://localhost:5173/cart">
          <button className="button button__small button__negative">Zpátky do obchodu</button>
        </a>
      </div>
    </div>
  );
}
