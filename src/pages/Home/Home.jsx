import React from "react";
import "./Home.css";
import EventosList from "../../components/EventosList/EventosList";
import { BsArrowUp } from "react-icons/bs";
import CookieConsent from "react-cookie-consent";
import pdf from "/assets/cookies.pdf";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFilteredEventos } from "../../redux/eventos/eventos.actions";


const Home = () => {
  const dispatch=useDispatch()
  const reloadEvents = () => {
    
      dispatch(deleteFilteredEventos());
    };
  return (
    <div className="home">
      <div className="listado-border">
        <h1 className="listado-text">PROXIMOS EVENTOS</h1>
      </div>
      <Link to="/" >
        <div className="listado-container" onClick={reloadEvents}>
          <h1 className="listado-text">PROXIMOS EVENTOS</h1>
        </div>{" "}
      </Link>
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
        "Aceptar", vostede acepta o uso destas cookies. Pode descargar a nosa
        Política de Cookies{" "}
        <a href={pdf} target="blank">
          aquí
        </a>
      </CookieConsent>
    </div>
  );
};

export default Home;
