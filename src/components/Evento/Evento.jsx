import React from "react";
import "./Evento.css";
import { Link } from "react-router-dom";
import { esHoy, formatDate } from "../../shared/formatDate";
import {formatDistanceToNow, parseISO} from "date-fns";
import esLocale from 'date-fns/esm/locale/es/index.js';

const Evento = ({ evento }) => {
  const maxLength = 50; // Número máximo de caracteres antes de truncar el contenido del texto

  // const truncatedContent = evento.content
  //   ? evento.content.length > maxLength
  //     ? evento.content.slice(0, maxLength) + "..."
  //     : evento.content
  //   : "";

  const fechaEvento=evento.date_start ? parseISO(evento.date_start): null
  const diasFaltantes = formatDistanceToNow(fechaEvento, { unit: 'day', locale: esLocale });
  const fechaStart = evento.date_start ? formatDate(evento.date_start) : null;
  const fechaEnd = evento.date_end ? formatDate(evento.date_end) : null;

  console.log(evento.date_start, fechaStart);
  

  return (
    <div className="card">
      <div className="border-card">
        <div className="div-image">
          <Link to={{ pathname: `/${evento._id}`, state: { evento } }}>
            {evento.image ? (
              <img src={evento.image} alt={evento.title} />
            ) : (
              <img
                src="https://metropoliabierta.elespanol.com/uploads/s1/36/81/72/audience-band-celebration-1190298_9_1200x480.jpeg"
                alt="Imagen nula"
              />
            )}
          </Link>
        </div>

        <div className="div">
          <Link to={{ pathname: `/${evento._id}`, state: { evento } }}>
            <h1>{evento.title}</h1>
          </Link>
          <h2>{evento.subtitle}</h2>
          {/* <p>{truncatedContent}</p> */}
        </div>
        <div className="div2">
          {evento.site && <p>{evento.site}</p>}
          {fechaStart && !fechaEnd ? (
            <p>
              {esHoy(evento.date_start) ? (
                <p className="gratuito hoy">HOY</p>
              ) : (<div className="muestra-fecha">
    
    <p >{fechaStart}h</p>
   
    {fechaEnd && <span className="fecha-end"> {fechaEnd}</span>}
  </div>
              )}
              
            </p>
          ):(<p>{fechaStart.split(",")[1] }</p>)}
          {fechaEnd && <span className="fecha-end">{fechaEnd.split(",")[1]}</span>}
          <p> Faltan <span className="gratuito">{diasFaltantes} </span></p>
          {evento.genre && <p>{evento.genre}</p>}
          {evento.price == 0 ? (
            <p className="gratuito">GRATUITO</p>
          ) : (
            evento.price && <p>{evento.price} €</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Evento;
