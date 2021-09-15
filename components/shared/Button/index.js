import React from "react";
import Link from "next/link";

import css from "./Button.module.scss";

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
  let buttonClasses = `${css.buttonBase}`;

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
      buttonClasses = `${buttonClasses} ${css.buttonPrimary}`;
      break;
    case "secondary":
      buttonClasses = `${buttonClasses} ${css.buttonSecondary}`;
      break;
    case "ghost":
      buttonClasses = `${buttonClasses} ${css.buttonGhost}`;
      break;
    case "donate":
      buttonClasses = `${buttonClasses} ${css.buttonDonate}`;
      break;
  }

  switch (size) {
    case "large":
      buttonClasses = `${buttonClasses} ${css.buttonLarge}`;
      break;
    case "medium":
      buttonClasses = `${buttonClasses} ${css.buttonMedium}`;
      break;
  }

  switch (state) {
    case "active":
      buttonClasses = `${buttonClasses} ${css.active}`;
      break;
  }

  let linkProps = {};
  if (as) linkProps["as"] = as;
  if (title) linkProps["title"] = title;

  return (
    <div className={className}>
      {url
        ? <Link href={url} {...linkProps}>
            <a {...props} className={buttonClasses} style={style}>
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
    </div>
  );
};

export default Button;
