import React, { useEffect, useState } from "react";
import "./FormularioRegistro.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearError,
  registerUser,
  updateUser,
} from "../../redux/usuarios/usuarios.actions";
import Button from "../Button/Button";
import SubirImagen from "../SubirImagen/SubirImagen";
import { AiFillCloseSquare } from "react-icons/ai";
import DropzoneComponent from "../Dropzone/Dropzone";

const FormularioRegistro = ({ userData, isEdit }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearError());
  }, []);
  const [mostrarSubirImagen, setMostrarSubirImagen] = useState(false);

  const [imageFile, setImageFile] = useState(isEdit ? userData.avatar:null);
  const [selectedFile, setSelectedFile] = useState(null);
  // const [newsletter, setNewsletter] = useState(true);
  // const [newEvent, setNewevent] = useState(false);

  const mostrarSubirImagenHandler = () => {
    setMostrarSubirImagen(true);
  };
  const removeAvatar = () => {
    setImageFile(null);
  };
  useEffect(() => {
    if (isEdit) {
      setValue("email", userData.email);
      setValue("username", userData.username);
      setValue("newevent", userData.newevent);
      setValue("newsletter", userData.newsletter);
    } else {
      setValue("newsletter", true);
      setValue("newevent", false);
    }
  }, [userData, isEdit]);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const { error } = useSelector((state) => state.usuariosReducer);
  const navigate = useNavigate();

  const handleImageSelection = (e) => {
    setImageFile(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0]);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }
    formData.delete("image");
    console.log(Array.from(formData.entries()));
    if (isEdit){ dispatch(updateUser(formData, userData._id, navigate));}
    else 
   { dispatch(registerUser(formData, navigate));}
  };
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handleIcon = () => {
    navigate(-1);
  };
  return (
    <div className={`cardReg ${isEdit ? 'isEdit' : ''}`}>

      <AiFillCloseSquare className="close-icon" onClick={handleIcon} />
      {isEdit ? <h1>EDITAR USUARIO</h1> : <h1> DATE DE ALTA </h1>}
      <p className="error-message">{error}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="div-inputReg">
          <label className="margin-label">E-mail</label>
          <input
            {...register("email", {
              required: "Email é requerido",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Formato de email incorrecto",
              },
            })}
            type="email"
            name="email"
            id="email"
            className="inputReg"
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
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
        {!isEdit && (
          <>
            <div className="div-inputReg">
              <label className="margin-labelReg">Contrasinal</label>
              <input
                {...register("password", { required: true })}
                type="password"
                className="inputReg"
              />
              {errors.password && (
                <span className="error-message">Contrasinal é requerido</span>
              )}
            </div>
            <div className="div-inputReg">
              <label className="margin-labelReg">Confirma Contrasinal</label>
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === getValues("password") ||
                    "Os contrasinais non coinciden",
                })}
                type="password"
                className="inputReg"
              />
              {errors.confirmPassword && (
                <span className="error-message">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </>
        )}
        <div className="div-inputReg">
          <label>Email cos eventos da semana</label>
          <input
            {...register("newsletter")}
            className="checkReg"
            name="newsletter"
            type="checkbox"
            
            defaultChecked={isEdit ? userData.newsletter : true}
          />
        </div>
        <div className="div-inputReg">
          <label>Email con novos eventos engadidos</label>
          <input
            {...register("newevent")}
            className="checkReg"
            type="checkbox"
           name="newevent"
            defaultChecked={isEdit ? userData.newevent : false}
          />
        </div>
        {imageFile ? (
          <div className="div-inputReg imagenReg">
            <Button
              text="Eliminar avatar"
              type="small"
              onClick={removeAvatar}
            />
            {mostrarSubirImagen && (
              <SubirImagen register={register} funcion={handleImageSelection} />
            )}

            <label htmlFor="file-input" >
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
          <DropzoneComponent
            setImageFile={setImageFile}
            setSelectedFile={setSelectedFile}
          />
        )}

        <div className="margin-botonReg">
         {!isEdit && <div className="div-checkReg">
            <div>
              <label>
                Acepto os <Link to="/terminos">Termos e Condicións</Link>
              </label>
              <input
                {...register("terminos", { required: true })}
                className="checkReg"
                type="checkbox"
              />
              <p>
                {errors.terminos && (
                  <span className="error-message">
                    Debes aceptar os Termos e Condicións
                  </span>
                )}
              </p>
            </div>
            <div>
              <label>
                Acepto a <Link to="/privacidad">Política de Privacidade</Link>
              </label>
              <input
                {...register("privacidad", { required: true })}
                className="checkReg"
                type="checkbox"
              />
              <p>
                {errors.privacidad && (
                  <span className="error-message">
                    Debes aceptar a Política de Privacidade
                  </span>
                )}
              </p>
            </div>
          </div>}
          <div className="botones-edicion-usuario"><Button text="Cancelar" type="medium" onClick={handleCancel} />
          <Button text={isEdit ? "Gardar" : "Rexistrarse"} type="medium" /> </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistro;
