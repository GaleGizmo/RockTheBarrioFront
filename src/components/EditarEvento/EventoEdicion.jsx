import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editEvento } from "../../redux/eventos/eventos.actions";
import SubirImagen from "../../components/SubirImagen/SubirImagen";
import Button from "../Button/Button";
import "./EventoEdicion.css";


const EventoEdicion = ({ evento, navigate }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [imageFile, setImageFile] = useState();

  const handleInputChange = (e) => {
    setValue(e.target.name, e.target.value);
  };
  const adjustTime = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 2);
  
    // Formatear la hora en un string en formato "HH:mm"
    const formattedTime = date.toISOString().slice(11, 16);
  
    return formattedTime;
  };

  const handleSave = (data) => {
    const { day_start, time_start } = data;
  
    // Combinar la fecha y la hora en un objeto Date
    const combinedDate = new Date(`${day_start}T${time_start}`);
   
   
    const editedEvento = {
      ...evento,
      ...data,
      date_start:combinedDate
    };

    dispatch(editEvento(evento._id, editedEvento, navigate));
  
  };

  const handleCancel = () => {
    navigate(`/detalles-evento/${evento._id}`);
  };

  return (
    <div className="cardCrearEvento">
      <h1>Editar Evento</h1>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="div-inputCrearEvento">
          <label>Título:</label>
          <input
            className="inputCrearEvento"
            type="text"
            name="title"
            defaultValue={evento.title}
            onChange={handleInputChange}
            {...register("title", { required: true })}
          />
          {errors.title && <span>Título é requerido</span>}
        </div>
        <div className="div-inputCrearEvento">
          <label>Artista:</label>
          <input
            className="inputCrearEvento"
            type="text"
            name="subtitle"
            defaultValue={evento.subtitle}
            onChange={handleInputChange}
            {...register("subtitle", { required: true })}
          />
          {errors.subtitle && <span>Artista é requerido</span>}
        </div>
        <div className="div-inputCrearEvento">
          <label>Lugar:</label>
          <input
            className="inputCrearEvento"
            type="text"
            name="site"
            defaultValue={evento.site}
            onChange={handleInputChange}
            {...register("site", { required: true })}
          />
          {errors.site && <span>Sitio é requerido</span>}
        </div>
        <div className="div-inputCrearEvento">
          <label>Prezo:</label>
          <input
            className="inputCrearEvento"
            type="number"
            name="price"
            defaultValue={evento.price}
            min="0"
            step="any"
            onChange={handleInputChange}
            {...register("price", { required: true })}
          />
          {errors.price && <span>Precio é requerido</span>}
        </div>
        <div className="fechaCrearEvento">
          <label>Data de inicio:</label>
          <input
            className="inputCrearEvento"
            type="date"
            name="day_start"
            defaultValue={evento.date_start.slice(0, 10)}
            onChange={handleInputChange}
            {...register("day_start", { required: true })}
          />
          {errors.date_start && <span>Data de Inicio é requerida</span>}
        </div>
        <div className="fechaCrearEvento">
          <label>Hora de inicio:</label>
          <input
            className="inputCrearEvento"
            type="time"
            name="time_start"
            defaultValue={adjustTime(evento.date_start)}
            onChange={handleInputChange}
            {...register("time_start", { required: true })}
          />
          {errors.time_start && <span>Hora de inicio es requerida</span>}
        </div>
        {evento.date_end && (<div className="fechaCrearEvento">
          <label>Data de fin:</label>
          <input
            className="inputCrearEvento"
            type="date"
            name="date_end"
            defaultValue={evento.date_end ? evento.date_end.slice(0, 10) : ""}
            onChange={handleInputChange}
            {...register("date_end")}
          />
        </div>)}
        <div className="div-inputCrearEvento">
          <label>Xénero:</label>
          <input
            className="inputCrearEvento"
            type="text"
            name="genre"
            defaultValue={evento.genre}
            onChange={handleInputChange}
            {...register("genre")}
          />
        </div>
        <div className="infoCrearEvento">
          <label>Información:</label>
          <textarea
            className="inputCrearEvento"
            defaultValue={evento.content}
            onChange={handleInputChange}
            name="content"
            {...register("content", { required: true })}
          ></textarea>
          {errors.content && <span>Contido é requerido</span>}
        </div>
        <div className="div-inputCrearEvento">
          <label>Imaxe:</label>
          <SubirImagen
            register={register}
            funcion={(e) =>
              setImageFile(URL.createObjectURL(e.target.files[0]))
            }
          />
          {evento.image && (
            <img
              className="imagen-formulario imagen-evento"
              src={evento.image}
              alt="Imagen del evento"
            />
          )}
          {imageFile && (
            <img
              className="imagen-formulario"
              src={imageFile}
              alt="Imagen del evento"
            />
          )}
        </div>
        <div className="margin-boton">
          <Button type="submit" text="Guardar" />
          <Button type="button" text="Cancelar" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default EventoEdicion;
