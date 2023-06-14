import React, { useEffect } from "react";
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

const DetallesEvento = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, evento } = useSelector((reducer) => reducer.eventosReducer);
  const { user } = useSelector((reducer) => reducer.usuariosReducer);

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
  console.log(user);
  console.log(evento);
 
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
          <img src="/assets/music.gif" />
        </div>
      ):
      (
        <>
          <div>
            <div className="divCardDetEv">
              <div className="cardDetEv">
                <h1>{evento.title}</h1>
                {evento.image && <img src={evento.image} />}
                <h2>{evento.subtitle}</h2>
                <h3>Lugar: {evento.site}</h3>
                {evento.price == 0 ? (
                  <h3>GRATUITO</h3>
                ) : (
                  <h3>Precio: {evento.price} €</h3>
                )}
                <h3>{fechaStart}h</h3>
                {fechaEnd && <h3>{fechaEnd}</h3>}
                {evento.genre && <h3>Género: {evento.genre}</h3>}
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
              </div>
            </div>
            <div>
              <div>
                <div>
                  {user ? (
                    <NuevoComentario eventoId={evento._id} user={user} />
                  ) : (
                    <p className="texto-aviso">
                      Debes registrarte para poder comentar
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
  )
};

export default DetallesEvento;
