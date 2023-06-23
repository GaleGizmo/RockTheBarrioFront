import React, {  useState } from "react";
import "./Evento.css";
import { Link } from "react-router-dom";
import { esHoy, formatDate } from "../../shared/formatDate";
import {formatDistanceToNow, parseISO} from "date-fns";
import esLocale from 'date-fns/esm/locale/es/index.js';
import MapIcon from "../MapIcon/MapIcon";

import MapComponent from "../MapComponent/MapComponent";


const Evento = ({ evento }) => {
  const [showMap, setShowMap] = useState(false);


  const handleToggleMap = () => {
    setShowMap(showMap=>!showMap)
  };
  const isLongTitle = evento.title.length > 10 && !evento.title.includes(" ");

  const fechaEvento=evento.date_start ? parseISO(evento.date_start): null
  const diasFaltantes = formatDistanceToNow(fechaEvento, { unit: 'day', locale: esLocale });
  const fechaStart = evento.date_start ? formatDate(evento.date_start) : null;
  const fechaEnd = evento.date_end ? formatDate(evento.date_end) : null;
console.log(evento);
  
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
          <h1 className={isLongTitle ? "long-title" : ""} >{evento.title}</h1>
          </Link>
          <h2>{evento.subtitle}</h2>
         
        </div>
        <div className="div2">
          {evento.site && <p>{evento.site.split(",")[0]} <MapIcon showMap={showMap} onClick={handleToggleMap} /></p>}
          
          {fechaStart && !fechaEnd ? (
            <div>
              {esHoy(evento.date_start) ? (
                <p className="gratuito hoy">HOY</p>
              ) : (<div className="muestra-fecha">
    
    <p >{fechaStart}h</p>
   
    {fechaEnd && <span className="fecha-end"> {fechaEnd}</span>}
  </div>
              )}
              
            </div>
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
      {showMap && <MapComponent direccion={evento.site}/>}
    </div>
  );
};

export default Evento;
