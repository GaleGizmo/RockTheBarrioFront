import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";
import { useNavigate } from "react-router-dom";
import { Button, Collapse, Navbar } from 'react-bootstrap';
import {  FaRegCalendarAlt } from "react-icons/fa";

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
  };
const navigate=useNavigate()
  const handleTileClick = (date) => {
    const clickedDate = date.toDateString();
    const event = eventos.find(
      evento => new Date(evento.date_start).toDateString() === clickedDate
    );
    if (event) {
      
       navigate(`/${event._id}`, { event });
    }
  };

  return (
    <div className="calendar-container">
      <Button className=" menu-toggle custom-toggle d-lg-none" onClick={toggleMenu} style={{ top: isMenuOpen ? "0" : "120px" }}>
       <FaRegCalendarAlt></FaRegCalendarAlt>
      </Button>
      <Collapse in={isMenuOpen} className="d-lg-none">
        <div className="slide-menu">
          <Calendar  tileClassName={tileContent} onClickDay={handleTileClick}  />
        </div>
      </Collapse>
      <div className={`calendar d-none d-lg-block ${isMenuOpen ? "menu-open" : ""}`}>
        <Calendar tileClassName={tileContent} onClickDay={handleTileClick} />
      </div>
    </div>
  );
}

export default CustomCalendar;
