import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/usuarios/usuarios.actions";
import Button from "../../components/Button/Button";
import "./RecuperarPassword.css"

const RecuperarPassword = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const { error, successMessage } = useSelector(
    (state) => state.usuariosReducer
  );

  const handleForgotPassword = async (data) => {
    dispatch(forgotPassword(data.email));
  };

  return (
    <div className="cardLogin recuperar">
      <div>
        <h1>Recuperar Contrasinal</h1>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
      <form onSubmit={handleSubmit(handleForgotPassword)}>
        <div className="div-inputLogin">
          <label>
            <input
              {...register("email")}
              type="email"
              placeholder="Correo electrónico"
              className="inputLogin"
            />
          </label>
        </div>
        <div className="margin-botonLogin">
          <Button text="Enviar Correo" type="large" />
        </div>
      </form>
    </div>
  );
};

export default RecuperarPassword;
