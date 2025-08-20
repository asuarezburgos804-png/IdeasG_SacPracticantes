// icon:zoom-out-area | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from "react";

function IconZoomOutArea(props) {
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
      <path d="M13 15h4" />
      <path d="M20 15 A5 5 0 0 1 15 20 A5 5 0 0 1 10 15 A5 5 0 0 1 20 15 z" />
      <path d="M22 22l-3-3M6 18H5a2 2 0 01-2-2v-1M3 11v-1M3 6V5a2 2 0 012-2h1M10 3h1M15 3h1a2 2 0 012 2v1" />
    </svg>
  );
}

export default IconZoomOutArea;
