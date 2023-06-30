import React, { useEffect } from "react";
import { getAllEventos } from "../../redux/eventos/eventos.actions";
import { useDispatch, useSelector } from "react-redux";
import Evento from "../Evento/Evento";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./EventosList.css";
import { FaCalendar } from "react-icons/fa";
import CustomCalendar from "../CustomCalendar/CustomCalendar";

const EventosList = () => {
  const dispatch = useDispatch();
  const { loading, eventos } = useSelector((reducer) => reducer.eventosReducer);
  const eventosOrdenados = [...eventos].sort(
    (a, b) => new Date(a.date_start) - new Date(b.date_start)
  );
  useEffect(() => {
    dispatch(getAllEventos());
  }, [dispatch]);
  const fechaHoy = new Date();
  
  return (
    <div className="eventos-list">
    <div className="eventos">
      {loading ? (
        <div className="div-img">
          <img src="/assets/music.gif" alt="Cargando..." />
        </div>
      ) : (
        eventosOrdenados
          .filter((evento) => new Date(evento.date_start) >= fechaHoy)
          .map((evento) => <Evento evento={evento} key={evento._id} />)
          
      )}</div>
      <div >
      <CustomCalendar eventos={eventos} /> 
      </div>
    </div>
  );
};

export default EventosList;
