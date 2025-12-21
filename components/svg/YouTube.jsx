import * as React from "react";

function YouTube(props) {
  return (
    <svg
      fill="#fff"
      opacity={"0.8"}
      width="34px"
      height="22px"
      viewBox="0 0 260 180"
      style={{ paddingLeft: "4px" }}
      {...props}
    >
      <path d="M220,2H40C19.01,2,2,19.01,2,40v100c0,20.99,17.01,38,38,38h180c20.99,0,38-17.01,38-38V40C258,19.01,240.99,2,220,2zM102,130V50l68,40L102,130z" />
    </svg>
  );
}

export default YouTube;
