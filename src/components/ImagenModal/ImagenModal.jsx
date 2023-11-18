import React from "react";
import Button from "../../components/Button/Button";
import "./ImagenModal.css";
import { AiOutlineZoomOut } from "react-icons/ai";

const ImagenModal = ({ show, onCancel, imageUrl }) => {
  return (
    <>
      {show && (
        <div className="modal-backdrop fade show" style={{ zIndex: "1050" }} />
      )}
      <div
        className={`modal  fade ${show ? "show" : ""}`}
        style={{ display: show ? "flex" : "none" }}
      >
        <div className="image-container">
          <img
            src={imageUrl}
            alt="Imagen a tamaño completo"
            className=" modal-image"
            onClick={onCancel}
          />
         <AiOutlineZoomOut className="zoom-icon zoom-out" onClick={onCancel} /> 
        </div>
      </div>
    </>
  );
};

export default ImagenModal;
