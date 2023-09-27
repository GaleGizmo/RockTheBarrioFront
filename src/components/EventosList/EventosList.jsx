import React, { useEffect, useState } from "react";
import { getAllEventos } from "../../redux/eventos/eventos.actions";
import { useDispatch, useSelector } from "react-redux";
import Evento from "../Evento/Evento";

import "react-calendar/dist/Calendar.css";
import "./EventosList.css";

import CustomCalendar from "../CustomCalendar/CustomCalendar";
import Buscador from "../Buscador/Buscador";

const EventosList = () => {
  const dispatch = useDispatch();
  const [eventosToShow, setEventosToShow] = useState([]);
  const { user } = useSelector((reducer) => reducer.usuariosReducer);
  let { loading, eventos, eventosFiltrados } = useSelector(
    (reducer) => reducer.eventosReducer
  );

  useEffect(() => {
    if (Array.isArray(eventosFiltrados) && eventosFiltrados.length > 0) {
      setEventosToShow([...eventosFiltrados]);
    } else {
      setEventosToShow([...eventos]);
    }
  }, [eventosFiltrados, eventos]);

 
  const eventosOrdenados = [...eventosToShow].sort(
    (a, b) => new Date(a.date_start) - new Date(b.date_start)
  );
  const eventosParaCalendario = eventosOrdenados.map((evento) => ({
    _id: evento._id,
    title: evento.title,
    date_start: evento.date_start,
  }));
  useEffect(() => {
    dispatch(getAllEventos());
  }, [dispatch]);
  const fechaHoy = new Date();

  return (
    <div className="eventos-list">
      <div className="div-buscador">
        <Buscador eventos={eventos} user={user} />
      </div>
      <div className="eventos">
        {loading ? (
          <div className="div-img">
            <img src="/assets/music.gif" alt="Cargando..." />
          </div>
        ) : eventosFiltrados.length>0 ? (
          eventosOrdenados.map((evento) => (
            <Evento user={user} evento={evento} key={evento._id} />
          ))
        ) : (
          eventosOrdenados
            .filter((evento) => new Date(evento.date_start) >= fechaHoy)
            .map((evento) => (
              <Evento user={user} evento={evento} key={evento._id} />
            ))
        )}
      </div>
      <div className="div-calendario">
        <CustomCalendar eventos={eventosParaCalendario} />
      </div>
    </div>
  );
};

export default EventosList;
