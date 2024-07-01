import React from "react";

export default function Select(props) {
  const renderedOptions = props.options.map((val, i) => {
    return (
      <option key={i} value={props.options[i]}>
        {props.options[i]}
      </option>
    );
  });

  return (
    <div>
      <select
        value={props.value}
        onChange={(e) => {
          props.update(e.target.value);
        }}
      >
        {renderedOptions}
      </select>
    </div>
  );
}
