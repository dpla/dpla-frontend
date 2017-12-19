import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Button.css";

const Button = ({
  id,
  as,
  children,
  className = "",
  controls,
  label,
  labelledby,
  role,
  selected,
  checked,
  expanded,
  icon,
  onClick,
  prefetch,
  size,
  style,
  title,
  type,
  state,
  mustSubmit = false,
  name,
  disabled,
  live,
  url
}) => {
  let buttonClasses = `${className} ${classNames.buttonBase}`;

  let props = {};
  if (id) props["id"] = id;
  if (name) props["name"] = name;
  if (disabled) props["disabled"] = disabled;
  if (controls) props["aria-controls"] = controls;
  if (label) props["aria-label"] = label;
  if (role) props["role"] = role;
  if (selected) props["aria-selected"] = selected;
  if (checked) props["aria-checked"] = checked;
  if (labelledby) props["aria-labelledby"] = labelledby;
  if (live) props["aria-live"] = live;
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
        type === "donate" && size === "large" ? `` : type === "donate" ? "" : ""
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
            type={!mustSubmit ? "button" : "submit"}
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
