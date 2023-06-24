import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/usuarios/usuarios.actions";
import Button from "../Button/Button";
import SubirImagen from "../SubirImagen/SubirImagen";


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

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    // Rellena el form con los datos del usuario
    setValue("email", userData.email);
    setValue("username", userData.username);
  }, [userData, setValue]);

  const handleFormSubmit = (data) => {
    const editedUser = {
      ...userData,
      ...data,
    };
  
    dispatch(updateUser(editedUser, navigate));
  };

  return (
    <div className="cardReg perfil-container">
      <h1>EDITAR DATOS DE USUARIO</h1>
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
            <span className="error-message">Email es requerido</span>
          )}
        </div>
        <div className="div-inputReg">
          <label className="margin-label">Usuario</label>
          <input
            {...register("username", {
              required: "Usuario es requerido",
              minLength: {
                value: 2,
                message: "Mínimo dos caracteres",
              },
              maxLength: {
                value: 20,
                message: "No más de 20 caracteres",
              },
            })}
            className="inputReg"
          />
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>
        <div className="div-inputReg imgReg">
          <label>Imagen</label>
          <SubirImagen
            register={register}
            funcion={(e) =>
              setImageFile(URL.createObjectURL(e.target.files[0]))
            }
          />
         {userData.avatar && (
            <img
              className="imagen-formulario"
              src={userData.avatar}
              alt="Avatar del usuario"
            />
          )}
          {imageFile && (
            <img
              className="imagen-formulario"
              src={imageFile}
              alt="Avatar del usuario"
            />
          )}
        </div>

        <div className="margin-botonReg">
          <Button text="Guardar cambios" type="large" />
        </div>
      </form>
    </div>
  );
};

export default FormularioEdicionUsuario;
