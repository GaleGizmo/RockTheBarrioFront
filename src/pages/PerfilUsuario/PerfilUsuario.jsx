import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUser } from "../../redux/usuarios/usuarios.actions";
import Button from "../../components/Button/Button";
import FormularioEdicionUsuario from "../../components/FormularioEdicionUsuario/FormularioEdicionUsuario";
import "./PerfilUsuario.css";
import Perfil from "../../components/Perfil/Perfil";

const PerfilUsuario = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.usuariosReducer.user);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleDeleteUser=() => {
    dispatch(deleteUser(userData.id,navigate))
  }
  const handleFormSubmit = (data) => {
    dispatch(updateUser(data, navigate));
    setIsEditing(false);
  };

  return (
    <>

      {!isEditing && (
        <div className="cardReg perfil-container">
          <h1>PERFIL DE USUARIO</h1>

          <Perfil userData={userData} onEditClick={handleEditClick} />
          <Button text="Borrar conta" type="medium" onClick={handleDeleteUser}/>
        </div>
      )}
      
      {isEditing && (
        <FormularioEdicionUsuario
          userData={userData}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
};
export default PerfilUsuario;
