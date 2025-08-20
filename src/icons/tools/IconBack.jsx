import * as React from "react";

function IconBack(props) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1.3em"
      width="1.3em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={48}
        d="M244 400L100 256l144-144M120 256h292"
      />
    </svg>
  );
}

export default IconBack;
