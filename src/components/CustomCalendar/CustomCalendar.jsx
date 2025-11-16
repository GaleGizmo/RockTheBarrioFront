import React, { useEffect, useMemo, useRef, useState } from "react";
import galicianTranslations from "../../shared/galician.json";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";
import {  Collapse } from "react-bootstrap";

import EventListModal from "../EventListModal/EventListModal";

import Legend from "../Legend/Legend";
import {  useDispatch, useSelector } from "react-redux";
import { API } from "../../shared/api";
import { setFilteredEventos, setFiltradosFromCalendar, toggleCalendar } from "../../redux/eventos/eventos.actions";
import { useNavigate } from "react-router-dom";


function CustomCalendar({ eventos }) {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  let {isCalendarOpen} =useSelector((reducer)=>reducer.eventosReducer)
  const eventDates = useMemo(
    () =>
      new Set(
        eventos.map((evento) => new Date(evento.date_start).toDateString())
      ),
    [eventos]
  );


  const tileContent = ({ date }) => {
    const currentDate = date.toDateString();
    const eventsForDate = eventos.filter(
      (evento) => new Date(evento.date_start).toDateString() === currentDate
    );
  
    if (eventsForDate.length > 1) {
      return <span>+</span>;
    } else {
      return null;
    }
  };

  const tileClassName = ({ date, view }) => {
    const currentDate = date.toDateString();
    const isActive =
      selectedDate && selectedDate.toDateString() === currentDate;
    const hasEvent = eventDates.has(currentDate);

    let classNames = "";

    if (isActive) {
      classNames += "react-calendar__tile--active ";
    }

    if (hasEvent) {
      classNames += "event-day ";
    }

    if (view === "month" && !hasEvent) {
      classNames += "react-calendar__tile--inactive ";
    }

    return classNames.trim();
  };


  const [selectedDate, setSelectedDate] = useState(null);


  const handleTileClick = async (date) => {
    dispatch(toggleCalendar(!isCalendarOpen))
    setSelectedDate(date)
    let startDate=new Date(date)
    
    startDate.setHours(0,0,0,0)
    let endDate=new Date(date)

    endDate.setHours(23,59,59)
  
    const eventosDia=await API.post("/evento/eventosEntreFechas", {
      startDate,
      endDate,
    });
    dispatch(setFiltradosFromCalendar())
    dispatch( setFilteredEventos(eventosDia.data))
    navigate("/")

  };
  
  const formatMonthYear = (locale, date) =>
    `${galicianTranslations.monthNames[date.getMonth()]} ${date.getFullYear()}`;

  const formatShortWeekday = (locale, date) =>
    galicianTranslations.dayNames[date.getDay()].substring(0, 3);

  return (
    <div className="calendar-container">
     
      <Collapse in={isCalendarOpen} className="d-lg-none">
        <div className="slide-menu">
          <Calendar
            formatMonthYear={formatMonthYear}
            formatShortWeekday={formatShortWeekday}
            tileContent={tileContent}
            tileClassName={tileClassName}
            onClickDay={(date) => handleTileClick(date)}
          />
          <Legend/>
        </div>
      </Collapse>
      <div
        className={`calendar `}
      >
        
        <Calendar
          formatMonthYear={formatMonthYear}
          formatShortWeekday={formatShortWeekday}
          tileContent={tileContent}
          tileClassName={tileClassName}
          onClickDay={(date) => handleTileClick(date)}
        />
        <Legend/>
      </div>
  
    </div>
  );
}

export default CustomCalendar;
