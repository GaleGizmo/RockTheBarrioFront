import React from "react";
import { Link } from "react-router-dom";
import "./EventListModal.css"

import { AiFillCloseSquare } from "react-icons/ai";

const EventListModal = ({ events, onClose, position }) => {
  const { top, left } = position;
  console.log(left);
  console.log(window.innerWidth);
  const modalToLeft=left>(window.innerWidth/2)
  const modalStyles = {
    top: `${top}px`,
    left: `${left}px`,
    ...(modalToLeft && { transform: "translateX(-100%)" })
  } 
  return (
    <div className="event-list-modal" style={modalStyles}>
    <AiFillCloseSquare className="close-icon" onClick={onClose} />
      <h2>Eventos nesta data:</h2>
      {events.map((evento) => (
        <div key={evento._id}>
        <Link to={`/${evento._id}`}> <h3>{evento.title}</h3></Link>
          
         
        </div>
      ))}
      {/* <Button text="Pechar" type="small" onClick={onClose}/> */}
      {/* <button onClick={onClose}>Pechar</button> */}
    </div>
  );
};

export default EventListModal;
