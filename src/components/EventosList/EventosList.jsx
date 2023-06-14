import React, { useEffect } from "react";
import { getAllEventos } from "../../redux/eventos/eventos.actions";
import { useDispatch, useSelector } from "react-redux";
import Evento from "../Evento/Evento";
import "./EventosList.css";

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
fechaHoy.setHours(0,0,0,0);
  return (
    <div className="eventos-top">
      {loading ? (
        <div className="div-img">
          <img src="/assets/music.gif" alt="Cargando..." />
        </div>
      ) : (
        eventosOrdenados.filter((evento) => new Date(evento.date_start) >= fechaHoy).map((evento) => (
          <Evento evento={evento} key={evento._id} />
        ))
      )}
    </div>
  );
};

export default EventosList;
