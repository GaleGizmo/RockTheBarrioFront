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
  // const modalContentRef = useRef();

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
  //       setModalOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

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
  // const [selectedEvents, setSelectedEvents] = useState([]);
  // const [isModalOpen, setModalOpen] = useState(false);
  // const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  // const toggleModal = () => {
  //   setModalOpen(!isModalOpen);
  // };
  // const [selectedDateForModal, setSelectedDateForModal] = useState(null);

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

    // Si se hace clic nuevamente en la misma fecha, cierra el modal
    // if (
    //   selectedDateForModal &&
    //   selectedDateForModal.toDateString() === clickedDate
    // ) {
    //   setModalOpen(false);
    //   setSelectedDateForModal(null);
    //   return;
    // }
  
    // Si se hace clic en una fecha diferente, busca eventos para esa fecha
    // const eventsForDate = eventos
    //   .filter(
    //     (evento) => new Date(evento.date_start).toDateString() === clickedDate
    //   )
    //   .sort(
    //     (a, b) =>
    //       new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
    //   );
  
    // Si hay eventos para la fecha, abre el modal
    // if (eventsForDate && eventsForDate.length > 0) {
    //   setSelectedDate(date);
    //   setSelectedDateForModal(date);
    //   setSelectedEvents(eventsForDate);
  
    //   const { clientX, clientY } = event;
    //   setModalPosition({ top: clientY, left: clientX });
  
    //   setModalOpen(true);
    // } else {
      // Si no hay eventos para la fecha, cierra el modal
      // setModalOpen(false);
    // }
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
        className={`calendar d-lg-block `}
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
      {/* {isModalOpen && (
        <div ref={modalContentRef}>
        <EventListModal
          calendarState={isCalendarOpen}
          events={selectedEvents}
          action={toggleModal}
          position={modalPosition}
        />
        </div>
      )} */}
    </div>
  );
}

export default CustomCalendar;
