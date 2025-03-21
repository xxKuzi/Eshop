import React from "react";
//SPECIALLY USED FOR DevProducts

export default function Dev_Select(props) {
  const renderedOptions = props.catalog.map((item, i) => {
    return <option key={item.id}>{item.id + " " + item.name}</option>;
  });

  return (
    <div>
      <select
        className="relative"
        value={props.value}
        onChange={(e) => {
          props.update(e.target.value);
        }}
      >
        {renderedOptions}
      </select>
      <div className="absolute mt-1 h-[3px] w-[203px] rounded-md bg-brand-blue"></div>
    </div>
  );
}
