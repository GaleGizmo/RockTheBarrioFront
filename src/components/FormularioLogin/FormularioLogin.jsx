import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./FormularioLogin.css";
import { login, clearError } from "../../redux/usuarios/usuarios.actions";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";

const FormularioLogin = () => {
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(clearError())
  },[])
  const { register, handleSubmit } = useForm();

  const { error, user } = useSelector((state) => state.usuariosReducer);
  
  const navigate = useNavigate();

  const onSubmit =  (datos) => {
    dispatch(login(datos, navigate));
    
  };
  
  
  return (
    <div className="cardLogin">
    <AiFillCloseSquare className="close-icon" onClick={() => navigate(-1)} />
      <div>
        <h1>Iniciar Sesión</h1>
        {error && <p className="error-message">{error}</p>}
        
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="div-inputLogin">
          <label>
            <input
              {...register("username")}
              placeholder="Usuario ou email"
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
          <Link to="/reset-password/forgot">Esquezín o contrasinal</Link>
        </div>
        <div>
          <p>Aínda non tes conta?  <Link to="/date-de-alta"> <Button text="Rexístrate" type="small"/> </Link></p>
        </div>
      </form>
    </div>
  );
};

export default FormularioLogin;
