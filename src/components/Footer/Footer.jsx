import React from "react";
import { saveScrollPosition } from "../../shared/saveScrollPosition";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
    <div className="footer-container">
     <Link className="footer-link" to="/contacto" onClick={saveScrollPosition}><span>{t('nav.contact')}</span></Link>
     <Link className="footer-link" to="/privacidad" onClick={saveScrollPosition}><div className="border-left"></div><span>{t('nav.privacy')}</span></Link>
     <Link className="footer-link" to="/terminos" onClick={saveScrollPosition}><div className="border-left"></div><span>{t('nav.terms')}</span></Link>
     <Link className="footer-link" to="/faq" onClick={saveScrollPosition}><div className="border-left"></div><span>{t('nav.faq')}</span></Link>
    </div>
    </>
  );
};

export default Footer;
