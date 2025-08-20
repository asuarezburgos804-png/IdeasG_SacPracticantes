// import React from "react";

// export function HomeIcon(props) {
//   return (
//     <svg
//       width="2em"
//       height="2em"
//       viewBox="0 0 36 36"
//       fill="currentColor"
//       {...props}
//     >
//       <path
//         d="M33 19a1 1 0 0 1-.71-.29L18 4.41L3.71 18.71A1 1 0 0 1 2.3 17.3l15-15a1 1 0 0 1 1.41 0l15 15A1 1 0 0 1 33 19"
//         className="clr-i-solid clr-i-solid-path-1"
//         strokeWidth={1}
//       ></path>
//       <path
//         d="M18 7.79L6 19.83V32a2 2 0 0 0 2 2h7V24h6v10h7a2 2 0 0 0 2-2V19.76Z"
//         className="clr-i-solid clr-i-solid-path-2"
//         strokeWidth={1}
//       ></path>
//       <path fill="none" d="M0 0h36v36H0z"></path>
//     </svg>
//   );
// }
import React from "react";

export function HomeIcon(props) {
  return (
    <svg
      width="2em"
      height="2em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m14.16 10.4l-5-3.57c-.7-.5-1.63-.5-2.32 0l-5 3.57c-.53.38-.84.98-.84 1.63V20c0 .55.45 1 1 1h4v-6h4v6h4c.55 0 1-.45 1-1v-7.97c0-.65-.31-1.25-.84-1.63"
      ></path>
      <path
        fill="currentColor"
        d="M21.03 3h-9.06C10.88 3 10 3.88 10 4.97l.09.09c.08.05.16.09.24.14l5 3.57c.76.54 1.3 1.34 1.54 2.23H19v2h-2v2h2v2h-2v4h4.03c1.09 0 1.97-.88 1.97-1.97V4.97C23 3.88 22.12 3 21.03 3M19 9h-2V7h2z"
      ></path>
    </svg>
  );
}
