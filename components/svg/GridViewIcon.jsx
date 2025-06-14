import * as React from "react";

function GridViewIcon(props) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...props}>
      <title>Grid View</title>
      <g fill="none" fillRule="evenodd">
        <path d="M-2-2h36v36H-2z" />
        <g fill="#000">
          <path d="M0 0h9.4117647v9.4117647H0zM0 11.2941176h9.4117647v9.4117647H0zM11.2941176 0h9.4117647v9.4117647h-9.4117647zM11.2941176 11.2941176h9.4117647v9.4117647h-9.4117647zM22.5882353 0H32v9.4117647h-9.4117647zM22.5882353 11.2941176H32v9.4117647h-9.4117647zM0 22.5882353h9.4117647V32H0zM11.2941176 22.5882353h9.4117647V32h-9.4117647zM22.5882353 22.5882353H32V32h-9.4117647z" />
        </g>
      </g>
    </svg>
  );
}

export default GridViewIcon;
