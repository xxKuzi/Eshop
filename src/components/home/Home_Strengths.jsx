import React from "react";
import { AiOutlineSafety } from "react-icons/ai";

export default function Home_Strengths() {
  return (
    <div>
      <div className="mt-[55px] flex flex-col items-center">
        <p className="headline">Naše přednosti</p>
        <div className="mt-10 flex">
          <div className="mr-32 flex flex-col items-center">
            <p className="headline__small">Spolehlivost</p>
            <AiOutlineSafety className="mt-3" size={50} />
          </div>
          <div className="mr-32 flex flex-col items-center">
            <p className="headline__small">Skvělá cena</p>
            <AiOutlineSafety className="mt-3" size={50} />
          </div>
          <div className="flex flex-col items-center ">
            <p className="headline__small">Vysoká kvalita</p>
            <AiOutlineSafety className="mt-3 " size={50} />
          </div>
        </div>
      </div>
    </div>
  );
}
