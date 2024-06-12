import React from "react";
import ReactDOM from "react-dom/client";

import "../../index.css";

const root = ReactDOM.createRoot(document.getElementById("cancel"));

root.render(
  <div className="flex justify-center">
    <div className="mt-32 flex flex-col items-center rounded-lg border-2 border-red-200 p-8">
      <p className="headline text-black">Něco se nepovedlo :{"("}</p>
      <a className="mt-6" href="http://localhost:5173/cart">
        <button className="button button__small button__negative">Zpátky do obchodu</button>
      </a>
    </div>
  </div>,
);
