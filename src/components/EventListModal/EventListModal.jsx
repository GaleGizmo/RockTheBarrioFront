import React, { memo } from "react";
import { Link } from "react-router-dom";
import "./EventListModal.css";

import { setEvento } from "../../redux/eventos/eventos.actions";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";

const EventListModal = memo(({ events, onClose, position }) => {
  const { top, left } = position;
  const dispatch = useDispatch();
  const getEvento = (id) => {
    dispatch(setEvento(id));
  };
  const modalToLeft = left > window.innerWidth / 2;
  const modalStyles = {
    top: `${top}px`,
    left: `${left}px`,
    ...(modalToLeft && { transform: "translateX(-100%)" }),
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
              text={evento.title}
              type="small evento-calendar"
              onClick={() => getEvento(evento._id)}
            />
          </Link>
        </div>
      ))}
    </div>
  );
});

export default EventListModal;
