import React from "react";
import "./Button.css";

const Button = ({ text, variant, isSubmitting, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      className={`boton ${variant}`}
      onClick={onClick}
      disabled={isSubmitting}
    >
      {text}
    </button>
  );
};

export default Button;
