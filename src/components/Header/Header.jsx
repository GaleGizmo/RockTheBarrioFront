import React, { useReducer } from "react";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFilteredEventos,
  toggleCalendar,
} from "../../redux/eventos/eventos.actions";

import CustomCalendar from "../CustomCalendar/CustomCalendar";
import { Button } from "react-bootstrap";
import { FaRegCalendarAlt } from "react-icons/fa";
import EventoEspecial from "../EventoEspecial/EventoEspecial";
import { useEffect } from "react";
import { checkFestival, getFestivalData } from "../../shared/api";
import { useState } from "react";

const Header = () => {
  let { isCalendarOpen, eventosCalendar } = useSelector(
    (reducer) => reducer.eventosReducer
  );
  const [showFestival, setShowFestival] = useState(false);
  const [festival, setFestival] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkFestival();
      if (data.isFestivalToDisplay) {
        
        const festivalData = await getFestivalData(data.festivalId);
        setFestival(festivalData);
        setShowFestival(data.isFestivalToDisplay);
      }
    };
    fetchData();
  }, []);

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
        <div className="title">
          <Link to="/" className="link">
            <img
              src="/assets/logo.gif"
              onClick={reloadEvents}
              alt="RockTheBarrio Logo"
            />
          </Link>
        </div>
        {showFestival && <EventoEspecial eventoData={festival} />}
        <Button
          className=" menu-toggle custom-toggle d-lg-none"
          onClick={showCalendar}
        >
          <FaRegCalendarAlt></FaRegCalendarAlt>
        </Button>

        <div className="navbar-container">
          <Navbar />
        </div>
      </div>
      <div className="div-calendario d-lg-none">
        <CustomCalendar eventos={eventosCalendar} />
      </div>{" "}
    </>
  );
};

export default Header;
