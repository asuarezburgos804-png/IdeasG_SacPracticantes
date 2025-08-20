// icon:arrows-cross | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from "react";


function IconArrowsCross(props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M16 4h4v4M15 9l5-5M4 20l5-5M16 20h4v-4M4 4l16 16" />
    </svg>
  );
}

export default IconArrowsCross;