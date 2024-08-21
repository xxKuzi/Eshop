import React from "react";

export default function ProgressBar(props) {
  return (
    <div className="h-8 w-[300px] rounded-xl border-2">
      <div style={{ width: `${props.value * 3}px` }} className="h-full rounded-xl bg-brand-blue"></div>
    </div>
  );
}
