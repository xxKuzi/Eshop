import React, { useState } from "react";
import { useData } from "../parts/Memory";
import DevProducts from "./DevProducts";
import DevImages from "./DevImages.jsx";
import DevOrders from "./DevOrders.jsx";

export default function Dev() {
  const { profile } = useData();
  const editor = profile.editor;
  const updateProfile = useData().updateProfile;
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;
  const [text, setText] = useState("");
  const [selected, setSelected] = useState("");

  return (
    <div>
      <p>Editor {editor.toString()}</p>
      {!editor && <input value={text} className="rounded-md border-2 bg-gray-100" onChange={(e) => (setText(e.target.value), e.target.value === "tm" ? (setText(""), logged ? updateProfile("editor", true) : null) : null)} type="text"></input>}
      {editor && (
        <div className="flex flex-col">
          <div>
            <button className="mt-5 rounded-xl bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3" onClick={() => updateProfile("editor", false)}>
              Disable Editor Mode
            </button>
          </div>

          <DevProducts className="mb-5" setSelected={(value) => setSelected(value)} selected={selected} />
          <DevImages selected={selected} />
          <DevOrders />
        </div>
      )}
    </div>
  );
}
