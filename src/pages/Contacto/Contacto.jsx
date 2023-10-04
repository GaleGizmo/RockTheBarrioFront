import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Contacto.css"

const Contacto = () => {
  const navigate = useNavigate();
  const handleIcon = () => {
    navigate(-1);
  };
  return (
    <div className="cardLegal">
      <AiFillCloseSquare className="close-icon" onClick={handleIcon} />
      <h1 className="medios-contacto_title">MEDIOS DE CONTACTO</h1>
      <div className="medios-contacto_items">
        <h2>
          <BiMailSend/><span> <Link to="mailto:rockthebarrio@gmail.com"> 
            rockthebarrio@gmail.com
          </Link></span>
        </h2>
        <h2>
          <FaInstagram /><span> <Link to="https://www.instagram.com/rockthebarrio/"> @rockthebarrio </Link></span>
        </h2>
      </div>
    </div>
  );
};

export default Contacto;
