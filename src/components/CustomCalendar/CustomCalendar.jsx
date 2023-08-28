import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";

import { Button, Collapse } from "react-bootstrap";
import { FaRegCalendarAlt } from "react-icons/fa";
import EventListModal from "../EventListModal/EventListModal";

function CustomCalendar({ eventos }) {
  const eventDates = new Set(
    eventos.map((evento) => new Date(evento.date_start).toDateString())
  );

  const tileContent = ({ date }) => {
    const currentDate = date.toDateString();
    if (eventDates.has(currentDate)) {
      return <span>•</span>;
    } else {
      return null;
    }
  };

  const tileClassName = ({ date, view }) => {
    const currentDate = date.toDateString();
    const isActive = selectedDate && selectedDate.toDateString() === currentDate;
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

  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    if (isModalOpen) {
      setModalOpen(false);
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const [selectedDateForModal, setSelectedDateForModal] = useState(null);
  const handleTileClick = (date, event) => {
    const clickedDate = date.toDateString();
    if (selectedDateForModal && selectedDateForModal.toDateString() === clickedDate) {
      // Si se hace clic nuevamente en la misma fecha, cierra el modal
      setSelectedDateForModal(null);
      setModalOpen(false);
    } else {
      // Si se hace clic en una fecha diferente, abre el modal
      const eventsForDate = eventos
        .filter(
          (evento) => new Date(evento.date_start).toDateString() === clickedDate
        )
        .sort(
          (a, b) =>
            new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
        );

      if (eventsForDate && eventsForDate.length > 0) {
        setSelectedDate(date);
        setSelectedDateForModal(date);
        setSelectedEvents(eventsForDate);

        const { clientX, clientY } = event;
        setModalPosition({ top: clientY, left: clientX });
        
        setModalOpen(false);
        
        setTimeout(() => setModalOpen(true), 0);
      } else {
        setSelectedDateForModal(null);
        setModalOpen(false);
      }
    }
  };

  return (
    <div className="calendar-container">
      <Button
        className=" menu-toggle custom-toggle d-lg-none"
        onClick={toggleMenu}
      >
        <FaRegCalendarAlt></FaRegCalendarAlt>
      </Button>
      <Collapse in={isMenuOpen} className="d-lg-none">
        <div className="slide-menu">
          <Calendar
            tileContent={tileContent}
            tileClassName={tileClassName}
            onClickDay={(date, event) => handleTileClick(date, event)}
          />
        </div>
      </Collapse>
      <div
        className={`calendar d-none d-lg-block ${
          isMenuOpen ? "menu-open" : ""
        }`}
      >
        <div className="legend">
        <div className="legend-item">
          <div className="legend-dot legend-event"></div>
          <div className="legend-label">Día con evento(s)</div>
        </div>
        <div className="legend-item">
          <div className="legend-dot legend-selected"></div>
          <div className="legend-label">Día seleccionado</div>
        </div>
        <div className="legend-item">
          <div className="legend-dot legend-actual"></div>
          <div className="legend-label">Día actual</div>
        </div>
      </div>
        <Calendar
          tileContent={tileContent}
          tileClassName={tileClassName}
          onClickDay={(date, event) => handleTileClick(date, event)}
        />
      
      </div>
      {isModalOpen && (
        <EventListModal
          events={selectedEvents}
          onClose={toggleModal}
          position={modalPosition}
        />
      )}
      
    </div>
  );
}

export default CustomCalendar;
