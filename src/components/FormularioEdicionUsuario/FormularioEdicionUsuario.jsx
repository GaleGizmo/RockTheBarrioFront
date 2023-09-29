import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/usuarios/usuarios.actions";
import Button from "../Button/Button";
import SubirImagen from "../SubirImagen/SubirImagen";
import "./FormularioEdicionUsuario.css";

import DropzoneComponent from "../Dropzone/Dropzone";


const FormularioEdicionUsuario = ({ userData }) => {
  const [mostrarSubirImagen, setMostrarSubirImagen] = useState(false);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(userData.avatar);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const mostrarSubirImagenHandler = () => {
    setMostrarSubirImagen(true);
  };

  const removeAvatar = () => {
    setImageFile(null);
  };

  const handleImageSelection = (e) => {
    setImageFile(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0])
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { error } = useSelector((state) => state.usuariosReducer);
  const navigate = useNavigate();

  useEffect(() => {
    setValue("email", userData.email);
    setValue("username", userData.username);
    setValue("newevent", userData.newevent);
    setValue("newsletter", userData.newsletter);
  }, [userData, setValue]);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleFormSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }
    formData.delete('image')
    console.log(Array.from(formData.entries()));
    dispatch(updateUser(formData, userData._id, navigate));
  };

  return (
    <div className="cardReg perfil-container">
   
      <h1>EDITAR DATOS DO USUARIO</h1>
      <p className="error-message">{error}</p>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="div-inputReg">
          <label className="margin-label">E-mail</label>
          <input
            {...register("email", { required: true })}
            type="email"
            name="email"
            id="email"
            className="inputReg"
          />
          {errors.email && (
            <span className="error-message">Email é requerido</span>
          )}
        </div>
        <div className="div-inputReg">
          <label className="margin-label">Usuario</label>
          <input
            {...register("username", {
              required: "Usuario é requerido",
              minLength: {
                value: 2,
                message: "Mínimo dous caracteres",
              },
              maxLength: {
                value: 20,
                message: "Non máis de 20 caracteres",
              },
            })}
            className="inputReg"
          />
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>
        <div className="div-inputReg">
          <label className="margin-label">Notifica novo evento</label>
          <input
            {...register("newevent")}
            type="checkbox"
            name="newevent"
            id="newevent"
            className="inputReg"
          />
        </div>
        <div className="div-inputReg">
          <label className="margin-label">Manda eventos da semana</label>
          <input
            {...register("newsletter")}
            type="checkbox"
            name="newsletter"
            id="newsletter"
            className="inputReg"
          />
        </div>
        {imageFile ? (
          <div className="div-inputReg imagenReg">
            
            <Button text="Eliminar avatar" type="small" onClick={removeAvatar}/>
            {mostrarSubirImagen && (
              <SubirImagen register={register} funcion={handleImageSelection} />
            )}

            <label htmlFor="file-input" className="imagen-avatar-label">
              <img
                className="imagen-avatar"
                src={imageFile}
                alt="Avatar do usuario"
                onClick={() => {
                  mostrarSubirImagenHandler();
                }}
              />
            </label>
          </div>
        ) : (
          <DropzoneComponent setImageFile={setImageFile} setSelectedFile={setSelectedFile}/>
        )}

        <div className="botones-edicion-usuario">
          <Button text="Cancelar" type="medium" onClick={handleCancel} />
          <Button
            text="Gardar"
            type="medium"
            onClick={handleSubmit(handleFormSubmit)}
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioEdicionUsuario;
