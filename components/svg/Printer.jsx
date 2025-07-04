import * as React from "react";

function Printer(props) {
  return (
    <svg width="30" height="26" viewBox="0 0 30 26" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M-3-5h36v36H-3z" />
        <path
          d="M30 6.5829941h-4.6901875V0H4.61324784v6.5842957L0 6.5830234V19.426536h4.61324784v5.9067973H25.3085193l.0012641-5.9067973h4.6901875L30 6.5829941zM6.66666667 2.33333333H23V6.6666667H6.66666667V2.33333333zm0 20.99999997V12.6666667H23v10.6666666H6.66666667zM21 17H9v-2h12v2zm0 3.3333333H9v-2h12v2z"
          fill="#000"
        />
      </g>
    </svg>
  );
}

export default Printer;
