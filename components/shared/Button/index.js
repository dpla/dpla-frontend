import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Button.css";

const Button = ({
  children,
  type,
  size,
  url,
  style,
  icon,
  onClick,
  title,
  className,
  prefetch
}) => {
  let buttonClasses = `${className} ${classNames.buttonBase}`;

  switch (type) {
    case "primary":
      buttonClasses = `${buttonClasses} ${classNames.buttonPrimary}`;
      break;
  }

  switch (size) {
    case "large":
      buttonClasses = `${buttonClasses} ${classNames.buttonLarge}`;
      break;
  }

  return (
    <div>
      {url ? (
        <Link prefetch={prefetch} href={url}>
          <a title={title} className={buttonClasses} style={style}>
            {children}
          </a>
        </Link>
      ) : (
        <button onClick={onClick} className={buttonClasses} style={style}>
          {children}
        </button>
      )}
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    </div>
  );
};

export default Button;
