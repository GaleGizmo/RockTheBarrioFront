import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";
import { useNavigate } from "react-router-dom";
import { Button, Collapse } from "react-bootstrap";
import { FaRegCalendarAlt } from "react-icons/fa";
import EventListModal from "../EventListModal/EventListModal";

function CustomCalendar({ eventos }) {
  const tileContent = ({ date }) => {
    const eventDates = eventos.map((evento) =>
      new Date(evento.date_start).toDateString()
    );
    const currentDate = date.toDateString();
    return eventDates.includes(currentDate) ? "event-day" : null;
  };
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    if (isModalOpen){setModalOpen(false)}
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleTileClick = (date, event) => {
    const clickedDate = date.toDateString();
    const eventsForDate = eventos.filter(
      (evento) => new Date(evento.date_start).toDateString() === clickedDate
    );
    setSelectedDate(date);
    setSelectedEvents(eventsForDate);
    const { clientX, clientY } = event;
    setModalPosition({ top: clientY, left: clientX });
    toggleModal();
  };

  return (
    <div className="calendar-container">
      <Button
        className=" menu-toggle custom-toggle d-lg-none"
        onClick={toggleMenu}
        style={{ top: isMenuOpen ? "0" : "120px" }}
      >
        <FaRegCalendarAlt></FaRegCalendarAlt>
      </Button>
      <Collapse in={isMenuOpen} className="d-lg-none">
        <div className="slide-menu">
          <Calendar tileClassName={tileContent} onClickDay={(date, event) => handleTileClick(date, event)} />
        </div>
      </Collapse>
      <div
        className={`calendar d-none d-lg-block ${
          isMenuOpen ? "menu-open" : ""
        }`}
      >
        <Calendar tileClassName={tileContent} onClickDay={(date, event) => handleTileClick(date, event)} />
      </div>
      {isModalOpen && (
        <EventListModal events={selectedEvents} onClose={toggleModal} position={modalPosition} />
      )}
    </div>
  );
}

export default CustomCalendar;
