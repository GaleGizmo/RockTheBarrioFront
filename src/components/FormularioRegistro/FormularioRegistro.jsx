import React, { useState } from "react";
import "./FormularioRegistro.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/usuarios/usuarios.actions";
import Button from "../Button/Button";
import SubirImagen from "../SubirImagen/SubirImagen";
import { AiFillCloseSquare } from "react-icons/ai";

const FormularioRegistro = () => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState();
  const [newsletter, setNewsletter] = useState(false);
  const [newEvent, setNewevent] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { error } = useSelector((state) => state.usuariosReducer);
  const navigate = useNavigate();

  const onSubmit = (datos) => {
    if (datos.password === datos.confirmPassword) {
      datos.newsletter = newsletter;
      datos.newevent = newEvent;
      console.log(datos);
      dispatch(registerUser(datos, navigate));
    } else {
      // Manejar el caso en el que las contraseñas no coinciden
      console.log("Las contraseñas no coinciden");
    }
  };
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const handleIcon = () => {
      navigate(-1);
    };
  return (
    <div className="cardReg">
    <AiFillCloseSquare className="close-icon" onClick={handleIcon} />
      <h1>DATE DE ALTA</h1>
      <p className="error-message">{error}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className="div-inputReg imgReg">
          <label>Avatar</label>
          <SubirImagen
            register={register}
            funcion={(e) =>
              setImageFile(URL.createObjectURL(e.target.files[0]))
            }
          />
          {imageFile && <img className="imagen-formulario avatar" src={imageFile} />}
        </div>

        <div className="margin-botonReg">
          <div className="div-checkReg">
          <div>
            <label>Quero recibir a newsletter semanal</label>
            <input
              className="checkReg"
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
            />
            </div>
            <div>
            <label>Avísame cando se engada un evento</label>
            <input
              className="checkReg"
              type="checkbox"
              checked={newEvent}
              onChange={(e) => setNewevent(e.target.checked)}
            />
            
            </div>
             <div>
            <label>Acepto os {" "}
        <Link to="/terminos">Termos e Condicións</Link></label>
            <input
             {...register("terminos", { required: true })}
              className="checkReg"
              type="checkbox"
              
            /><p>
            {errors.terminos && (
            <span className="error-message">Debes aceptar os Termos e Condicións</span>
          )}</p>
          </div>
             <div>
            <label>Acepto a <Link to="/privacidad" >Política de Privacidade</Link></label>
            <input
             {...register("privacidad", { required: true })}
              className="checkReg"
              type="checkbox"
              
            /><p>
            {errors.privacidad && (
            <span className="error-message">Debes aceptar a Política de Privacidade</span>
          )}</p>
            </div>
          </div>

          <Button text="Rexistrarse" type="large" />
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistro;
