import React, { memo } from "react";
import { Link } from "react-router-dom";
import "./EventListModal.css";

import { setEvento, toggleCalendar } from "../../redux/eventos/eventos.actions";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";

const EventListModal = memo(({ events, position, calendarState, action }) => {
  const { top, left } = position;
  
  const dispatch = useDispatch();
  const getEvento = (id) => {
   action()
    dispatch(toggleCalendar(!calendarState))
    dispatch(setEvento(id));
  };
  const modalToLeft = left > window.innerWidth / 2;
  const modalToUp = top > window.innerHeight / 2;
 
  const modalStyles = {
    top: `${top+10}px`,
    left: `${left}px`,
      };
  if (modalToLeft && modalToUp) {
    modalStyles.top= `${top-10}px`
    modalStyles.transform = "translateX(-100%) translateY(-100%)";
  } else if (modalToLeft) {
    modalStyles.transform = "translateX(-100%)";
  } else if (modalToUp) {
    modalStyles.top= `${top-10}px`
    modalStyles.transform = "translateY(-100%)";
  }
  const truncateTitle = (title) => {
    if (title.length <= 35) {
      return title;
    } else {
      let truncationPoint = title.lastIndexOf(' ', 35);
      if (truncationPoint === -1) truncationPoint = 35;
      return `${title.substring(0, truncationPoint)}...`;
    }
  };
  return (
    <div className="event-list-modal" style={modalStyles}>
      <h2>
        <strong>Eventos nesta data:</strong>
      </h2>
      {events.map((evento) => (
        <div key={evento._id}>
          <Link to={`/${evento._id}`}>
            {" "}
            <Button
              text={truncateTitle(evento.title)}
              variant="small evento-calendar"
              onClick={() => getEvento(evento._id)}
            />
          </Link>
        </div>
      ))}
    </div>
  );
});

export default EventListModal;
