import React from "react";
import Button from "../../components/Button/Button";
import "./ConfirmModal.css";

const ConfirmModal = ({ show, onCancel, onConfirm }) => {
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
            <div className="modal-header ">
              <h5 className="modal-title">Confirmar Borrado</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onCancel}
              >
                {/* <span aria-hidden="true">&times;</span> */}
              </button>
            </div>
            <div className="modal-body text-center">
             <p> Seguro que desexas borrar a túa conta?</p>
             <p> Borraránse tamén todos os comentarios que teñas feito</p>
            </div>
            <div className="modal-footer justify-content-center">
              <Button text="Cancelar" type="medium" onClick={onCancel} />
              <Button text="Borrar" type="medium" onClick={onConfirm} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
