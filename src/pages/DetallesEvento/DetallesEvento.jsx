import { useEffect, useState } from "react";
import formatContent from "../../utils/formatContent.jsx";
import { useLocation } from "react-router-dom";
import "./DetallesEvento.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvento,
  getEventoById,
  getEventoByIdSilent,
} from "../../redux/eventos/eventos.actions";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import Button from "../../components/Button/Button";
import {
  esAnterior,
  esHoy,
  formatDate,
  formatearFechaEvento,
  calcularDiasFaltantes,
} from "../../shared/formatDate";
import MapPortal from "../../components/MapPortal/MapPortal";
import MapIcon from "../../components/MapIcon/MapIcon";
import {
  AiFillCloseSquare,
  AiFillEuroCircle,
  AiOutlineZoomIn,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import useFavorites from "../../shared/useFavorites";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet";
import { BsFillShareFill } from "react-icons/bs";
import ToolTip from "../../components/ToolTip/ToolTip";
import { toast } from "react-toastify";
import { isLongTitle } from "../../utils/textUtils";
import { handleImageError } from "../../utils/imageHelpers";
import { goToHome } from "../../utils/navigationHelpers";
import { useTranslation } from "react-i18next";
import { getLocalizedField } from "../../utils/localizedFields";

const DetallesEvento = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { successMessage } = useSelector((state) => state.eventosReducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [shareModal, setShareModal] = useState(false);
  const { loading, evento, eventos, eventosFiltrados } = useSelector(
    (reducer) => reducer.eventosReducer,
  );
  useEffect(() => {
    if (!evento || (evento._id !== id && evento.shortURL !== id)) {
      // Intentar resolver desde Redux primero
      const enRedux = [...eventosFiltrados, ...eventos].find(
        (e) => e._id === id || e.shortURL === id,
      );
      if (enRedux) {
        dispatch({ type: "GET_EVENTO", contenido: enRedux });
        dispatch(getEventoByIdSilent(id));
      } else {
        dispatch(getEventoById(id));
      }
    }
  }, [dispatch, id]);
  const handleShareModal = () => {
    setShareModal(!shareModal);
  };
  const { user } = useSelector((reducer) => reducer.usuariosReducer);
  const { isFavorite, handleFavorites, showFavorite } = useFavorites(
    user?.favorites?.includes(evento?._id) || false,
    evento ? evento._id : null,
    user ? user._id : null,
  );
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [evento?._id]);

  const SVG_FALLBACK = "/assets/rockthebarrio_pegata_azul.svg";

  const openImageModal = () => {
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const eliminarEvento = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteConfirmed = () => {
    dispatch(deleteEvento(evento._id, navigate));
  };
  const editarEvento = () => {
    navigate(`/editar-evento/${evento._id}`);
  };
  const comprar = () => {
    window.open(evento.url, "_blank");
  };
  const [showMap, setShowMap] = useState(false);

  const listaNavegacion =
    eventosFiltrados.length > 0 ? eventosFiltrados : eventos;
  const indexActual = listaNavegacion.findIndex((e) => e._id === evento?._id);
  const eventoPrevio =
    indexActual > 0 ? listaNavegacion[indexActual - 1] : null;
  const eventoSiguiente =
    indexActual < listaNavegacion.length - 1
      ? listaNavegacion[indexActual + 1]
      : null;
  const navegarA = (ev) => navigate(`/${ev.shortURL || ev._id}`);

  const handleToggleMap = () => {
    setShowMap((showMap) => !showMap);
  };

  // Usar funciones de utils
  const diasFaltantes = evento?.date_start
    ? calcularDiasFaltantes(evento.date_start, i18n.language)
    : null;
  const fechaStart = evento?.date_start
    ? formatearFechaEvento(evento.date_start, i18n.language)
    : null;
  const fechaEnd = evento?.date_end
    ? formatDate(evento.date_end, i18n.language)
    : null;
  const statusLabelMap = {
    soldout: t("forms.statusOptions.soldout"),
    delayed: t("forms.statusOptions.delayed"),
    cancelled: t("forms.statusOptions.cancelled"),
    new_date: t("forms.statusOptions.newDate"),
  };
  const statusLabel = statusLabelMap[evento?.status] || "";
  const localizedTitle = getLocalizedField(evento?.title, i18n.language);
  const localizedContent = getLocalizedField(evento?.content, i18n.language);

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
      <ConfirmModal
        show={showDeleteModal}
        title={t("detalles.deleteTitle")}
        p1={t("detalles.deleteQuestion", { title: localizedTitle })}
        p2={t("detalles.deleteWarning")}
        buttonText={t("buttons.eliminate")}
        deleteAccount={true}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirmed}
      />
      {loading ? (
        <Loader />
      ) : !evento ? (
        <div>{t("events.noEvent")}</div>
      ) : (
        <div className="detalles-container">
          {location.state?.fromCreate && successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <Helmet>
            <title>{`${localizedTitle} | Concierto en Santiago de Compostela`}</title>
            <meta
              name="description"
              content={`${evento.artist} en ${evento.site.split(",")[0]}. Concierto en Santiago de Compostela.`}
            />
            <link
              rel="canonical"
              href={`https://rockthebarrio.es/${evento.shortURL || evento._id}`}
            />

            {/* Open Graph */}
            <meta property="og:type" content="event" />
            <meta property="og:title" content={localizedTitle} />
            <meta
              property="og:description"
              content={`${evento.artist} en ${evento.site.split(",")[0]}`}
            />
            <meta property="og:image" content={evento.image} />
            <meta
              property="og:url"
              content={`https://rockthebarrio.es/${evento.shortURL || evento._id}`}
            />

            {/* Schema.org JSON-LD para eventos musicales */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "MusicEvent",
                name: localizedTitle,
                performer: {
                  "@type": "MusicGroup",
                  name: evento.artist,
                },
                startDate: evento.date_start,
                location: {
                  "@type": "Place",
                  name: evento.site?.split(",")[0] || "Santiago de Compostela",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Santiago de Compostela",
                    addressRegion: "Galicia",
                    addressCountry: "ES",
                  },
                },
                image: evento.image,
                url: `https://rockthebarrio.es/${evento.shortURL || evento._id}`,
                offers: evento.price
                  ? {
                      "@type": "Offer",
                      price: evento.price,
                      priceCurrency: "EUR",
                      availability: "https://schema.org/InStock",
                      url:
                        evento.url ||
                        `https://rockthebarrio.es/${evento.shortURL || evento._id}`,
                    }
                  : undefined,
                description: `${evento.artist} en concierto en ${evento.site?.split(",")[0] || "Santiago de Compostela"}`,
              })}
            </script>
          </Helmet>

          <div
            className={`divCardDetEv  ${
              evento.status ? "status " + evento.status : ""
            }`}
            data-status-label={statusLabel}
          >
            <div className="cardDetEv">
              {eventoPrevio && (
                <button
                  className="nav-arrow nav-arrow--left"
                  onClick={() => navegarA(eventoPrevio)}
                  title={getLocalizedField(eventoPrevio?.title, i18n.language)}
                >
                  <AiOutlineLeft />
                </button>
              )}
              {eventoSiguiente && (
                <button
                  className="nav-arrow nav-arrow--right"
                  onClick={() => navegarA(eventoSiguiente)}
                  title={getLocalizedField(eventoSiguiente?.title, i18n.language)}
                >
                  <AiOutlineRight />
                </button>
              )}
              {shareModal && (
                <Modal
                  show="true"
                  evento={evento}
                  handleShareModal={handleShareModal}
                />
              )}

              <AiFillCloseSquare
                className="close-icon"
                onClick={() => goToHome(navigate)}
              />
              <h1 className={isLongTitle(localizedTitle) ? "long-title" : ""}>
                {localizedTitle}
              </h1>
              <div className="image-and-details-container">
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
                      key={evento._id}
                      className={`${evento.status ? evento.status : ""}`}
                      src={evento.image}
                      alt={localizedTitle}
                      onClick={openImageModal}
                      onError={(e) => {
                        handleImageError(e);
                        setImageFailed(true);
                      }}
                    />
                    <img
                      src={SVG_FALLBACK}
                      style={{
                        display: imageFailed ? "block" : "none",
                        cursor: "zoom-in",
                      }}
                      onClick={openImageModal}
                    />
                    <AiOutlineZoomIn
                      className="zoom-icon"
                      onClick={openImageModal}
                    />
                  </div>
                ) : (
                  <div className="divCardDetEv__noimage"></div>
                )}
                <div className="detalles-info">
                  <h2>{evento.artist}</h2>
                  <h3>
                    <div className="detalles_item">
                      <strong>{t("detalles.place")} </strong>
                      {evento.site && (
                        <>
                          <span> {evento.site} </span>
                          {evento.site !== "Varios" && (
                            <MapIcon
                              showMap={showMap}
                              onClick={handleToggleMap}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </h3>
                  <h3>
                    {evento.price == 0 && evento.payWhatYouWant == false ? (
                      <div className="gratuito">{t("events.free")}</div>
                    ) : evento.price > 0 ? (
                      <div className="detalles_item">
                        <div>
                          <strong>{t("detalles.price")} </strong>
                          {evento.price} {!evento.buy_ticket ? "€" : ""}
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
                      <div className="gratuito">
                        {t("events.payWhatYouWant")}
                      </div>
                    )}
                  </h3>
                  <MapPortal
                    location={evento.location}
                    isOpen={showMap}
                    onClose={handleToggleMap}
                  />
                  {esHoy(evento.date_start) ? (
                    <h3 className="blue-text">
                      <span>
                        {" "}
                        {t("events.today")} {fechaStart.split(",")[1]}h
                      </span>
                    </h3>
                  ) : (
                    <h3>
                      <div className="muestra-fecha">
                        <strong>{t("detalles.date")} </strong>
                        <span> {fechaStart}h </span>

                        <p className="dias-faltantes__detalle">
                          {esAnterior(evento.date_start)
                            ? t("detalles.ago")
                            : t("detalles.in")}{" "}
                          <span className="blue-text">{diasFaltantes} </span>
                        </p>
                      </div>{" "}
                    </h3>
                  )}
                  {fechaEnd && <h3>{fechaEnd}</h3>}

                  {evento.genre && (
                    <h3>
                      <div className="detalles_item">
                        <strong>{t("detalles.genre")}</strong> {evento.genre}
                      </div>
                    </h3>
                  )}
                  <h3>
                    <div className="detail-icons-container">
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
                              ? t("detalles.favoriteAdded")
                              : t("detalles.favoriteRemoved")
                          }
                          specificClass={"favorito-tooltip__detalle"}
                        />
                      )}
                      <span onClick={handleShareModal}>
                        <BsFillShareFill className="favorito compartir-detalle" />{" "}
                      </span>
                    </div>
                  </h3>
                </div>
              </div>
              <div className="evento_contenido">
                {formatContent(localizedContent)}
              </div>

              {evento.url && (
                <div className="margin-boton-info">
                  <Button
                    text={t("buttons.moreInfo")}
                    variant="medium"
                    onClick={comprar}
                  />
                </div>
              )}
              {user?.role === 2 && (
                <div className="evento-botonesAdmin">
                  <Button
                    text={t("buttons.eliminate")}
                    variant="medium delete-evento-button"
                    onClick={eliminarEvento}
                  />
                  <Button
                    text={t("buttons.editEvent")}
                    variant="medium"
                    onClick={editarEvento}
                  />
                </div>
              )}
            </div>
          </div>

          <Modal
            show={showImageModal}
            onCancel={closeImageModal}
            imageUrl={imageFailed ? SVG_FALLBACK : evento.image}
          />
        </div>
      )}
    </>
  );
};

export default DetallesEvento;
