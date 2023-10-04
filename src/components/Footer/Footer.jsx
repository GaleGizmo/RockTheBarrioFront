import React from "react";
import "./Footer.css";

import { Link } from "react-router-dom";



const Footer = () => {
  return (
    <>
    <div className="footer-container">
     <Link className="footer-link" to="/contacto"><span>Contacto</span></Link>
     <Link className="footer-link" to="/privacidad"><div className="border-left"></div><span>Privacidade</span></Link>
     <Link className="footer-link" to="/terminos"><div className="border-left"></div><span>Termos e condicións</span></Link>
     <Link className="footer-link" to="/faq"><div className="border-left"></div><span>FAQ</span></Link>
    </div>
    </>
  );
};

export default Footer;
