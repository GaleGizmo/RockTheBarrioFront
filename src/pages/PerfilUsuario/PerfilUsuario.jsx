import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./PerfilUsuario.css";
import Perfil from "../../components/Perfil/Perfil";
import { logout } from "../../redux/usuarios/usuarios.actions";
import { AiFillCloseSquare } from "react-icons/ai";
import FormularioRegistro from "../../components/FormularioRegistro/FormularioRegistro";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";

const PerfilUsuario = () => {
  const userData = useSelector((state) => state.usuariosReducer.user);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const goHome = () => {
    navigate(-1);
  };

  return (
    <>
      {!isEditing && (
        <div className="cardReg perfil-container">
          <AiFillCloseSquare className="close-icon" onClick={goHome} />
          <h1>{t('profile.title')}</h1>
          <div className="close-session">
            <Button
              variant="small"
              text={t('buttons.closeSession')}
              onClick={logout}
            ></Button>{" "}
          </div>
          <Perfil userData={userData} onEditClick={handleEditClick} />
        </div>
      )}

      {isEditing && <FormularioRegistro userData={userData} isEdit={true} />}
    </>
  );
};
export default PerfilUsuario;
