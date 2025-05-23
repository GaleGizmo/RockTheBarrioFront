import React from "react";
import Button from "../../components/Button/Button";
import "./ConfirmModal.css";

const ConfirmModal = ({ show, onCancel, onConfirm, title, p1, p2,buttonText, deleteAccount }) => {
  let buttonClass=""
  deleteAccount ? buttonClass="medium delete-account-button":buttonClass="medium"
  return (
    <>
      {show && (
        <div className="modal-backdrop fade show" style={{ zIndex: "1050" }} />
      )}
      <div
        className={`modal  fade ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content estilo-modal">
            <div className="modal-header custom-header" >
              <h5 className="modal-title" >{title}</h5>
             
            </div>
            <div className="modal-body text-center">
             <p> {p1}</p>
             <p> {p2}</p>
            </div>
            <div className="modal-footer justify-content-center">
              {onCancel && <Button text="Cancelar" variant="medium" onClick={onCancel} />}
              <Button text={buttonText} variant={buttonClass} onClick={onConfirm} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
