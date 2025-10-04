import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import MapPortal from "../../components/MapPortal/MapPortal";
import MapIcon from "../../components/MapIcon/MapIcon";
import {
  AiFillCloseSquare,
  AiFillEuroCircle,
  AiOutlineZoomIn,
} from "react-icons/ai";
import useFavorites from "../../shared/useFavorites";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { IoTicket } from "react-icons/io5";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { gl } from "date-fns/locale";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet";
import { BsFillShareFill } from "react-icons/bs";
import ToolTip from "../../components/ToolTip/ToolTip";
import { toast } from "react-toastify";

const DetallesEvento = () => {
  const location = useLocation();
  const { successMessage } = useSelector((state) => state.eventosReducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [shareModal, setShareModal] = useState(false);
  const [formattedContent, setFormattedContent] = useState("");
  const { loading, evento } = useSelector((reducer) => reducer.eventosReducer);
  useEffect(() => {
    if (!evento || (evento._id !== id && evento.shortURL !== id)) {
      dispatch(getEventoById(id));
    }
  }, [dispatch, id, evento]);
  const handleShareModal = () => {
    setShareModal(!shareModal);
  };
  const { user } = useSelector((reducer) => reducer.usuariosReducer);
  const { isFavorite, handleFavorites, showFavorite } = useFavorites(
    user?.favorites?.includes(evento?._id) || false,
    evento ? evento._id : null,
    user ? user._id : null
  );
  const [showImageModal, setShowImageModal] = useState(false);

  const openImageModal = () => {
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

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
        /\.(?=\s)|:(?=\s-)/g,
        (match) => (match === "." ? ".\n" : ":\n-")
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
    ? format(fechaEvento, " dd MMMM, HH:mm", {
        locale: gl,
      })
    : null;
  const fechaEnd = evento?.date_end ? formatDate(evento.date_end) : null;

  useEffect(() => {
    if (location.state?.fromCreate && successMessage) {
      // Mostrar el mensaje de éxito
      toast.success(successMessage);
      // Limpia el mensaje tras mostrarlo
      setTimeout(() => {
        dispatch({ type: "CLEAR_MENSAJES" });
      }, 3000); // 3 segundos
    }
  }, [location.state, successMessage, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : !evento ? (
        <div>No se encontró el evento.</div>
      ) : (
        <div className="detalles-container">
          {location.state?.fromCreate && successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <Helmet>
            <title>{evento.title}</title>
            <meta
              property="description"
              content={`${evento.artist} en ${evento.site.split(",")[0]}`}
            />

            <meta
              property="og:description"
              content={`${evento.artist} en ${evento.site.split(",")[0]}`}
            />
            <meta property="og:image" content={evento.image} />
          </Helmet>

          <div
            className={`divCardDetEv  ${
              evento.status ? "status " + evento.status : ""
            }`}
          >
            <div className="cardDetEv">
              {shareModal && (
                <Modal
                  show="true"
                  evento={evento}
                  handleShareModal={handleShareModal}
                />
              )}

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
              ) : evento.image && evento.image !== "undefined" ? (
                <div className="image-container">
                  <img
                    className={`${evento.status ? evento.status : ""}`}
                    src={evento.image}
                    alt={evento.title}
                    onClick={openImageModal}
                    onError={(e) => {
                      e.target.style.display = "none"; // Oculta la imagen que no carga
                      e.target.nextSibling.style.display = "block"; // Muestra el div genérico
                    }}
                  />
                  <img
                    src="../../../public/assets/no-image.jpg"
                    style={{ display: "none" }}
                  />
                  <AiOutlineZoomIn
                    className="zoom-icon"
                    onClick={openImageModal}
                  />
                </div>
              ) : (
                <img
                  src="../../../public/assets/no-image.jpg"
                  className="divCardDetEv__noimage"
                ></img>
              )}
              <h2>{evento.artist}</h2>
              <h3>
                <div className="detalles_item">
                  <strong>Lugar: </strong>
                  {evento.site && evento.site !== "Varios" ? (
                    <>
                      <span> {evento.site.split(",")[0]} </span>
                      <MapIcon showMap={showMap} onClick={handleToggleMap} />
                    </>
                  ) : (
                    <>{evento.site.split(",")[0]}</>
                  )}
                </div>
                
                {evento.price == 0 && evento.payWhatYouWant == false ? (
                  <div className="gratuito">GRATUITO</div>
                ) : evento.price > 0 ? (
                  <div className="detalles_item">
                    <div>
                      <strong>Prezo: </strong>
                      {evento.price}
                    </div>
                    {evento.buy_ticket && (
                      <a
                        className="boleto_precio"
                        href={evento.buy_ticket}
                        target="blank"
                      >
                        <AiFillEuroCircle className="favorito compartir-detalle" />
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="gratuito">ENTRADA INVERSA</div>
                )}
              </h3>
              <MapPortal
                location={evento.location}
                isOpen={showMap}
                onClose={handleToggleMap}
              />
              {esHoy(evento.date_start) ? (
                <h3 className="blue-text">
                  <span> HOXE {fechaStart.split(",")[1]}h</span>
                  <span onClick={handleShareModal}>
                    <BsFillShareFill className="favorito compartir-detalle" />{" "}
                  </span>
                </h3>
              ) : (
                <h3>
                  <div className="muestra-fecha">
                    <strong>Data: </strong>
                    <span> {fechaStart}h </span>
                    {user ? (
                      <span onClick={handleFavorites}>
                        {isFavorite ? (
                          <BiSolidHeart className="favorito favorito-detalle" />
                        ) : (
                          <BiHeart className="favorito favorito-detalle" />
                        )}
                      </span>
                    ) : (
                      <span>
                        <BiHeart className="favorito favorito-detalle unavailiable" />
                      </span>
                    )}
                    {showFavorite && (
                      <ToolTip
                        content={
                          isFavorite
                            ? "Favorito engadido"
                            : "Favorito eliminado"
                        }
                        specificClass={"favorito-tooltip__detalle"}
                      />
                    )}
                    <span onClick={handleShareModal}>
                      <BsFillShareFill className="favorito compartir-detalle" />{" "}
                    </span>
                    <p className="dias-faltantes__detalle">
                      {esAnterior(evento.date_start) ? "Fai" : "Dentro de"}{" "}
                      <span className="blue-text">{diasFaltantes} </span>
                    </p>
                  </div>{" "}
                </h3>
              )}
              {fechaEnd && <h3>{fechaEnd}</h3>}

              {evento.genre && (
                <h3>
                  <div>
                    <strong>Xénero:</strong> {evento.genre}
                  </div>
                </h3>
              )}
              <div className="evento_contenido">
                {formattedContent.split("\n").map((sentence, index) => (
                  <p key={index}>{sentence}</p>
                ))}
              </div>

              {evento.url && (
                <div className="margin-boton-info">
                  <Button text="+Info" variant="medium" onClick={comprar} />
                </div>
              )}
              {user?.role === 2 && (
                <div className="evento-botonesAdmin">
                  <Button
                    text="Eliminar"
                    variant="medium"
                    onClick={eliminarEvento}
                  />
                  <Button
                    text="Editar"
                    variant="medium"
                    onClick={editarEvento}
                  />
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="detalle-comentarios">
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
          )}

          <Modal
            show={showImageModal}
            onCancel={closeImageModal}
            imageUrl={evento.image}
          />
        </div>
      )}
    </>
  );
};

export default DetallesEvento;
