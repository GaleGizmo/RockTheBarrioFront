import React, { useEffect, useState } from "react";
import "./DetallesEvento.css";
import ComentariosList from "../../components/ComentariosList/ComentariosList";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvento,
  getEventoById,
} from "../../redux/eventos/eventos.actions";
import Button from "../../components/Button/Button";
import NuevoComentario from "../../components/NuevoComentario/NuevoComentario";
import { esAnterior, esHoy, formatDate } from "../../shared/formatDate";
import MapComponent from "../../components/MapComponent/MapComponent";
import MapIcon from "../../components/MapIcon/MapIcon";
import { AiFillCloseSquare } from "react-icons/ai";
import useFavorites from "../../shared/useFavorites";
import { BiCalendarAlt, BiCalendarHeart } from "react-icons/bi";
import Favorito from "../../components/Favorito/Favorito";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { gl } from "date-fns/locale";

const DetallesEvento = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formattedContent, setFormattedContent] = useState("");
  const { loading, evento } = useSelector((reducer) => reducer.eventosReducer);
  useEffect(() => {
    if (!evento || evento._id !== id) {
      dispatch(getEventoById(id));
    }
  }, [dispatch, id, evento]);
  console.log(evento);
  const { user } = useSelector((reducer) => reducer.usuariosReducer);
  const { isFavorite, handleFavorites, showFavorite } = useFavorites(
    user?.favorites?.includes(evento?._id) || false,
    evento ? evento._id : null,
    user ? user._id : null
  );
  // useEffect(() => {
  //   dispatch(getEventoById(id));
  // }, [id]);

  const navigate = useNavigate();

  const isLongTitle =
    evento &&
    evento.title &&
    evento.title.length > 10 &&
    !evento.title.includes(" ");

  const eliminarEvento = () => {
    dispatch(deleteEvento(evento._id, navigate));
  };
  const editarEvento = () => {
    navigate(`/editar-evento/${evento._id}`);
  };
  const comprar = () => {
    window.open(evento.url, "_blank");
  };
  const [showMap, setShowMap] = useState(false);

  const handleToggleMap = () => {
    setShowMap((showMap) => !showMap);
  };

  const goHome = () => {
    navigate("/");
  };
  useEffect(() => {
    if (evento && evento.content) {
      const formattedContent = evento.content.replace(
        /[:.](?!\s*-)|\./g,
        (match) => (match === "." ? ".\n" : ":")
      );
      setFormattedContent(formattedContent);
    }
  }, [evento]);
  const fechaEvento =
    evento && evento.date_start ? parseISO(evento.date_start) : null;
  const diasFaltantes = fechaEvento
    ? formatDistanceToNow(fechaEvento, {
        unit: "day",
        locale: gl,
      })
    : null;
  const fechaStart = fechaEvento
    ? format(fechaEvento, "EEEE, dd MMMM, yyyy, HH:mm", {
        locale: gl,
      })
    : null;
  const fechaEnd = evento?.date_end ? formatDate(evento.date_end) : null;

  return (
    <div>
      {!evento ? (
        <div className="div-img">
          <img
            src="/assets/music.gif"
            style={{ marginTop: "200px" }}
            alt="Cargando..."
          />
        </div>
      ) : (
        <>
          <div className="detalles-container">
            <div
              className={`divCardDetEv  ${
                evento.status ? "status " + evento.status : ""
              }`}
            >
              <div className="cardDetEv">
                <AiFillCloseSquare className="close-icon" onClick={goHome} />
                <h1 className={isLongTitle ? "long-title" : ""}>
                  {evento.title}
                </h1>
                {evento.youtubeVideoId ? (
                  <div className={`youtube-video-container`}>
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${evento.youtubeVideoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : evento.image ? (
                  <img
                    className={`${evento.status ? evento.status : ""}`}
                    src={evento.image}
                    alt={evento.title}
                  />
                ) : (
                  <img
                    src="https://metropoliabierta.elespanol.com/uploads/s1/36/81/72/audience-band-celebration-1190298_9_1200x480.jpeg"
                    alt="Imagen genérica"
                  />
                )}
                <h2>{evento.artist}</h2>
                <h3>
                  <div><strong>Lugar: </strong>
                  {evento.site && evento.site !== "Varios" ? (
                    <>
                      {evento.site.split(",")[0]}{" "}
                      <MapIcon showMap={showMap} onClick={handleToggleMap} />
                    </>
                  ) : (
                    <>{evento.site.split(",")[0]}</>
                  )} </div>

                  {evento.price == 0 ? (
                    <div className="gratuito">GRATUITO</div>
                  ) : (
                    <div className="detalles_precio">
                      <div>
                        <strong>Prezo: </strong>
                        {evento.price} €
                      </div>
                      {evento.buy_ticket && (
                        <a
                          className="boleto_precio"
                          href={evento.buy_ticket}
                          target="blank"
                        >
                          <img
                            src="/assets/boleto.png"
                            className="boleto_imagen"
                          />
                        </a>
                      )}
                    </div>
                  )}
                </h3>
                {esHoy(evento.date_start) ? (
                  <h3 className="gratuito ">
                    HOXE <span>{fechaStart.split(",")[3]}h</span>
                  </h3>
                ) : (
                  <div className="muestra-fecha">
                    <h3>{fechaStart}h</h3>

                    {fechaEnd && <span className="fecha-end"> {fechaEnd}</span>}
                  </div>
                )}
                {fechaEnd && <h3>{fechaEnd}</h3>}
                <p>
                  {esAnterior(evento.date_start) ? "Fai" : "Dentro de"}{" "}
                  <span className="gratuito">{diasFaltantes} </span>
                </p>
                {evento.genre && (
                  <h3>
                    <div><strong>Xénero:</strong> {evento.genre}
                    {user && (
                      <span onClick={handleFavorites}>
                        {isFavorite ? (
                          <BiCalendarHeart className="favorito favorito-detalle" />
                        ) : (
                          <BiCalendarAlt className="favorito favorito-detalle" />
                        )}
                      </span>
                    )} </div>
                    {showFavorite && (
                      <Favorito
                        claseDetalle="tooltip-detalle"
                        evento={evento._id}
                        favoriteStatus={isFavorite}
                      />
                    )}
                  </h3>
                )}
                <div className="evento_contenido">
                  {formattedContent.split("\n").map((sentence, index) => (
                    <p key={index}>{sentence}</p>
                  ))}
                </div>
                {evento.url && (
                  <div className="margin-boton-info">
                    <Button text="+Info" type="medium" onClick={comprar} />
                  </div>
                )}
                {user?.role === 2 && (
                  <div className="evento-botonesAdmin">
                    <Button
                      text="Eliminar"
                      type="medium"
                      onClick={eliminarEvento}
                    />
                    <Button
                      text="Editar"
                      type="medium"
                      onClick={editarEvento}
                    />
                  </div>
                )}
                {showMap && <MapComponent direccion={evento.site} />}
              </div>
            </div>
            <div className="detalle-comentarios">
              <div className="divCardDetEv">
                <div className="nuevocomentario-wrapper">
                  {user ? (
                    <NuevoComentario eventoId={evento._id} user={user} />
                  ) : (
                    <p className="texto-aviso">
                      Tes que te rexistrar para poder comentar
                    </p>
                  )}
                  <h2 className="texto-aviso">COMENTARIOS DO EVENTO</h2>
                </div>
                <div className="comentarioslist-wrapper">
                  {evento ? (
                    <ComentariosList eventoId={evento._id} hayUser={user} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetallesEvento;
