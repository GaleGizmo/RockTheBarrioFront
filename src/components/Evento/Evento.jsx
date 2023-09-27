import React, { useState } from "react";
import "./Evento.css";
import { BiCalendarHeart, BiCalendarAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

import { esAnterior, esHoy } from "../../shared/formatDate";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { gl } from "date-fns/locale";
import MapIcon from "../MapIcon/MapIcon";
import Favorito from "../Favorito/Favorito";
import { BsInfoCircleFill } from "react-icons/bs";
import MapComponent from "../MapComponent/MapComponent";
import useFavorites from "../../shared/useFavorites";
import { useDispatch } from "react-redux";
import { setEvento } from "../../redux/eventos/eventos.actions";

const Evento = ({ evento, user }) => {
  const [hovered, setHovered] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const dispatch = useDispatch();
  const { isFavorite, handleFavorites, showFavorite } = useFavorites(
    user?.favorites?.includes(evento._id) || false,
    evento ? evento._id : null,
    user ? user._id : null
  );
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleToggleMap = () => {
    setShowMap((showMap) => !showMap);
  };
  const getEvento = () => {
    dispatch(setEvento(evento._id));
  };
  const isLongTitle = evento.title.length > 10 && !evento.title.includes(" ");

  const fechaEvento = evento.date_start ? parseISO(evento.date_start) : null;
  const diasFaltantes = formatDistanceToNow(fechaEvento, {
    unit: "day",
    locale: gl,
  });
  const fechaStart = evento.date_start
    ? format(fechaEvento, "EEE, dd MMM, yyyy, HH:mm", {
        locale: gl,
      })
    : null;
  // const fechaEnd = evento.date_end
  //   ? format(parseISO(evento.date_end), "EEE, dd MMM, yyyy, HH:mm", {
  //       locale: gl,
  //     })
  //   : null;

  return (
    <div className="card">
      <div className="border-card">
        <div className="div-image">
          {evento.image ? (
            <img src={evento.image} alt={evento.title} />
          ) : (
            <img
              src="https://metropoliabierta.elespanol.com/uploads/s1/36/81/72/audience-band-celebration-1190298_9_1200x480.jpeg"
              alt="Imagen nula"
            />
          )}
        </div>

        <div className="title-artist_container">
          <h1 className={isLongTitle ? "long-title" : ""}>{evento.title}</h1>

          <h2>{evento.artist}</h2>
        </div>
        <div className="detalles_container">
          <div className="ver-detalles">
            <Link to={{ pathname: `/${evento._id}` }}>
              <BsInfoCircleFill className="mas-info" onClick={getEvento} />
            </Link>
            {user && (
              <div className="icon-container" onClick={handleFavorites} 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}>
                {isFavorite ? (<>
                  <BiCalendarHeart className="favorito" />
                  {hovered && <span className="favorito-tooltip">Engadir/quitar favorito</span>}</>
                ) : (<>
                  <BiCalendarAlt className="favorito" />
                  {hovered && <span className="favorito-tooltip">Engadir/quitar favorito</span>}
                  </>
                )}
                
              </div>
             
            )}
            
            {showFavorite && (
              <Favorito evento={evento._id} favoriteStatus={isFavorite} />
            )}
          </div>
          {evento.site && evento.site !== "Varios" ? (
            <p>
              {evento.site.split(",")[0]}{" "}
              <MapIcon showMap={showMap} onClick={handleToggleMap} />
            </p>
          ) : (
            <p>{evento.site.split(",")[0]}</p>
          )}

          {fechaStart && (
            <div>
              {esHoy(evento.date_start) ? (
                <p className="gratuito hoy">HOXE</p>
              ) : (
                <div className="muestra-fecha">
                  <p>{fechaStart}h</p>
                </div>
              )}
            </div>
          )}
          <p className="dias-faltantes">
       
            {esAnterior(evento.date_start) ? "Fai": "Faltan"} <span className="gratuito">{diasFaltantes} </span>
          </p>
          {evento.genre && <p className="evento-genre">{evento.genre}</p>}
          {evento.price == 0 ? (
            <p className="gratuito">GRATUITO</p>
          ) : (
            evento.price && <p>{evento.price} €</p>
          )}
        </div>
      </div>
      {showMap && <MapComponent direccion={evento.site} />}
    </div>
  );
};

export default Evento;
