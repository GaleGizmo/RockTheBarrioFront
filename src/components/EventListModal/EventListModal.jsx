import React from "react";
import { Link } from "react-router-dom";
import "./EventListModal.css"

import { AiFillCloseSquare } from "react-icons/ai";
import { setEvento } from "../../redux/eventos/eventos.actions";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";

const EventListModal = ({ events, onClose, position }) => {
  const { top, left } = position;
  const dispatch=useDispatch()
  const getEvento =(evento) =>{
    dispatch(setEvento(evento))
   }
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
        <Link to={`/${evento._id}`}> <Button text={evento.title} type="small evento-calendar" onClick={() => getEvento(evento)}/></Link>
          
         
        </div>
      ))}
      {/* <Button text="Pechar" type="small" onClick={onClose}/> */}
      {/* <button onClick={onClose}>Pechar</button> */}
    </div>
  );
};

export default EventListModal;
