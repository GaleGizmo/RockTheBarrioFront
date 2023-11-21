import React, { useEffect, useState } from "react";
import {
  getEventosDesdeHoy,
  getEventosParaCalendar,
} from "../../redux/eventos/eventos.actions";
import { useDispatch, useSelector } from "react-redux";
import Evento from "../Evento/Evento";

import "react-calendar/dist/Calendar.css";
import "./EventosList.css";

import CustomCalendar from "../CustomCalendar/CustomCalendar";
import Buscador from "../Buscador/Buscador";

const EventosList = () => {
  const dispatch = useDispatch();
  

  
  useEffect(() => {
    dispatch(getEventosParaCalendar());
  }, [dispatch]);

  const [filtroActivo, setFiltroActivo] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [eventosToShow, setEventosToShow] = useState([]);
  const { user } = useSelector((reducer) => reducer.usuariosReducer);
  let { loading, eventos, eventosFiltrados, eventosCalendar } = useSelector(
    (reducer) => reducer.eventosReducer
  );

  useEffect(() => {
    if (Array.isArray(eventosFiltrados) && eventosFiltrados.length > 0) {
      setEventosToShow([...eventosFiltrados]);
      setFiltroActivo(true);
    } else {
      setEventosToShow([...eventos]);
      setFiltroActivo(false)
    }
  }, [eventosFiltrados, eventos]);

  
  useEffect(() => {
   
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 10; 

      if (scrollPosition > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
   
      }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(getEventosDesdeHoy());
  }, [dispatch]);
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
        ) : (
          <>
            {filtroActivo && (
              <p className={`resultados_busqueda ${scrolled ? 'hidden' : ''}`}>
                Hai {eventosFiltrados.length} resultados para a túa búsqueda 
              </p>
            )}
            {eventosToShow.map((evento) => (
              <Evento user={user} evento={evento} key={evento._id} />
            ))}
          </>
        )}
      </div>
      <div className="div-calendario">
        <CustomCalendar eventos={eventosCalendar} />
      </div>
    </div>
  );
};

export default EventosList;
