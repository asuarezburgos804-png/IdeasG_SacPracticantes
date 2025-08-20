// icon:area-chart | Ant Design Icons https://ant.design/components/icon/ | Ant Design
import * as React from "react";


function IconAreaChart({ size = 22, ...props }) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height={size}
      width={size}
      {...props}
    >
      <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-616-64h536c4.4 0 8-3.6 8-8V284c0-7.2-8.7-10.7-13.7-5.7L592 488.6l-125.4-124a8.03 8.03 0 00-11.3 0l-189 189.6a7.87 7.87 0 00-2.3 5.6V720c0 4.4 3.6 8 8 8z" />
    </svg>
  );
}

export default IconAreaChart;
