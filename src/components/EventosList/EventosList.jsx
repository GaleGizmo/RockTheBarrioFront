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
import Loader from "../Loader/Loader";
import { LiaHandPointLeftSolid } from "react-icons/lia";


const EventosList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventosParaCalendar());
  }, [dispatch]);

  const [filtroActivo, setFiltroActivo] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [eventosToShow, setEventosToShow] = useState([]);
  const [messageToShow, setMessageToShow] = useState("");
  const { user } = useSelector((reducer) => reducer.usuariosReducer);
  let {
    loading,
    eventos,
    eventosFiltrados,
    eventosCalendar,
    filtradosFromCalendar,
  } = useSelector((reducer) => reducer.eventosReducer);

  useEffect(() => {
    if (Array.isArray(eventosFiltrados) && eventosFiltrados.length > 0) {
      setEventosToShow([...eventosFiltrados]);
      if (filtradosFromCalendar) {
        if (eventosFiltrados.length > 1) {
          setMessageToShow(
            "Hai " + eventosFiltrados.length + " eventos nesta data"
          );
        } else {
          setMessageToShow("Hai 1 evento nesta data");
        }
      } else {
        if (eventosFiltrados.length > 1) {
          setMessageToShow(
            "Hai " + eventosFiltrados.length + " resultados da túa búsqueda"
          );
        } else {
          setMessageToShow("Hai 1 resultado da túa búsqueda");
        }
      }

      setFiltroActivo(true);
    } else {
      setEventosToShow([...eventos]);
      setFiltroActivo(false);
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
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(getEventosDesdeHoy());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      const scrollPosition = sessionStorage.getItem("scrollPosition");

      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem("scrollPosition");
      }
    }, 500);
  }, []);

  return (
    <div className="eventos-list">
  {  filtroActivo && <div className="point-icon" > </div>}
      <div className="div-buscador">
        <Buscador eventos={eventos} user={user} />
      </div>
      <div className="eventos">
        {loading ? (
          <Loader />
        ) : (
          <>
            {filtroActivo && (
              <p className={`resultados_busqueda ${scrolled ? "hidden" : ""}`}>
                {messageToShow}
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
