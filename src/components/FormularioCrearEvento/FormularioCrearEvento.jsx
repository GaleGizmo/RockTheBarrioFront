import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addEvento } from "../../redux/eventos/eventos.actions";
import "./FormularioCrearEvento.css";
import { useNavigate } from "react-router-dom";
import SubirImagen from "../../components/SubirImagen/SubirImagen";
import Button from "../Button/Button";

const FormularioCrearEvento = () => {
  const { user } = useSelector((state) => state.usuariosReducer);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState();

  console.log(user);

  return (
    <div className="cardCrearEvento">
      <h1>Crear Evento</h1>
      <form
        onSubmit={handleSubmit((datos) =>
          dispatch(addEvento(datos, navigate, { user: user._id }))
        )}
      >
        <div className="div-inputCrearEvento">
          <label>Título</label>
          <input
            className="inputCrearEvento"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="error-message">Título es requerido</span>
          )}
        </div>
        <div className="div-inputCrearEvento">
          <label>Artista/s</label>
          <input
            className="inputCrearEvento"
            {...register("subtitle", { required: true })}
          />
          {errors.subtitle && (
            <span className="error-message">Subtítulo es requerido</span>
          )}
        </div>
        <div className="infoCrearEvento">
          <label>Información</label>
          <textarea
            {...register("content", { required: true })}
            className="inputCrearEvento"
          />
          {errors.content && (
            <span className="error-message">Contenido es requerido</span>
          )}
        </div>

        <div className="div-inputCrearEvento">
          <label>Lugar</label>
          <input
            className="inputCrearEvento"
            {...register("site", { required: true })}
          />
          {errors.site && (
            <span className="error-message">Sitio es requerido</span>
          )}
        </div>
        <div className="div-inputCrearEvento">
          <label>Precio</label>
          <input
            className="inputCrearEvento"
            type="number"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="error-message">Precio es requerido</span>
          )}
        </div>
        <div className="fechaCrearEvento">
          <label>Fecha de Inicio</label>
          <input
            className="inputCrearEvento"
            type="date"
            {...register("date_start", { required: true })}
          />
          {errors.date_start && (
            <span className="error-message">Fecha de Inicio es requerida</span>
          )}
        </div>
        <div className="fechaCrearEvento">
          <label>Fecha de Fin</label>
          <input
            className="inputCrearEvento"
            type="date"
            {...register("date_end")}
          />
        </div>
        <div className="div-inputCrearEvento">
          <label>URL</label>
          <input className="inputCrearEvento" {...register("url")} />
        </div>
        <div className="div-inputCrearEvento">
          <label>Imagen</label>
          <SubirImagen
            register={register}
            funcion={(e) =>
              setImageFile(URL.createObjectURL(e.target.files[0]))
            }
          />
          {imageFile && (
            <img className="imagen-formulario imagen-crear" src={imageFile} />
          )}
        </div>
        <div className="div-inputCrearEvento">
          <label>Género</label>
          <input className="inputCrearEvento" {...register("genre")} />
        </div>
        <div className="margin-boton">
          <Button text="Crear evento" type="large" />
        </div>
      </form>
    </div>
  );
};

export default FormularioCrearEvento;
