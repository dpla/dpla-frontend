import React from "react";
import { classNames } from "./ShareButton.css";

const FacebookButton = ({ currentFullUrl }) =>
  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${currentFullUrl}`}
    className={classNames.shareButton}
    target="_blank"
  >
    <svg
      className={classNames.facebookIcon}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Styles"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Artboard"
          transform="translate(-364.000000, -205.000000)"
          fill="#000000"
        >
          <path
            d="M386.6755,205 L365.3245,205 C364.5925,205 364,205.5925 364,206.3245 L364,227.6755 C364,228.4075 364.5925,229 365.3245,229 L376.819,229 L376.819,219.706 L373.69,219.706 L373.69,216.085 L376.819,216.085 L376.819,213.4105 C376.819,210.3115 378.712,208.6255 381.478,208.6255 C382.8025,208.6255 383.941,208.7215 384.2725,208.7665 L384.2725,212.0065 L382.3525,212.0065 C380.8525,212.0065 380.56,212.7265 380.56,213.7765 L380.56,216.0865 L384.145,216.0865 L383.68,219.7165 L380.56,219.7165 L380.56,229 L386.6755,229 C387.4075,229 388,228.4075 388,227.6755 L388,206.3245 C388,205.5925 387.4075,205 386.6755,205"
            id="Facebook"
          />
        </g>
      </g>
    </svg>
  </a>;

export default FacebookButton;
