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
import { formatDate } from "../../shared/formatDate";
import MapComponent from "../../components/MapComponent/MapComponent";
import MapIcon from "../../components/MapIcon/MapIcon";

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

  const fechaStart = evento?.date_start ? formatDate(evento.date_start) : null;
  const fechaEnd = evento?.date_end ? formatDate(evento.date_end) : null;
  let textoBoton = "";
  if (evento?.price && evento?.price > 0) {
    textoBoton = "Comprar";
  } else {
    textoBoton = "+Info";
  }

  return (
    <div>
      {!evento ? (
        <div className="div-img">
          <img src="/assets/music.gif" style={{ marginTop: '200px' }} alt="Cargando..." />
        </div>
      ) : (
        <>
          <div>
            <div className="divCardDetEv">
              <div className="cardDetEv">
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
                  <h3>
                    <strong>Prezo: </strong>
                    {evento.price} €
                  </h3>
                )}
                <h3>{fechaStart}h</h3>
                {fechaEnd && <h3>{fechaEnd}</h3>}
                {evento.genre && (
                  <h3>
                    <strong>Xénero:</strong> {evento.genre}
                  </h3>
                )}
                <p>{evento.content}</p>
                <div className="margin-boton-info">
                  <Button text={textoBoton} type="medium" onClick={comprar} />
                </div>
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
