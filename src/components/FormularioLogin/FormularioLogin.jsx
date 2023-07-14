import React from "react";
import { useForm } from "react-hook-form";
import "./FormularioLogin.css";
import { login } from "../../redux/usuarios/usuarios.actions";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

const FormularioLogin = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const { error } = useSelector((state) => state.usuariosReducer);
  
  const navigate = useNavigate();

  return (
    <div className="cardLogin">
      <div>
        <h1>Iniciar Sesión</h1>
        {error && <p className="error-message">{error}</p>}
        
      </div>
      <form
        onSubmit={handleSubmit((datos) => dispatch(login(datos, navigate)))}
      >
        <div className="div-inputLogin">
          <label>
            <input
              {...register("username")}
              placeholder="Usuario"
              className="inputLogin"
            />
          </label>
        </div>
        <div className="div-inputLogin">
          <label>
            <input
              {...register("password")}
              type="password"
              placeholder="Contrasinal"
              className="inputLogin"
            />
          </label>
        </div>
        <div className="margin-botonLogin">
          <Button text="Login" type="large" />
        </div>
        <div className="margin-link">
          <Link to="/reset-password/init">Esquezín o contrasinal</Link>
        </div>
      </form>
    </div>
  );
};

export default FormularioLogin;
