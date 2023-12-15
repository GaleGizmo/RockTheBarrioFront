import React from "react";
import { saveScrollPosition } from "../../shared/saveScrollPosition";
import "./Footer.css";

import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <>
    <div className="footer-container">
     <Link className="footer-link" to="/contacto" onClick={saveScrollPosition}><span>Contacto</span></Link>
     <Link className="footer-link" to="/privacidad" onClick={saveScrollPosition}><div className="border-left"></div><span>Privacidade</span></Link>
     <Link className="footer-link" to="/terminos" onClick={saveScrollPosition}><div className="border-left"></div><span>Termos e condicións</span></Link>
     <Link className="footer-link" to="/faq" onClick={saveScrollPosition}><div className="border-left"></div><span>FAQ</span></Link>
    </div>
    </>
  );
};

export default Footer;
