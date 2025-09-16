import React, { useEffect } from "react";
import { getComentariosByEvent } from "../../redux/comentarios/comentarios.actions";
import { useSelector } from "react-redux";
import Comentario from "../Comentario/Comentario";

import "./ComentariosList.css";
import Loader from "../Loader/Loader";

const ComentariosList = ({ eventoId, hayUser }) => {
  useEffect(() => {
    getComentariosByEvent(eventoId);
  }, []);

  const { loading, comentarios, escribiendoComentario } = useSelector(
    (reducer) => reducer.comentariosReducer
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`comentarios-container ${hayUser ? "hayUser" : ""} ${
            escribiendoComentario ? "estaEscribiendo" : ""
          }`}
        >
          {comentarios.length ? (
            comentarios.map((comentario) => {
              return (
                <Comentario comentario={comentario} key={comentario._id} />
              );
            })
          ) : (
            <p className="texto-aviso">Aínda non hai comentarios </p>
          )}
        </div>
      )}
    </>
  );
};

export default ComentariosList;
