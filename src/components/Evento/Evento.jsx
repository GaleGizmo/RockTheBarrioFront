import React, { useState } from "react";
import "./Evento.css";
import { BiCalendarHeart, BiCalendarAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

import { esAnterior, esHoy } from "../../shared/formatDate";
import { format, formatDistanceToNow, parse, parseISO } from "date-fns";
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
    ? format(fechaEvento, "EEE, dd, MMM ", {
        locale: gl,
      })
    : null;
  const horaStart = evento.date_start ? format(fechaEvento, "HH:mm") : null;
  console.log(fechaStart);
  return (
    <div className={`card ${evento.status ? "status " + evento.status : ""}`}>
     {esHoy(evento.date_start) ? ( <div className="data-label_container esHoy">
        
          <div className="data-label_esHoy">HOXE</div></div>
        ) : (
          <div className="data-label_container">
           
            <div className="data-label_weekday">{fechaStart.split(",")[0]}</div>
            <div className="data-label_day">{fechaStart.split(",")[1]}</div>
            <div className="data-label_month">{fechaStart.split(",")[2]}</div>
            </div>
        )}
      
      <div className="border-card">
        <div className="div-image">
          {evento.image ? (
            <img
              src={evento.image}
              alt={evento.title}
              onError={(e) => {
                e.target.src =
                  "https://metropoliabierta.elespanol.com/uploads/s1/36/81/72/audience-band-celebration-1190298_9_1200x480.jpeg";
                e.target.alt = "Imagen nula";
              }}
            />
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
          {evento.site && evento.site !== "Varios" ? (
            <p className="detalles-site">
              {evento.site.split(",")[0]}{" "}
              <MapIcon showMap={showMap} onClick={handleToggleMap} />
            </p>
          ) : (
            <p>{evento.site.split(",")[0]}</p>
          )}

          {horaStart && (
            <div>
              <p>{horaStart}h</p>
            </div>
          )}
          <p className="dias-faltantes">
            {esAnterior(evento.date_start) ? "Fai" : "Dentro de"}{" "}
            <span className="gratuito">{diasFaltantes} </span>
          </p>
          {evento.genre && <p className="evento-genre">{evento.genre}</p>}
          {evento.price == 0 ? (
            <p className="gratuito">GRATUITO</p>
          ) : (
            evento.price && <p>{evento.price} €</p>
          )}
          {evento.commentsCount && evento.commentsCount > 1 ? (
            <Link to={{ pathname: `/${evento._id}` }}>
              <p className="card-comments" onClick={getEvento}>
                Hai {evento.commentsCount} comentarios
              </p>
            </Link>
          ) : evento.commentsCount === 1 ? (
            <Link to={{ pathname: `/${evento._id}` }}>
              <p className="card-comments" onClick={getEvento}>
                Hai un comentario
              </p>
            </Link>
          ) : (
            <p>Non hai comentarios</p>
          )}
          <div className="icon-container">
            {user && (
              <div
                className="favorito-container"
                onClick={handleFavorites}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {isFavorite ? (
                  <>
                    <BiCalendarHeart className="favorito" />
                    {hovered && (
                      <span className="favorito-tooltip">
                        Engadir/quitar favorito
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <BiCalendarAlt className="favorito" />
                    {hovered && (
                      <span className="favorito-tooltip">
                        Engadir/quitar favorito
                      </span>
                    )}
                  </>
                )}
              </div>
            )}
            <Link to={{ pathname: `/${evento._id}` }}>
              <BsInfoCircleFill className="mas-info" onClick={getEvento} />
            </Link>
            {showFavorite && (
              <Favorito evento={evento._id} favoriteStatus={isFavorite} />
            )}
          </div>
        </div>
      </div>
      {showMap && <MapComponent direccion={evento.site} />}
    </div>
  );
};

export default Evento;
