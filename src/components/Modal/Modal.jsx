import React, { useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setMounted(true);
      const timer = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  let eventoUrl = "";
  let textToShare = "";
  if (evento?.shortURL) {
    eventoUrl = `https://www.rockthebarrio.es/share/${evento.shortURL}`;
    textToShare = `${evento?.artist} en ${evento?.site.split(",")[0]}`;
  }
  return (
    <>
      {mounted && (
        <div className="modal-backdrop fade show" style={{ zIndex: "1050" }} />
      )}
      <div
        className={`modal fade ${visible ? "show" : ""}`}
        style={{ display: mounted ? "flex" : "none" }}
      >
        {showLoader && <Loader />}
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
            <WhatsappShareButton url={eventoUrl} title={textToShare}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <FacebookShareButton url={eventoUrl} title={textToShare}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={eventoUrl} title={textToShare}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <TelegramShareButton url={eventoUrl} title={textToShare}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>

            <EmailShareButton
              url={eventoUrl}
              body="Mira este evento: "
              subject={textToShare}
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
