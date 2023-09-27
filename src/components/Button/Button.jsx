import React from 'react'
import "./Button.css"

const Button = ({text, type, isSubmitting, onClick}) => {
  
 
  return (
    <button  className={`boton ${type}`} onClick={onClick} disabled={isSubmitting}>
      {text}
    </button>
  )
}

export default Button
