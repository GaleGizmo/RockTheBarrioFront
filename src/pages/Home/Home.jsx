import React from "react";
import "./Home.css";
import EventosList from "../../components/EventosList/EventosList";
import { BsArrowUp } from "react-icons/bs";
import CookieConsent from "react-cookie-consent";
import pdf from "/assets/cookies.pdf";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFilteredEventos } from "../../redux/eventos/eventos.actions";
import { useFestival } from "../../context/FestivalContext";
import { useTranslation } from "react-i18next";


const Home = () => {
  const dispatch = useDispatch();
  const { showFestival } = useFestival();
  const { t } = useTranslation();
  const reloadEvents = () => {
    
      dispatch(deleteFilteredEventos());
    };
  return (
    <div className="home">
    
      {!showFestival && (
        <Link to="/">
          <div className="listado-container" onClick={reloadEvents}>
            <h1 className="listado-text">{t('home.title')}</h1>
          </div>{" "}
        </Link>
      )}
      <EventosList />
      <BsArrowUp
        className="scroll-up"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      />
      <CookieConsent
        location="bottom"
        buttonText={t('home.cookieAccept')}
        visible="byCookieValue"
        style={{ zIndex: 10000 }}
      >
        {t('home.cookieText')}{" "}
        <a href={pdf} target="blank">
          {t('home.cookieHere')}
        </a>
      </CookieConsent>
    </div>
  );
};

export default Home;
