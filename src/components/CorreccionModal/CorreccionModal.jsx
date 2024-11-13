// src/components/MessageSender.js
import React, { useState } from "react";
import "./CorreccionModal.css";

import { sendCorreccion } from "../../shared/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

const CorreccionModal = ({ showModal, onClose }) => {
  const [eventoId, setEventoId] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [messageForToast, setMessageForToast] = useState(null);

  // Maneja el envío del formulario
  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
   

    try {
      const response = await sendCorreccion({ eventoId, asunto, mensaje });
      setMessageForToast(response.message);
      setEventoId("");
      setAsunto("");
      setMensaje("");
     
    } catch (err) {
      setError("Error al enviar el mensaje. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (messageForToast) {
      toast.info(messageForToast, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setMessageForToast(null);
    }
  }, [messageForToast]);
  return (
    <>
      {showModal && (
        <div className="correccion-modal-container">
          <h3>Enviar Corrección de Evento</h3>
          <form onSubmit={handleSend}>
            <div>
              <label htmlFor="eventoId">EventoId: </label>
              <input
                className="inputCrearEvento"
                type="text"
                id="eventoId"
                value={eventoId}
                onChange={(e) => setEventoId(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="subject">Asunto: </label>
              <input
                className="inputCrearEvento"
                type="text"
                id="subject"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="message">Texto de la Corrección: </label>
              <textarea
                className="inputCrearEvento"
                id="message"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="botones-edicion-usuario">
              <button className="boton small" type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar Mensaje"}
              </button>
              <button className="boton small" type="button" onClick={onClose}>
                Cancelar
              </button>{" "}
            </div>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
         
        </div>
      )}
    </>
  );
};

export default CorreccionModal;
