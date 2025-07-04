import * as React from "react";

function Heart(props) {
  return (
    <svg width="30" height="27" viewBox="0 0 30 27" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M-3-5h36v36H-3z" />
        <path
          d="M14.999906 4.46070652C7.5850977-3.99254874 1.84688348 1.84612517.87702655 3.58973718-.88896893 6.8138297.1702894 11.6949394 2.64302203 14.0480626L15.0016008 26.25l12.3585787-12.2019374c2.4693854-2.3531232 3.5286437-7.2325595 1.7626906-10.45832542-.9716364-1.743612-7.0623718-7.58228592-14.1229641.87096934z"
          fill="#E04F8E"
        />
      </g>
    </svg>
  );
}

export default Heart;
