import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Perfil.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMensajes,
  sendEventosDiarios,
} from "../../redux/eventos/eventos.actions";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import CorreccionModal from "../CorreccionModal/CorreccionModal";
import { useNavigate } from "react-router-dom";

const Perfil = ({ userData, onEditClick }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCorrecionModal, setShowCorreccionModal] = useState(false);
  const [isSubmitting, setIsSubimitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Limpiar mensajes de éxito y error al desmontar el componente
  useEffect(() => {
    dispatch(clearMensajes());
    return () => {
      dispatch(clearMensajes());
    };
  }, []);

  const handleDeleteUser = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteConfirmed = () => {
    dispatch(deleteUser(userData._id, navigate));
    setShowDeleteModal(false);
  };

  const handleDeleteCancelled = () => {
    setShowDeleteModal(false);
  };
  const { error, successMessage } = useSelector(
    (state) => state.eventosReducer
  );

  const handleCorreccionClick = () => {
    setShowCorreccionModal(true);
  };
  const onCloseModal = () => {
    setShowCorreccionModal(false);
  };

  const sendDiarios = async () => {
    setIsSubimitting(true);
    dispatch(sendEventosDiarios());
  
  };

  useEffect(() => {
    if (isSubmitting && (successMessage || error)) {
      setIsSubimitting(false);
    }
  }, [successMessage, error, isSubmitting]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (successMessage) {
      toast.success(successMessage, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [error, successMessage]);

  return (
    <div>
      <p>
        Email: <span className="perfil__user-data">{userData.email}</span>
      </p>
      <p>
        Usuario: <span className="perfil__user-data">{userData.username}</span>{" "}
      </p>
      {userData.avatar && (
        <div className="perfil-avatar">
          <img className="header_avatar" src={userData.avatar} alt="avatar" />
        </div>
      )}
      <p>
        Email con novos eventos:{" "}
        {userData.newevent ? (
          <span className="perfil__user-data green">Si</span>
        ) : (
          <span className="perfil__user-data red">Non</span>
        )}
      </p>

      <p>
        Email con eventos da semana:{" "}
        {userData.newsletter ? (
          <span className="perfil__user-data green">Si</span>
        ) : (
          <span className="perfil__user-data red">Non</span>
        )}
      </p>
      <div>
        {userData && userData.role === 2 && (
          <div className="botones-eventos">
            <Button text="Crear evento" variant="small" onClick={() => navigate('/crear-evento')} />
            <Button
              text="Mandar diarios"
              variant="small"
              isSubmitting={isSubmitting}
              onClick={sendDiarios}
            />
            <Button
              text="Corrección"
              variant="small"
              onClick={handleCorreccionClick}
            />
          </div>
        )}
      </div>
      <div className="margin-botonReg">
        <Button text="Editar Datos" variant="small" onClick={onEditClick} />
        <Button
          text="Borrar conta"
          variant="small delete-account-button"
          onClick={handleDeleteUser}
        />
      </div>
      <ConfirmModal
        title="Confirmar borrado"
        p1="Seguro que desexas borrar a túa conta?"
        p2="Borraránse tamén todos os comentarios que teñas feito"
        buttonText="Borrar"
        show={showDeleteModal}
        onCancel={handleDeleteCancelled}
        onConfirm={handleDeleteConfirmed}
        deleteAccount={true}
      />
      {showCorrecionModal && (
        <CorreccionModal
          showModal={showCorrecionModal}
          onClose={onCloseModal}
        />
      )}
    </div>
  );
};

export default Perfil;
