import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUser } from "../../redux/usuarios/usuarios.actions";
import Button from "../../components/Button/Button";
import FormularioEdicionUsuario from "../../components/FormularioEdicionUsuario/FormularioEdicionUsuario";
import "./PerfilUsuario.css";
import Perfil from "../../components/Perfil/Perfil";
import  {AiFillCloseSquare } from "react-icons/ai";

const PerfilUsuario = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.usuariosReducer.user);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleDeleteUser=() => {
    dispatch(deleteUser(userData._id,navigate))
  }
  const handleFormSubmit = (data) => {
    dispatch(updateUser(data, navigate));
    setIsEditing(false);
  };
  const goHome=()=>{
    navigate ("/")
  }

  return (
    <>

      {!isEditing && (
        <div className="cardReg perfil-container">
        <AiFillCloseSquare className="close-icon" onClick={goHome}/>
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
