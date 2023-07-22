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
import { esHoy, formatDate } from "../../shared/formatDate";
import MapComponent from "../../components/MapComponent/MapComponent";
import MapIcon from "../../components/MapIcon/MapIcon";
import { AiFillCloseSquare } from "react-icons/ai";

const DetallesEvento = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, evento } = useSelector((reducer) => reducer.eventosReducer);
  const { user } = useSelector((reducer) => reducer.usuariosReducer);
  const isLongTitle = evento?.title.length > 10 && !evento.title.includes(" ");
  useEffect(() => {
    dispatch(getEventoById(id));
  }, [id]);

  const eliminarEvento = () => {
    dispatch(deleteEvento(evento._id, navigate));
  };
  const editarEvento = () => {
    navigate(`/editar-evento/${evento._id}`);
  };
  const comprar = () => {
    window.location.href = evento.url;
  };
  const [showMap, setShowMap] = useState(false);

  const handleToggleMap = () => {
    setShowMap((showMap) => !showMap);
  };
  const [formattedContent, setFormattedContent] = useState("");
  const goHome = () => {
    navigate("/");
  };
  useEffect(() => {
    if (evento && evento.content) {
      const formattedContent = evento.content.replace(
        /[:.](?!\s*-)|\./g,
        (match) => (match === "." ? ".\n" : ": ")
      );
      setFormattedContent(formattedContent);
    }
  }, [evento]);
  const fechaStart = evento?.date_start ? formatDate(evento.date_start) : null;
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
          <div>
            <div className="divCardDetEv">
              <div className="cardDetEv">
                <AiFillCloseSquare className="close-icon" onClick={goHome} />
                <h1 className={isLongTitle ? "long-title" : ""}>
                  {evento.title}
                </h1>
                {evento.image ? (
                  <img src={evento.image} alt={evento.title} />
                ) : (
                  <img
                    src="https://metropoliabierta.elespanol.com/uploads/s1/36/81/72/audience-band-celebration-1190298_9_1200x480.jpeg"
                    alt="Imagen genérica"
                  />
                )}
                <h2>{evento.subtitle}</h2>
                <h3>
                  <strong>Lugar: </strong>
                  {evento.site && evento.site !== "Varios" ? (
                    <>
                      {evento.site.split(",")[0]}{" "}
                      <MapIcon showMap={showMap} onClick={handleToggleMap} />
                    </>
                  ) : (
                    <>{evento.site.split(",")[0]}</>
                  )}
                </h3>
                {evento.price == 0 ? (
                  <h3 className="gratuitoDetEv">GRATUITO</h3>
                ) : (
                  <div className="detalles_precio">
                    <h3>
                      <strong>Prezo: </strong>
                      {evento.price} €
                    </h3>
                    <a
                      className="boleto_precio"
                      href={evento.buy_ticket}
                      target="blank"
                    >
                      <svg
                        className="boleto_imagen"
                        width="40"
                        height="40"
                        viewBox="0 0 100 100"
                      >
                        <image
                          href="/assets/boleto2.svg"
                          width="100"
                          height="100"
                        />
                       
                      </svg>
                    </a>
                  </div>
                )}
                {esHoy(evento.date_start) ? (
                  <h3 className="gratuitoDetEv ">
                    HOXE <span>{fechaStart.split(",")[2]}h</span>
                  </h3>
                ) : (
                  <div className="muestra-fecha">
                    <h3>{fechaStart}h</h3>

                    {fechaEnd && <span className="fecha-end"> {fechaEnd}</span>}
                  </div>
                )}
                {fechaEnd && <h3>{fechaEnd}</h3>}
                {evento.genre && (
                  <h3>
                    <strong>Xénero:</strong> {evento.genre}
                  </h3>
                )}
                <div>
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
            <div>
              <div>
                <div>
                  {user ? (
                    <NuevoComentario eventoId={evento._id} user={user} />
                  ) : (
                    <p className="texto-aviso">
                      Tes que te rexistrar para poder comentar
                    </p>
                  )}
                </div>
                <div className="divCardDetEv">
                  {evento ? <ComentariosList eventoId={evento._id} /> : null}
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
