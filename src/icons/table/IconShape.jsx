// icon:shape-2 | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from "react";

function IconShape2(props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="20"
      width="20"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M7 5 A2 2 0 0 1 5 7 A2 2 0 0 1 3 5 A2 2 0 0 1 7 5 z" />
      <path d="M21 19 A2 2 0 0 1 19 21 A2 2 0 0 1 17 19 A2 2 0 0 1 21 19 z" />
      <path d="M21 5 A2 2 0 0 1 19 7 A2 2 0 0 1 17 5 A2 2 0 0 1 21 5 z" />
      <path d="M7 19 A2 2 0 0 1 5 21 A2 2 0 0 1 3 19 A2 2 0 0 1 7 19 z" />
      <path d="M6.5 17.5l11-11M5 7v10M19 7v10" />
    </svg>
  );
}

export default IconShape2;