import React from "react";
import "./Footer.css";
import Button from "../Button/Button";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = () => {
  return (
    <>
    <div className="footer-container">
     <Link className="footer-link" to="/contacto"><span>Contacto</span></Link>
     <Link className="footer-link" to="/privacidad"><div className="border-left"></div><span>Privacidade</span></Link>
     <Link className="footer-link" to="/terminos"><div className="border-left"></div><span>Termos e condicións</span></Link>
     
    </div>
    </>
  );
};

export default Footer;
