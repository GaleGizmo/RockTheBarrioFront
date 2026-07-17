import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/usuarios/usuarios.actions";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResetearPassword = ({ token }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { register, handleSubmit, watch, setError } = useForm();
  const { error } = useSelector((state) => state.usuariosReducer);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError("confirmPassword", { message: t('resetPassword.passwordMismatch') });
      return;
    }

    setIsSubmitting(true);
    dispatch(resetPassword(token, password, navigate));
    setIsSubmitting(false);
  };

  return (
    <div className="cardLogin recuperar">
      <h1>{t('resetPassword.title')}</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="div-inputLogin">
          <label>
            {t('resetPassword.newPassword')}
            <input
              className="inputLogin"
              {...register("password", { required: true })}
              type="password"
            />
          </label>
        </div>
        <div className="div-inputLogin">
          <label>
            {t('resetPassword.confirmPassword')}
            <input
              className="inputLogin"
              {...register("confirmPassword", { required: true })}
              type="password"
            />
          </label>
          {watch("password") !== watch("confirmPassword") && (
            <p className="error-message">{t('resetPassword.passwordMismatch')}</p>
          )}
        </div>
        <div className="margin-botonLogin">
          <Button
            type="submit"
            variant="large"
            text={t('buttons.restore')}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default ResetearPassword;
