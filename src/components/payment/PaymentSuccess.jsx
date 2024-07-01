import React, { useEffect } from "react";
import { useData } from "../../parts/Memory.jsx";
export default function PaymentSuccess() {
  const { addOrderToProfile } = useData();

  useEffect(() => {
    console.log("Payment was canceled");

    addOrderToProfile(true);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="mt-32 flex flex-col items-center rounded-lg border-2 p-8" style={{ borderColor: "rgba(70, 156, 248, 0.3)" }}>
        <p className="headline text-black ">Děkujeme za nákup!</p>
        <a className="mt-6" href="http://localhost:5173/cart">
          <button className="button button__small button__submit">Zpátky do obchodu</button>
        </a>
      </div>
    </div>
  );
}
