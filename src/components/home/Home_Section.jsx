import React from "react";

export default function Home_Section(props) {
  return (
    <div className="relative m-2 mt-6 flex w-[1000px] flex-col items-center justify-center rounded-3xl bg-gray-100 p-6 shadow-md">
      <img className="mt-4 w-[600px] rounded-xl" src={props.image} />
      <div className="absolute left-12 top-3 flex items-center rounded-xl border-2 border-gray-100 bg-white px-4 py-5 ">
        <p className="headline ">{props.headline}</p>
      </div>

      <a href={"/products#free-time"} className=" mx-16 mt-6 flex items-center">
        <button className="button__submit align-center button__big absolute  bottom-6  right-28 items-center text-center text-sm">Prozkoumat</button>
      </a>
    </div>
  );
}
