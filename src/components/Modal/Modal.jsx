import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import "./Modal.css";
import { AiFillCloseSquare, AiOutlineZoomOut } from "react-icons/ai";
import Loader from "../Loader/Loader";

const Modal = ({
  show,
  showLoader,
  onCancel,
  imageUrl,
  evento,
  handleShareModal,
}) => {
  let eventoUrl = "";
  if (evento)
    eventoUrl = `https://rock-the-barrio-front-one.vercel.app/${evento._id}`;
  return (
    <>
      {show && (
        <div className="modal-backdrop fade show" style={{ zIndex: "1050" }} />
      )}
      <div
        className={`modal  fade ${show ? "show" : ""}`}
        style={{ display: show ? "flex" : "none" }}
      >
      {showLoader && (
        <Loader/>
      )}
        {imageUrl && (
          <div className="image-container">
            <img
              src={imageUrl}
              alt="Imagen a tamaño completo"
              className=" modal-image"
              onClick={onCancel}
            />
            <AiOutlineZoomOut
              className="zoom-icon zoom-out"
              onClick={onCancel}
            />
          </div>
        )}
        {evento && (
          <div className="rrss-container">
            <AiFillCloseSquare
              className="close-icon"
              onClick={handleShareModal}
            />
            <p>Comparte este evento cos teus amigos</p>
            <WhatsappShareButton url={eventoUrl} title={evento.title}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <FacebookShareButton url={eventoUrl} title={evento.title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={eventoUrl} title={evento.title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <TelegramShareButton url={eventoUrl} title={evento.title}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>

            <EmailShareButton
              url={eventoUrl}
              body="Mira este evento: "
              subject={evento.title}
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
