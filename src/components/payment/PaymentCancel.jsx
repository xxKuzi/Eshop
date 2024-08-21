import React, { useEffect } from "react";

export default function PaymentCancel() {
  return (
    <div className="flex justify-center">
      <div className="mt-32 flex flex-col items-center rounded-lg border-2 border-red-200 p-8">
        <p className="headline text-black">Něco se nepovedlo :{"("}</p>
        <a className="mt-6" href="http://localhost:5173/account#orders">
          <button className="button button__small button__negative">Zpátky do obchodu</button>
        </a>
      </div>
    </div>
  );
}
