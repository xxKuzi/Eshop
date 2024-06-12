import React from "react";

import { RevealY } from "../../animations/Reveal";

export default function Home_Hero() {
  return (
    <div className="relative flex h-[580px] justify-center bg-black">
      <div className="absolute top-[60px] flex flex-col items-center  text-white">
        <div className="">
          <RevealY>
            <p className="mr-8 mt-10 p-2 text-6xl font-bold">Chceš super brýle za super cenu?</p>
          </RevealY>
          <RevealY>
            <p className="ml-[340px] mt-[50px] p-2 text-8xl font-bold">To si správně!</p>
          </RevealY>
        </div>
        <div className=" mx-16 mt-16 flex  items-center">
          <a href="#offer">
            <RevealY>
              <button className="button__submit align-center button__big m-4 mt-8 items-center text-center text-sm">Ukázat nabídku</button>
            </RevealY>
          </a>
        </div>
      </div>
    </div>
  );
}
