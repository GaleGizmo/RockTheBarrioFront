import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./Evento.css";
import { BiHeart, BiSolidHeart, BiSolidComment } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { BsClockFill } from "react-icons/bs";
import { esAnterior, esHoy, calcularDiasFaltantes } from "../../shared/formatDate";
import { format, parseISO } from "date-fns";
import { gl } from "date-fns/locale";
import MapIcon from "../MapIcon/MapIcon";
import { BsInfoCircleFill } from "react-icons/bs";
import { BsFillShareFill } from "react-icons/bs";
import { AiOutlineCopy } from "react-icons/ai";
import { AiFillEuroCircle, AiOutlineZoomIn } from "react-icons/ai";
import { FaBuyNLarge, FaMusic } from "react-icons/fa";
import MapComponent from "../MapComponent/MapComponent";
import useFavorites from "../../shared/useFavorites";
import { useDispatch } from "react-redux";
import { setEvento } from "../../redux/eventos/eventos.actions";
import Modal from "../Modal/Modal";
import ToolTip from "../ToolTip/ToolTip";
import { isLongTitle } from "../../utils/textUtils";
import { handleImageError } from "../../utils/imageHelpers";

const Evento = ({ evento, user }) => {
  const [hovered, setHovered] = useState("");
  const [shareModal, setShareModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const SVG_FALLBACK = "/assets/rockthebarrio_pegata_azul.svg";
  const modalImageUrl = !evento.image || imageFailed ? SVG_FALLBACK : evento.image;

  const [showMap, setShowMap] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFavorite, handleFavorites, showFavorite } = useFavorites(
    user?.favorites?.includes(evento._id) || false,
    evento ? evento._id : null,
    user ? user._id : null
  );

  const handleShareModal = () => {
    setShareModal(!shareModal);
  };
  const copyIdToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(evento._id);
    } catch (error) {
      console.error("Error al copiar el ID al portapapeles:", error);
    }
  };
  const handleToggleMap = (e) => {
    e.stopPropagation();
    setShowMap((showMap) => !showMap);
  };
  const getEvento = () => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    dispatch(setEvento(evento._id));
    navigate(`/${evento._id}`);
  };

  const fechaEvento = evento?.date_start ? parseISO(evento.date_start) : null;
  const diasFaltantes = evento?.date_start ? calcularDiasFaltantes(evento.date_start) : null;

  const buyEvento = (e) => {
    e.stopPropagation();
    if (evento.price > 0 && evento.buy_ticket) {
      window.open(evento.buy_ticket, "_blank", "noopener,noreferrer");
    }
  };
  const fechaStart = evento?.date_start
    ? format(fechaEvento, "EEE, dd, MMM ", {
        locale: gl,
      })
    : null;
  const horaStart = evento?.date_start ? format(fechaEvento, "HH:mm") : null;

  return (
    <div
      className={`card ${evento.highlighted ? "highlighted" : ""} ${
        evento.status ? "status " + evento.status : ""
      }`}
      onClick={getEvento}
    >
      {evento.highlighted && <div className="highlight-banner">DESTACADO</div>}
      {shareModal && (
        <Modal
          show="true"
          evento={evento}
          handleShareModal={handleShareModal}
        />
      )}
      {showImageModal && createPortal(
        <>
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1050 }}
            onClick={(e) => { e.stopPropagation(); setShowImageModal(false); }}
          />
          <div
            className="modal fade show"
            style={{ display: "flex", zIndex: 1051 }}
            onClick={(e) => { e.stopPropagation(); setShowImageModal(false); }}
          >
            <div className="image-container" onClick={(e) => e.stopPropagation()}>
              <img
                src={modalImageUrl}
                alt={evento.title}
                className="modal-image"
                onClick={() => setShowImageModal(false)}
              />
            </div>
          </div>
        </>,
        document.body
      )}

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
        <div className="div-image">
          {evento.image ? (
            <>
              <img
                src={evento.image}
                alt={evento.title}
                onError={(e) => { handleImageError(e); setImageFailed(true); }}
                onClick={(e) => { e.stopPropagation(); setShowImageModal(true); }}
                style={{ cursor: "zoom-in" }}
              />
              <div
                className="background-logo"
                style={{ display: "none", cursor: "zoom-in" }}
                onClick={(e) => { e.stopPropagation(); setShowImageModal(true); }}
              ></div>
              <AiOutlineZoomIn
                className="card-zoom-icon"
                onClick={(e) => { e.stopPropagation(); setShowImageModal(true); }}
              />
            </>
          ) : (
            <div
              className="background-logo"
              style={{ cursor: "zoom-in" }}
              onClick={(e) => { e.stopPropagation(); setShowImageModal(true); }}
            ></div>
          )}
        </div>

        <div className="title-artist_container">
          <h2 className={isLongTitle(evento.title) ? "long-title" : ""}>{evento.title}</h2>

          <h3>{evento.artist}</h3>
          {user?.role === 2 && (
            <span onClick={(e) => { e.stopPropagation(); copyIdToClipboard(); }} className="copy-to-clipboard">
              <AiOutlineCopy />
            </span>
          )}
        </div>
        <div className="detalles_container">
          {evento.site && evento.site !== "Varios" ? (
            <p className="detalles-site" onClick={handleToggleMap}>
              <MapIcon showMap={showMap} />
              {evento.site.split(",")[0]}
            </p>
          ) : (
            <p className="detalles-site">
              <MapIcon />
              {evento.site?.split(",")[0]}
            </p>
          )}

          {horaStart && (
            <div className="evento-hora">
              <p>
                {" "}
                <BsClockFill className="icon-style" /> {horaStart}h
              </p>
            </div>
          )}
          <p className="dias-faltantes">
            <span className="dias-faltantes_label">{esAnterior(evento.date_start) ? "Fai" : "En"}</span>
            <span className="blue-text"> {diasFaltantes} </span>
          </p>

          {evento.genre ? (
            <div
              className="evento-genre-wrapper"
              onMouseEnter={() => setHovered("genre-tooltip")}
              onMouseLeave={() => setHovered("")}
            >
              <p className="evento-genre">
                <FaMusic className="icon-style icon-price" /> {evento.genre}
              </p>
              <ToolTip content={evento.genre} specificClass={hovered === "genre-tooltip" ? "genre-tooltip" : ""} />
            </div>
          ) : (
            <p></p>
          )}
          {evento.price == 0 && evento.payWhatYouWant == false ? (
            <p className="evento-precio">
              <span className="gratuito">GRATUITO</span>
            </p>
          ) : evento.price > 0 ? (
            <p className="evento-precio" onClick={buyEvento}>
              <AiFillEuroCircle className="icon-style icon-price" />{" "}
              {evento.price}€
            </p>
          ) : (
            <p className="evento-precio">
              <span className="gratuito">ENTRADA INVERSA</span>
            </p>
          )}


          <div className="div_relleno"></div>
          <div className="icon-container">
            {user ? (
              <div
                className="favorito-container"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorites();
                }}
                onMouseEnter={() => setHovered("favorito-tooltip")}
                onMouseLeave={() => setHovered("")}
              >
                {isFavorite ? (
                  <>
                    <BiSolidHeart className="favorito" />
                    <ToolTip
                      content="Quitar favorito"
                      specificClass={hovered === "favorito-tooltip" ? "favorito-tooltip" : ""}
                    />
                  </>
                ) : (
                  <>
                    <BiHeart className="favorito" />
                    <ToolTip
                      content="Engadir favorito"
                      specificClass={hovered === "favorito-tooltip" ? "favorito-tooltip" : ""}
                    />
                  </>
                )}
              </div>
            ) : (
              <div className="favorito-container ">
                <BiHeart className="favorito unavailiable" />
              </div>
            )}
            <span onClick={(e) => { e.stopPropagation(); handleShareModal(); }}>
              <BsFillShareFill className="mas-info" />{" "}
            </span>
            <Link
              to={{ pathname: `/${evento._id}` }}
              onClick={(e) => { e.stopPropagation(); sessionStorage.setItem("scrollPosition", window.scrollY); dispatch(setEvento(evento._id)); }}
            >
              <BsInfoCircleFill className="mas-info" />
            </Link>
            {showFavorite && (
              <ToolTip
                content={
                  isFavorite ? "Favorito engadido" : "Favorito eliminado"
                }
                specificClass="favorito-tooltip"
              />
            )}
          </div>
        </div>
      </div>

      {showMap && <MapComponent location={evento.location} />}
    </div>
  );
};

export default Evento;
