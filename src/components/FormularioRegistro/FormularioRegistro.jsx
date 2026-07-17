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
import { useTranslation } from "react-i18next";

const FormularioRegistro = ({ userData, isEdit }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(clearError());
  }, []);
  const [mostrarSubirImagen, setMostrarSubirImagen] = useState(false);

  const [imageFile, setImageFile] = useState(isEdit ? userData.avatar : null);
  const [selectedFile, setSelectedFile] = useState(null);

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
    } else if (imageFile) {
      // If the selectedFile hasn't changed, append the current imageFile
      formData.append("avatar", imageFile);
    }
    formData.delete("image");
    console.log(Array.from(formData.entries()));
    if (isEdit) {
      dispatch(updateUser(formData, userData._id, navigate));
    } else {
      dispatch(registerUser(formData, navigate));
    }
  };
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handleIcon = () => {
    navigate(-1);
  };
  return (
    <div className={`cardReg ${isEdit ? "isEdit" : ""}`}>
      <AiFillCloseSquare className="close-icon" onClick={handleIcon} />
      {isEdit ? (
        <h1>{t("register.titleEdit")}</h1>
      ) : (
        <h1>{t("register.titleNew")}</h1>
      )}
      <p className="error-message">{error}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="div-inputReg">
          <label className="margin-label">{t("register.email")}</label>
          <input
            {...register("email", {
              required: t("register.emailRequired"),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: t("register.emailFormat"),
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
          <label className="margin-label">{t("register.username")}</label>
          <input
            {...register("username", {
              required: t("register.usernameRequired"),
              minLength: {
                value: 2,
                message: t("register.usernameMinLength"),
              },
              maxLength: {
                value: 20,
                message: t("register.usernameMaxLength"),
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
              <label className="margin-labelReg">
                {t("register.password")}
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                className="inputReg"
              />
              {errors.password && (
                <span className="error-message">
                  {t("register.passwordRequired")}
                </span>
              )}
            </div>
            <div className="div-inputReg">
              <label className="margin-labelReg">
                {t("register.confirmPassword")}
              </label>
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === getValues("password") ||
                    t("register.passwordMismatch"),
                })}
                type="password"
                className="inputReg"
              />
              {errors.confirmPassword && (
                <span className="error-message">
                  {t("register.passwordMismatch")}
                </span>
              )}
            </div>
          </>
        )}
        <div className="div-inputReg">
          <label>{t("register.newsletter")}</label>
          <input
            {...register("newsletter")}
            className="checkReg"
            name="newsletter"
            type="checkbox"
            defaultChecked={isEdit ? userData.newsletter : true}
          />
        </div>
        <div className="div-inputReg">
          <label>{t("register.newevent")}</label>
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
              text={t("buttons.removeAvatar")}
              variant="small"
              onClick={removeAvatar}
            />
            {mostrarSubirImagen && (
              <SubirImagen register={register} funcion={handleImageSelection} />
            )}

            <label htmlFor="file-input">
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
          {!isEdit && (
            <div className="div-checkReg">
              <div className="checkelement">
                <label>
                  {t("register.acceptTerms")}{" "}
                  <Link to="/terminos">{t("register.TermsAndConditions")}</Link>
                </label>
                <input
                  {...register("terminos", { required: true })}
                  className="checkReg"
                  type="checkbox"
                />
                <p>
                  {errors.terminos && (
                    <span className="error-message">
                      {t("register.termsRequired")}
                    </span>
                  )}
                </p>
              </div>
              <div className="checkelement">
                <label>
                  {t("register.acceptPolicy")}{" "}
                  <Link to="/privacidad">{t("register.PrivacyPolicy")}</Link>
                </label>
                <input
                  {...register("privacidad", { required: true })}
                  className="checkReg"
                  type="checkbox"
                />
                <p>
                  {errors.privacidad && (
                    <span className="error-message">
                      {t("register.policyRequired")}
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
          <div className="botones-edicion-usuario">
            <Button
              text={t("buttons.cancel")}
              type="button"
              variant="medium"
              onClick={handleCancel}
            />
            <Button
              type="submit"
              text={isEdit ? t("buttons.save") : t("buttons.register")}
              variant="medium"
            />{" "}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistro;
