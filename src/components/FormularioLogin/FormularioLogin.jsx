import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./FormularioLogin.css";
import { login, clearError } from "../../redux/usuarios/usuarios.actions";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const FormularioLogin = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(clearError());
  }, []);
  const { register, handleSubmit } = useForm();

  const { error, user } = useSelector((state) => state.usuariosReducer);

  const navigate = useNavigate();

  const onSubmit = (datos) => {
    dispatch(login(datos, navigate));
  };

  return (
    <div className="cardLogin">
      <AiFillCloseSquare className="close-icon" onClick={() => navigate(-1)} />
      <div>
        <h1>{t('login.title')}</h1>
        {error && <p className="error-message">{error}</p>}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="div-inputLogin">
          <label>
            <input
              {...register("username")}
              placeholder={t('login.userOrEmail')}
              className="inputLogin"
            />
          </label>
        </div>
        <div className="div-inputLogin">
          <label>
            <input
              {...register("password")}
              type="password"
              placeholder={t('login.password')}
              className="inputLogin"
            />
          </label>
        </div>
        <div className="margin-botonLogin">
          <Button text={t('buttons.login')} variant="large" type="submit" />
        </div>
        <div className="margin-link">
          <Link to="/reset-password/forgot">{t('login.forgotPassword')}</Link>
        </div>
        <div>
          <p>
            {t('login.noAccount')}{" "}
            <Link to="/date-de-alta">
              {" "}
              <Button text={t('buttons.register')} variant="small" />{" "}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default FormularioLogin;
