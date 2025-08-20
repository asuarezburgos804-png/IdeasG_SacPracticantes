// icon:lightning-fill | Bootstrap https://icons.getbootstrap.com/ | Bootstrap
import * as React from "react";

function IconLightningFill({ size = 20, ...props }) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height={size}
      width={size}
      {...props}
    >
      <path d="M5.52.359A.5.5 0 016 0h4a.5.5 0 01.474.658L8.694 6H12.5a.5.5 0 01.395.807l-7 9a.5.5 0 01-.873-.454L6.823 9.5H3.5a.5.5 0 01-.48-.641l2.5-8.5z" />
    </svg>
  );
}

export default IconLightningFill;