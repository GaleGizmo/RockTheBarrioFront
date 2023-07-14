import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/usuarios/usuarios.actions";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";


const ResetearPassword = ({ token }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setError } = useForm();
  const { error } = useSelector((state) => state.usuariosReducer);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate=useNavigate();

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError("confirmPassword", { message: "Os contrasinais non coinciden" });
      return;
    }

    setIsSubmitting(true);
    dispatch(resetPassword(token, password, navigate));
    setIsSubmitting(false);
  };

  return (
    <div className="cardLogin recuperar">
      <h1>Restablecer Contrasinal</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="div-inputLogin">
          <label>
            Novo Contrasinal
            <input className="inputLogin"{...register("password", { required: true })} type="password" />
          </label>
        </div>
        <div className="div-inputLogin">
          <label>
            Confirmar Contrasinal
            <input className="inputLogin"{...register("confirmPassword", { required: true })} type="password" />
          </label>
          {watch("password") !== watch("confirmPassword") && (
            <p className="error-message">Os contrasinais non coinciden</p>
          )}
        </div>
        <div className="margin-botonLogin">
          <Button type="large" text="Restablecer" disabled={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default ResetearPassword;
