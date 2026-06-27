import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";
import { toast } from "react-toastify";
import { createFestival } from "../../shared/api";
import SubirImagen from "../SubirImagen/SubirImagen";
import Button from "../Button/Button";
import "./FormularioCrearFestival.css";

const FormularioCrearFestival = () => {
  const navigate = useNavigate();
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
      <h1>Crear Festival</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="div-inputCrearFestival">
          <label>Nome</label>
          <input
            className="inputCrearFestival"
            {...register("name", { required: "O nome é requerido" })}
          />
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>

        <div className="div-inputCrearFestival">
          <label>Descrición</label>
          <textarea
            className="inputCrearFestival"
            rows={4}
            {...register("description", { required: "A descrición é requerida" })}
          />
          {errors.description && (
            <span className="error-message">{errors.description.message}</span>
          )}
        </div>

        <div className="fechaCrearFestival">
          <label>Data de inicio</label>
          <input
            className="inputCrearFestival"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            {...register("startDate", { required: "A data de inicio é requerida" })}
          />
          {errors.startDate && (
            <span className="error-message">{errors.startDate.message}</span>
          )}

          <label>Data de fin</label>
          <input
            className="inputCrearFestival"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            {...register("endDate", { required: "A data de fin é requerida" })}
          />
          {errors.endDate && (
            <span className="error-message">{errors.endDate.message}</span>
          )}
        </div>

        <div className="div-checkbox">
          <label>Publicar</label>
          <input type="checkbox" {...register("toBeFeatured")} />
        </div>

        <div className="div-inputCrearFestival">
          <label>Imaxe</label>
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
              alt="Vista previa"
            />
          )}
        </div>

        <div className="margin-boton">
          <Button
            type="button"
            text="Cancelar"
            variant="medium"
            onClick={() => navigate(-1)}
          />
          <Button
            type="submit"
            text="Crear"
            variant="medium"
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioCrearFestival;
