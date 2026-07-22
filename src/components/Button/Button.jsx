import React from "react";
import "./Button.css";

const Button = ({
  text,
  variant,
  isSubmitting,
  onClick,
  type = "button",
  children,
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`boton ${variant} ${className}`.trim()}
      onClick={onClick}
      disabled={isSubmitting}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;
