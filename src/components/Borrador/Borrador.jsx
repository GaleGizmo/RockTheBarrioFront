import React, { useState } from "react";
import "../Evento/Evento.css";
import "./Borrador.css";
import { useNavigate } from "react-router-dom";
import { BsClockFill } from "react-icons/bs";
import { format, parseISO } from "date-fns";
import { gl } from "date-fns/locale";
import MapIcon from "../MapIcon/MapIcon";
import { AiFillEuroCircle } from "react-icons/ai";
import { FaMusic } from "react-icons/fa";
import MapComponent from "../MapComponent/MapComponent";
import EventoEdicion from "../EventoEdicion/EventoEdicion";

const Borrador = ({ borrador, user }) => {
  const [showMap, setShowMap] = useState(false);
  
  const navigate = useNavigate();

  const handleToggleMap = () => {
    setShowMap((showMap) => !showMap);
  };
  const isLongTitle = borrador?.title?.length > 10 && !borrador.title.includes(" ");

  const fechaEvento = borrador?.date_start ? parseISO(borrador.date_start) : null;
  const fechaStart = borrador?.date_start
    ? format(fechaEvento, "EEE, dd, MMM ", { locale: gl })
    : null;
  const horaStart = borrador?.date_start ? format(fechaEvento, "HH:mm") : null;

 const editarBorrador = () => {
    navigate(`/editar-borrador/${borrador._id}`);
   
    }

  return (
    <div
      className={`borrador`}
      onClick={editarBorrador}
    >
      <div className="data-label_container">
        <div className="data-label_weekday">{fechaStart?.split(",")[0]}</div>
        <div className="data-label_day">{fechaStart?.split(",")[1]}</div>
        <div className="data-label_month">{fechaStart?.split(",")[2]}</div>
      </div>

      <div className="border-card">
        <div className="div-image">
         
            {borrador.image ? (
              <>
                <img
                  src={borrador.image}
                  alt={borrador.title}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <div
                  className="background-logo"
                  style={{ display: "none" }}
                ></div>
              </>
            ) : (
              <div className="background-logo"></div>
            )}
          
        </div>

        <div className="title-artist_container">
          <h2 className={isLongTitle ? "long-title" : ""}>{borrador.title}</h2>
          <h3>{borrador.artist}</h3>
        </div>
        <div className="detalles_container">
          {borrador.site && borrador.site !== "Varios" ? (
            <p className="detalles-site">
              <MapIcon showMap={showMap} onClick={handleToggleMap} />
              {borrador.site.split(",")[0]}
            </p>
          ) : (
            <p className="detalles-site">
              <MapIcon />
              {borrador.site?.split(",")[0]}
            </p>
          )}

          {horaStart && (
            <div className="evento-hora">
              <p>
                <BsClockFill className="icon-style" /> {horaStart}h
              </p>
            </div>
          )}

          {borrador.price == 0 && borrador.payWhatYouWant == false ? (
            <p className="evento-precio">
              <span className="gratuito">GRATUITO</span>
            </p>
          ) : borrador.price > 0 ? (
            <p className="evento-precio">
              <AiFillEuroCircle className="icon-style icon-price" /> {borrador.price}€
            </p>
          ) : (
            <p className="evento-precio">
              <span className="gratuito">ENTRADA INVERSA</span>
            </p>
          )}
          {borrador.genre ? (
            <p className="evento-genre">
              <FaMusic className="icon-style icon-price" /> {borrador.genre}
            </p>
          ) : (
            <p></p>
          )}

          <div className="div_relleno"></div>
         
        </div>
      </div>

      {showMap && <MapComponent direccion={borrador.site} />}
    </div>
  );
};

export default Borrador;
