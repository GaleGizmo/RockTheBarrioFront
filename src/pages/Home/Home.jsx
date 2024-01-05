import React from "react";
import "./Home.css";
import EventosList from "../../components/EventosList/EventosList";
import { BsArrowUp } from "react-icons/bs";
import CookieConsent from "react-cookie-consent";
import pdf from "/assets/cookies.pdf"

const Home = () => {
  return (
    <div className="home">
      <div className="listado-border">
        <h1 className="listado-text">PROXIMOS EVENTOS</h1>
      </div>
      <div className="listado-container">
        <h1 className="listado-text">PROXIMOS EVENTOS</h1>
      </div>
      <EventosList />
      <BsArrowUp
        className="scroll-up"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      />
      <CookieConsent
        location="bottom"
        buttonText="Aceptar"
        visible="byCookieValue"
        style={{ zIndex: 10000 }}
       
      >
        Empregamos cookies neste sitio web para lle dar a mellor experiencia
        recordando as súas preferencias e visitas repetidas. Ao facer clic en
        "Aceptar", vostede acepta o uso destas cookies. Pode descargar a nosa Política de Cookies <a href={pdf} target="blank">aquí</a>
      </CookieConsent>
    </div>
  );
};

export default Home;
