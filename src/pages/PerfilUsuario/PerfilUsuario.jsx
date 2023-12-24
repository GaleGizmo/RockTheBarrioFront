import React, { useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./PerfilUsuario.css";
import Perfil from "../../components/Perfil/Perfil";
import { AiFillCloseSquare } from "react-icons/ai";
import FormularioRegistro from "../../components/FormularioRegistro/FormularioRegistro";

const PerfilUsuario = () => {
 
  const userData = useSelector((state) => state.usuariosReducer.user);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  

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
          <h1>PERFIL DE USUARIO</h1>

          <Perfil userData={userData} onEditClick={handleEditClick} />
          
        </div>
      )}

      {isEditing && (
        <FormularioRegistro
          userData={userData}
          isEdit={true}
        />
      )}
     
    </>
  );
};
export default PerfilUsuario;
