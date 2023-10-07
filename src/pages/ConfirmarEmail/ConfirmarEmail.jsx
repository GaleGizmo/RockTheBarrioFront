import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword, unsubscribeEmail } from "../../redux/usuarios/usuarios.actions";
import Button from "../../components/Button/Button";
import "./ConfirmarEmail.css";
import { useNavigate } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";

const ConfirmarEmail = ({ token }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    
    dispatch(clearError());
  }, []);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const { user } = useSelector((reducer) => reducer.usuariosReducer);
  const { error, successMessage } = useSelector(
    (state) => state.usuariosReducer
  );
  if (token.includes("unsubscribe") && !user) {navigate("/login")}

  const handleSendEmail = async (data) => {
    if (token.includes("unsubscribe")) {
      const result = await dispatch(unsubscribeEmail(data.email, token, user._id));
      if (result) {
        setTimeout(() => {
          navigate("/"); 
        }, 2000);
      }
    } else {
      dispatch(forgotPassword(data.email));
    }
  };
  ;
  const handleIcon = () => {
    navigate(-1);
  };
  return (
    <div className="cardLogin recuperar">
    <AiFillCloseSquare className="close-icon" onClick={handleIcon} />
      <div>
        <h1>Confirmar Email</h1>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
      <form onSubmit={handleSubmit(handleSendEmail)}>
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
        {token === "unsubscribenewsletter" && (
          <p>
            Ao premer en <strong>Confirmar</strong> deixarás de recibir os
            eventos semanais
          </p>
        )}
        {token === "unsubscribenewevent" && (
          <p>
            Ao premer en <strong>Confirmar</strong> deixarás de recibir os
            emails de evento
          </p>
        )}

        <div className="margin-botonLogin">
          <Button
            text={token.includes("unsubscribe") ? "Confirmar" : "Enviar correo"}
            type="large"
          />
        </div>
      </form>
    </div>
  );
};

export default ConfirmarEmail;
