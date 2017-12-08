import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Button.css";

const Button = ({
  as,
  children,
  className = "",
  controls,
  expanded,
  icon,
  onClick,
  prefetch,
  size,
  style,
  title,
  type,
  state,
  url
}) => {
  let buttonClasses = `${className} ${classNames.buttonBase}`;

  let props = {};
  if (controls) props["aria-controls"] = controls;
  if (expanded !== undefined) props["aria-expanded"] = expanded;

  switch (type) {
    case "primary":
      buttonClasses = `${buttonClasses} ${classNames.buttonPrimary}`;
      break;
    case "secondary":
      buttonClasses = `${buttonClasses} ${classNames.buttonSecondary}`;
      break;
    case "ghost":
      buttonClasses = `${buttonClasses} ${classNames.buttonGhost}`;
      break;
    case "donate":
      buttonClasses = `${buttonClasses} ${classNames.buttonDonate}`;
      break;
  }

  switch (size) {
    case "large":
      buttonClasses = `${buttonClasses} ${classNames.buttonLarge}`;
      break;
  }

  switch (state) {
    case "active":
      buttonClasses = `${buttonClasses} ${classNames.active}`;
      break;
  }

  return (
    <div
      className={
        type === "donate" && size === "large"
          ? `col-xs-12 col-md-4`
          : type === "donate" ? `col-xs-6 col-md-4` : ""
      }
    >
      {url
        ? <Link prefetch={prefetch} href={url} as={as}>
            <a {...props} title={title} className={buttonClasses} style={style}>
              {children}
            </a>
          </Link>
        : <button
            {...props}
            type="button"
            onClick={onClick}
            onTouchEnd={onClick}
            className={buttonClasses}
            style={style}
          >
            {children}
          </button>}
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    </div>
  );
};

export default Button;
