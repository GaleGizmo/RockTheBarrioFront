import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/usuarios/usuarios.actions";
import Button from "../Button/Button";
import SubirImagen from "../SubirImagen/SubirImagen";
import "./FormularioEdicionUsuario.css"


const FormularioEdicionUsuario = ({ userData }) => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState();

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
    setValue("newsletter", userData.newsletter)
  }, [userData, setValue]);

const handleCancel=(e)=>{
  e.preventDefault()
    navigate("/")
}
  const handleFormSubmit = (data) => {
    
    const editedUser = {
      ...userData,
      ...data,
    };
  
    dispatch(updateUser(editedUser, navigate));
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
        <div className="div-inputReg imgReg">
          <label>Imaxe</label>
          <SubirImagen
            register={register}
            funcion={(e) =>
              setImageFile(URL.createObjectURL(e.target.files[0]))
            }
          />
         {userData.avatar && (
            <img
              className="imagen-avatar"
              src={userData.avatar}
              alt="Avatar do usuario"
            />
          )}
          {imageFile && (
            <img
              className="imagen-avatar"
              src={imageFile}
              alt="Avatar do usuario"
            />
          )}
        </div>

        <div className="botones-edicion-usuario">
        <Button text="Cancelar" type="medium" onClick={handleCancel}/>
          <Button text="Gardar" type="medium" onClick={handleSubmit(handleFormSubmit)} />
        </div>
      </form>
    </div>
  );
};

export default FormularioEdicionUsuario;
