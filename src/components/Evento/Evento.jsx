import React, {  useState } from "react";
import "./Evento.css";
import { BiCalendarHeart, BiCalendarAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import {BsClockFill} from "react-icons/bs"
import { esAnterior, esHoy } from "../../shared/formatDate";
import { format, formatDistanceToNow, parse, parseISO, set } from "date-fns";
import { gl } from "date-fns/locale";
import MapIcon from "../MapIcon/MapIcon";
import Favorito from "../Favorito/Favorito";
import { BsInfoCircleFill } from "react-icons/bs";
import { BsFillShareFill } from "react-icons/bs";
import { AiFillEuroCircle } from "react-icons/ai";
import { FaMusic } from "react-icons/fa";
import MapComponent from "../MapComponent/MapComponent";
import useFavorites from "../../shared/useFavorites";
import { useDispatch } from "react-redux";
import { setEvento } from "../../redux/eventos/eventos.actions";
import Modal from "../Modal/Modal";
import ToolTip from "../ToolTip/ToolTip";

const Evento = ({ evento, user }) => {
  const [hovered, setHovered] = useState(false);
  const [shareModal, setShareModal]=useState(false)

  const [showMap, setShowMap] = useState(false);
  const dispatch = useDispatch();
  const { isFavorite, handleFavorites, showFavorite } = useFavorites(
    user?.favorites?.includes(evento._id) || false,
    evento ? evento._id : null,
    user ? user._id : null
  );
  const handleDisplayTooltip = () => {
    setHovered(!hovered);
  };

  const handleShareModal=()=>{
    setShareModal(!shareModal)
  }

    const handleToggleMap = () => {
    setShowMap((showMap) => !showMap);
  };
  const getEvento = () => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    dispatch(setEvento(evento._id));
  };
  const isLongTitle = evento?.title?.length > 10 && !evento.title.includes(" ");

  const fechaEvento = evento?.date_start ? parseISO(evento.date_start) : null;
  let diasFaltantes = null;
  if(fechaEvento) {
     diasFaltantes = formatDistanceToNow(fechaEvento, {
      unit: "day",
      locale: gl,
    });
  }
  const fechaStart = evento?.date_start
    ? format(fechaEvento, "EEE, dd, MMM ", {
        locale: gl,
      })
    : null;
  const horaStart = evento?.date_start ? format(fechaEvento, "HH:mm") : null;
  
  return (
    <div className={`card ${evento.status ? "status " + evento.status : ""}`}>
                {shareModal && <Modal show="true" evento={evento} handleShareModal={handleShareModal}/>}
                
      {esHoy(evento.date_start) ? (
        <div className="data-label_container esHoy">
          <div className="data-label_esHoy">HOXE</div>
        </div>
      ) : (
        <div className="data-label_container">
          <div className="data-label_weekday">{fechaStart?.split(",")[0]}</div>
          <div className="data-label_day">{fechaStart?.split(",")[1]}</div>
          <div className="data-label_month">{fechaStart?.split(",")[2]}</div>
        </div>
      )}

      <div className="border-card">
      
        <div className="div-image" onClick={getEvento}>
        <Link to={{ pathname: `/${evento._id}` } } >
          {evento.image ? (
            <><img
              src={evento.image}
              alt={evento.title}
              onError={(e) => {
                e.target.style.display = "none"; // Oculta la imagen que no  carga
                e.target.nextSibling.style.display = "block"; // Muestra el div de los logos
        }}
      />
      <div className="background-logo" style={{display: "none"}}></div>  </>
          ) : (
            <div className="background-logo"></div>
          )}
          </Link>
        </div>
      
        <div className="title-artist_container">
          <h2 className={isLongTitle ? "long-title" : ""}>{evento.title}</h2>

          <h3>{evento.artist}</h3>
        </div>
        <div className="detalles_container">
          {evento.site && evento.site !== "Varios" ? (
            <p className="detalles-site">
            <MapIcon showMap={showMap} onClick={handleToggleMap} />
              {evento.site.split(",")[0]}
             
            </p>
          ) : (
            <p className="detalles-site">
            <MapIcon  />
              {evento.site?.split(",")[0]}
             
            </p>
          )}

          {horaStart && (
            <div className="evento-hora">
             <p> <BsClockFill className="icon-style"/> {horaStart}h</p>
            </div>
          )}
          <p className="dias-faltantes">
            {esAnterior(evento.date_start) ? "Fai" : "Dentro de"}{" "}
            <span className="blue-text">{diasFaltantes} </span>
          </p>
         
          {evento.price == 0 && evento.payWhatYouWant==false ? (
            <p className="evento-precio"><span className="gratuito">GRATUITO</span></p>
          ) : (
            evento.price>0 ?( <p className="evento-precio"><AiFillEuroCircle className="icon-style icon-price"/> {evento.price}€</p>):(
              <p className="evento-precio"><span className="gratuito">ENTRADA INVERSA</span></p>
            )
          )}
          {evento.genre ? <p className="evento-genre"> <FaMusic className="icon-style icon-price" /> {evento.genre}</p> : <p></p>}
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
            <p className="card-nocomments">Non hai comentarios</p>
          )}
          <div className="div_relleno"></div>
          <div className="icon-container">
            {user ? (
              <div
                className="favorito-container"
                onClick={()=>{handleFavorites(); handleDisplayTooltip()}}
                onMouseEnter={handleDisplayTooltip}
                onMouseLeave={handleDisplayTooltip}
              >
                {isFavorite ? (
                  <>
                    <BiCalendarHeart className="favorito" />
                    {hovered && (
                      <ToolTip content="Quitar favorito" />
                    )}
                  </>
                ) : (
                  <>
                    <BiCalendarAlt className="favorito" />
                    {hovered && (
                      <ToolTip content="Engadir favorito" />

                    )}
                  </>
                )}
              </div>
            ) : (<div className="favorito-container ">
            <BiCalendarAlt className="favorito unavailiable" />
            </div>)}
            <span onClick={handleShareModal}><BsFillShareFill className="mas-info" /> </span>
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
