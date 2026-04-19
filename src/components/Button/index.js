import "./styles.scss";
import React from "react";
import clsx from "clsx";

const Button = ({ children, className, variant = "primary", href, type = "button", disabled, ...rest }) => {
  const classes = clsx("btn", variant === "outline" ? "btn--outline" : "btn--primary", className);

  if (href != null && !disabled) {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
