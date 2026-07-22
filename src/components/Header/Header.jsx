import React, { useReducer } from "react";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFilteredEventos,
  toggleCalendar,
} from "../../redux/eventos/eventos.actions";

import { Button } from "react-bootstrap";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import EventoEspecial from "../EventoEspecial/EventoEspecial";
import { useEffect } from "react";
import { checkFestival, getFestivalData } from "../../shared/api";
import { useState } from "react";
import { useFestival } from "../../context/FestivalContext";

const Header = () => {
  let { isCalendarOpen, filtroActivo } = useSelector(
    (reducer) => reducer.eventosReducer,
  );
  const [showFestival, setShowFestival] = useState(false);
  const [festivales, setFestivales] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setShowFestival: setFestivalContext } = useFestival();

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkFestival();
      if (data.isFestivalToDisplay) {
        const ids = data.festivalIds || [];
        const festivalesData = await Promise.all(
          ids.map((id) => getFestivalData(id)),
        );
        setFestivales(festivalesData);
        setShowFestival(true);
        setFestivalContext(true);
      }
    };
    fetchData();
  }, []);

  const prevFestival = () =>
    setCurrentIndex((i) => (i - 1 + festivales.length) % festivales.length);
  const nextFestival = () =>
    setCurrentIndex((i) => (i + 1) % festivales.length);

  useEffect(() => {
    if (festivales.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % festivales.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [festivales.length]);

  const dispatch = useDispatch();
  const reloadEvents = () => {
    dispatch(deleteFilteredEventos());
  };
  const showCalendar = () => {
    dispatch(toggleCalendar(!isCalendarOpen));
  };
  return (
    <>
      <div className="header">
        <div className={`title${filtroActivo ? " title-filtered" : ""}`}>
          <Link to="/" className="link">
            <img
              src="/assets/logo.gif"
              onClick={reloadEvents}
              alt="RockTheBarrio Logo"
            />
          </Link>
        </div>
        {showFestival && (
          <div className="festivales-container">
            {festivales.length > 1 && (
              <button className="carousel-btn" onClick={prevFestival}>
                <FaChevronLeft />
              </button>
            )}
            {festivales.map((festival, index) => (
              <div
                key={festival._id}
                className={`festival-slide${index === currentIndex ? " active" : ""}`}
              >
                <EventoEspecial eventoData={festival} />
              </div>
            ))}
            {festivales.length > 1 && (
              <button className="carousel-btn" onClick={nextFestival}>
                <FaChevronRight />
              </button>
            )}
          </div>
        )}
        <Button className="menu-toggle custom-toggle " onClick={showCalendar}>
          <FaRegCalendarAlt></FaRegCalendarAlt>
        </Button>

        <div className="navbar-container">
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default Header;
