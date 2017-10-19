import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Button.css";

const Button = ({
  as,
  children,
  className,
  icon,
  onClick,
  prefetch,
  size,
  style,
  title,
  type,
  url
}) => {
  let buttonClasses = `${className} ${classNames.buttonBase}`;

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

  return (
    <div
      className={
        type === "donate"
        ? `col-xs-6 col-md-4`
        : ""
      }
    >
      {url
        ? <Link prefetch={prefetch} href={url} as={as}>
            <a title={title} className={buttonClasses} style={style}>
              {children}
            </a>
          </Link>
        : <button onClick={onClick} className={buttonClasses} style={style}>
            {children}
          </button>}
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    </div>
  );
};

export default Button;
