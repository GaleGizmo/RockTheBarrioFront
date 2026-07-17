import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  forgotPassword,
  unsubscribeEmail,
} from "../../redux/usuarios/usuarios.actions";
import Button from "../../components/Button/Button";
import "./ConfirmarEmail.css";
import { useNavigate } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const ConfirmarEmail = ({ token }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(clearError());
  }, []);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const { user } = useSelector((reducer) => reducer.usuariosReducer);
  const { error, successMessage } = useSelector(
    (state) => state.usuariosReducer
  );
  if (token.includes("unsubscribe") && !user) {
    navigate("/login");
  }

  const handleSendEmail = async (data) => {
    if (token.includes("unsubscribe")) {
      const unsubscribe = token.replace("unsubscribe", "");
      const result = await dispatch(
        unsubscribeEmail(data.email, unsubscribe, user._id)
      );
      if (result) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } else {
      dispatch(forgotPassword(data.email));
    }
  };
  const handleIcon = () => {
    navigate(-1);
  };
  return (
    <div className="cardLogin recuperar">
      <AiFillCloseSquare className="close-icon" onClick={handleIcon} />
      <div>
        <h1>{t('confirmEmail.title')}</h1>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
      <form onSubmit={handleSubmit(handleSendEmail)}>
        <div className="div-inputLogin">
          <label>
            <input
              {...register("email")}
              type="email"
              placeholder={t('confirmEmail.emailPlaceholder')}
              className="inputLogin"
            />
          </label>
        </div>
        {token === "unsubscribenewsletter" && (
          <p>
            {t('confirmEmail.unsubscribeNewsletterBefore')} <strong>{t('buttons.confirm')}</strong> {t('confirmEmail.unsubscribeNewsletterAfterNewsletter')}
          </p>
        )}
        {token === "unsubscribenewevent" && (
          <p>
            {t('confirmEmail.unsubscribeNewsletterBefore')} <strong>{t('buttons.confirm')}</strong> {t('confirmEmail.unsubscribeNewsletterAfterNewEvent')}
          </p>
        )}

        <div className="margin-botonLogin">
          <Button
            type="submit"
            text={token.includes("unsubscribe") ? t('buttons.confirm') : t('confirmEmail.sendEmail')}
            variant="large"
          />
        </div>
      </form>
    </div>
  );
};

export default ConfirmarEmail;
