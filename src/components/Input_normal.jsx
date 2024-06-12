import React from "react";

export default function Input_normal(props) {
  return (
    <div>
      <input
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className="rounded-md border-2 border-blue-500"
        type="text"
      ></input>
    </div>
  );
}
