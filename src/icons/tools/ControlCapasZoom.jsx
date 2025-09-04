// icon:zoom | Typicons https://www.s-ings.com/typicons/ | Stephen Hutchings
import * as React from "react";

function IconZoom(props) {
  return (
    <svg
    fill="none"
    stroke="#6C7B8B"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    height="2em"
    width="2em"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M15 12 A3 3 0 0 1 12 15 A3 3 0 0 1 9 12 A3 3 0 0 1 15 12 z" />
    <path d="M17 17l-2.5-2.5M10 5l2-2 2 2M19 10l2 2-2 2M5 10l-2 2 2 2M10 19l2 2 2-2" />
  </svg>
  );
}

export default IconZoom;
