import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";
import { toast } from "react-toastify";
import { createFestival } from "../../shared/api";
import SubirImagen from "../SubirImagen/SubirImagen";
import Button from "../Button/Button";
import "./FormularioCrearFestival.css";
import { useTranslation } from "react-i18next";

const FormularioCrearFestival = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("toBeFeatured", data.toBeFeatured);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      await createFestival(formData);
      toast.success("Festival creado correctamente");
      navigate(-1);
    } catch (error) {
      console.error("Error ao crear o festival:", error);
      toast.error("Erro ao crear o festival");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cardCrearFestival">
      <AiFillCloseSquare className="close-icon" onClick={() => navigate(-1)} />
      <h1>{t('createFestival.title')}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="div-inputCrearFestival">
          <label>{t('createFestival.name')}</label>
          <input
            className="inputCrearFestival"
            {...register("name", { required: t('createFestival.nameRequired') })}
          />
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>

        <div className="div-inputCrearFestival">
          <label>{t('createFestival.description')}</label>
          <textarea
            className="inputCrearFestival"
            rows={4}
            {...register("description", { required: t('createFestival.descriptionRequired') })}
          />
          {errors.description && (
            <span className="error-message">{errors.description.message}</span>
          )}
        </div>

        <div className="fechaCrearFestival">
          <label>{t('createFestival.startDate')}</label>
          <input
            className="inputCrearFestival"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            {...register("startDate", { required: t('createFestival.startDateRequired') })}
          />
          {errors.startDate && (
            <span className="error-message">{errors.startDate.message}</span>
          )}

          <label>{t('createFestival.endDate')}</label>
          <input
            className="inputCrearFestival"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            {...register("endDate", { required: t('createFestival.endDateRequired') })}
          />
          {errors.endDate && (
            <span className="error-message">{errors.endDate.message}</span>
          )}
        </div>

        <div className="div-checkbox">
          <label>{t('forms.publish')}</label>
          <input type="checkbox" {...register("toBeFeatured")} />
        </div>

        <div className="div-inputCrearFestival">
          <label>{t('forms.image')}</label>
          <SubirImagen
            register={register}
            evento={true}
            funcion={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
          {errors.image && (
            <span className="error-message">{errors.image.message}</span>
          )}
          {imagePreview && (
            <img
              className="imagen-formulario"
              src={imagePreview}
              alt={t('createFestival.title')}
            />
          )}
        </div>

        <div className="margin-boton">
          <Button
            type="button"
            text={t('buttons.cancel')}
            variant="medium"
            onClick={() => navigate(-1)}
          />
          <Button
            type="submit"
            text={t('buttons.confirm')}
            variant="medium"
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioCrearFestival;
