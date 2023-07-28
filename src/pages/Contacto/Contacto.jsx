import React from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const Contacto = () => {
    const navigate = useNavigate();
    const handleIcon = () => {
      navigate(-1);
    };
  return (
    <div className='cardLegal'>
    <AiFillCloseSquare className="close-icon" onClick={handleIcon} />
      <h1>MEDIOS DE CONTACTO</h1>
      <h2>Email:</h2>
      <p>rockthebarrio@gmail.com</p>
      <h2>Instagram:</h2>
      <p>@Rockthebarrio</p>
    </div>
  )
}

export default Contacto
