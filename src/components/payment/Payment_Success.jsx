import React, { useEffect } from "react";

export default function Payment_Success() {
  return (
    <div className="flex justify-center">
      <div className="mt-32 flex flex-col items-center rounded-lg border-2 p-8" style={{ borderColor: "rgba(70, 156, 248, 0.3)" }}>
        <p className="headline text-black ">Děkujeme za nákup!</p>
        <a className="mt-6" href="http://localhost:5173/account#orders">
          <button className="button button__small button__submit">Zpátky do obchodu</button>
        </a>
      </div>
    </div>
  );
}
