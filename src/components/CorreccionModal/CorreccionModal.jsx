// src/components/MessageSender.js
import React, { useState } from "react";
import "./CorreccionModal.css";
import { sendCorreccion } from "../../shared/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const CorreccionModal = ({ showModal, onClose }) => {
  const { t } = useTranslation();
  const [eventoId, setEventoId] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [messageForToast, setMessageForToast] = useState(null);

  // Maneja el envío del formulario
  const handleSend = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await sendCorreccion({ eventoId, asunto, mensaje });
      setMessageForToast(response.message);
      setEventoId("");
      setAsunto("");
      setMensaje("");
    } catch (err) {
      setSubmitting(false);
      setError(t('correccion.error'));
    } finally {
      setSubmitting(false);
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
      setTimeout(() => {
        setMessageForToast(null);
      }, 3000);
    }
  }, [messageForToast]);
  return (
    <>
      {showModal && (
        <div className="correccion-modal-container">
          <h3>{t('correccion.title')}</h3>
          <form onSubmit={handleSend}>
            <div>
              <label htmlFor="eventoId">{t('correccion.eventoId')} </label>
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
              <label htmlFor="subject">{t('correccion.subject')} </label>
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
              <label htmlFor="message">{t('correccion.messageLabel')} </label>
              <textarea
                className="inputCrearEvento"
                id="message"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="botones-edicion-usuario">
              <button className="boton small" type="submit" disabled={submitting}>
                {submitting ? t('buttons.sending') : t('correccion.send')}
              </button>
              <button className="boton small" type="button" onClick={onClose}>
                {t('buttons.cancel')}
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
