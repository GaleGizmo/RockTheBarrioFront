import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addEvento, editEvento } from "../../redux/eventos/eventos.actions";
import SubirImagen from "../../components/SubirImagen/SubirImagen";
import Button from "../Button/Button";
import { utcToZonedTime, format } from "date-fns-tz";
import "./EventoEdicion.css";
import { AiFillCloseSquare } from "react-icons/ai";

const EventoEdicion = ({ evento, navigate }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasDeletedImage, setHasDeletedImage] = useState(false);
  const [doPublish, setDoPublish] = useState(false);
  const isDraft = evento.status === "draft";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [imageFile, setImageFile] = useState();
  const statusOptions = [
    { label: "Ok", value: "Ok" },
    { label: "Cancelado", value: "cancelled" },
    { label: "Aplazado", value: "delayed" },
    { label: "Nova data", value: "new_date" },
    { label: "Esgotado", value: "soldout" },
    { label: "Borrador", value: "draft" },
  ];
  const handleInputChange = (e) => {
    setValue(e.target.name, e.target.value);
  };
  const removeImage = () => {
    setImageFile(null);
    setValue("image", null);
    setHasDeletedImage(true);
  };
  const adjustTime = (dateString) => {
    // Convertir la fecha de UTC a la zona horaria local
    const timeZone = "Europe/Madrid";
    const localDate = utcToZonedTime(new Date(dateString), timeZone);
    const formattedTime = format(localDate, "HH:mm", { timeZone });

    return formattedTime;
  };

  const handleSave = (data) => {
    const editedEvento = prepareData(data, evento);
    console.log(editedEvento);
    if (editedEvento.publish) {
      dispatch(
        addEvento(editedEvento, navigate, { user: evento.user_creator })
      );
      setIsSubmitting(false);
    } else {
      dispatch(editEvento(evento._id, editedEvento, navigate));
      setIsSubmitting(false);
    }
  };
  const handleClone = (data) => {
    if (data.image[0] == undefined && evento.image) {
      data.image = evento.image;
    }
    const editedEvento = prepareData(data, evento);

    dispatch(addEvento(editedEvento, navigate, { user: evento.user_creator }));
    setIsSubmitting(false);
  };
  function prepareData(data, evento) {
    setIsSubmitting(true);
    const { day_start, time_start } = data;

    // Combinamos la fecha y la hora en un objeto Date
    let combinedDate = new Date(`${day_start}T${time_start}`);

    const timeZone = "Europe/Madrid";
    combinedDate = utcToZonedTime(combinedDate, timeZone);
    // Imagen: conservar si no se eliminó ni se subió una nueva
    if (!hasDeletedImage) {
      if (
        !data.image ||
        data.image.length === 0 ||
        data.image[0] === undefined
      ) {
        data.image = evento.image;
      }
    } else {
      data.image = null;
    }

    const editedEvento = {
      ...evento,
      ...data,
      date_start: combinedDate,
    };
    return editedEvento;
  }

  const handleCancel = () => {
    navigate(`/detalles-evento/${evento._id}`);
  };
  const handleIcon = () => {
    navigate(-1);
  };
  return (
    <div className="cardCrearEvento">
      <AiFillCloseSquare className="close-icon" onClick={handleIcon} />
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
            name="artist"
            defaultValue={evento.artist}
            onChange={handleInputChange}
            {...register("artist", { required: !isDraft })}
          />
          {errors.artist && <span>Artista é requerido</span>}
        </div>
        <div className="div-inputCrearEvento">
          <label>Lugar:</label>
          <input
            className="inputCrearEvento"
            type="text"
            name="site"
            defaultValue={evento.site}
            onChange={handleInputChange}
            {...register("site", { required: !isDraft })}
          />
          {errors.site && <span>Sitio é requerido</span>}
        </div>
        <div className="infoCrearEvento">
          <label>Contido:</label>
          <textarea
            className="inputCrearEvento"
            defaultValue={evento.content}
            onChange={handleInputChange}
            name="content"
            {...register("content", { required: !isDraft })}
          ></textarea>
          {errors.content && <span>Contido é requerido</span>}
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
            {...register("price", { required: !isDraft })}
          />
          {errors.price && <span>Prezo é requerido</span>}
        </div>
        <div className="div-inputCrearEvento">
          <label>Entrada Inversa</label>
          <input
            className="inputCrearEvento"
            type="checkbox"
            name="payWhatYouWant"
            defaultChecked={evento.payWhatYouWant}
            onChange={handleInputChange}
            {...register("payWhatYouWant")}
          />
        </div>
        <div className="div-inputCrearEvento">
          <label>URL de compra</label>
          <input
            className="inputCrearEvento"
            type="text"
            name="buy_ticket"
            defaultValue={evento.buy_ticket}
            onChange={handleInputChange}
            {...register("buy_ticket")}
          />
        </div>
        <div className="fechaCrearEvento">
          <label>Data de inicio:</label>
          <input
            className="inputCrearEvento"
            type="date"
            name="day_start"
            defaultValue={evento.date_start.slice(0, 10)}
            onChange={handleInputChange}
            {...register("day_start", { required: !isDraft })}
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
            {...register("time_start", { required: !isDraft })}
          />
          {errors.time_start && <span>Hora de inicio es requerida</span>}
        </div>
        {evento.date_end && (
          <div className="fechaCrearEvento">
            <label>Data de fin:</label>
            <input
              className="inputCrearEvento"
              type="date"
              name="date_end"
              defaultValue={evento.date_end ? evento.date_end.slice(0, 10) : ""}
              onChange={handleInputChange}
              {...register("date_end")}
            />
          </div>
        )}
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
        <div className="div-inputCrearEvento">
          <label>YouTube ID:</label>
          <input
            className="inputCrearEvento"
            type="text"
            name="youtubeVideoId"
            defaultValue={evento.youtubeVideoId}
            onChange={handleInputChange}
            {...register("youtubeVideoId")}
          />
        </div>
        <div className="div-inputCrearEvento">
          <label>Máis Info:</label>
          <input
            className="inputCrearEvento"
            type="text"
            name="url"
            defaultValue={evento.url}
            onChange={handleInputChange}
            {...register("url")}
          />
        </div>
        <div className="div-inputCrearEvento">
          <label>Destacado</label>
          <input
            className="inputCrearEvento"
            type="checkbox"
            name="highlighted"
            defaultChecked={evento.highlighted}
            onChange={handleInputChange}
            {...register("highlighted")}
          />
        </div>
        <div className="div-inputCrearEvento">
          <label>Estado:</label>
          <select
            className="inputCrearEvento"
            name="status"
            defaultValue={evento.status}
            onChange={handleInputChange}
            {...register("status")}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {isDraft && (
          <div className="div-inputCrearEvento">
            <label>Publicar</label>
            <input
              className="inputCrearEvento"
              type="checkbox"
              name="publish"
              defaultChecked={doPublish}
              onChange={() => setDoPublish(!doPublish)}
              {...register("publish")}
            />
          </div>
        )}
        <div className="div-inputCrearEvento">
          <label>Imaxe:</label>
          <SubirImagen
            register={register}
            evento={true}
            funcion={(e) =>
              setImageFile(URL.createObjectURL(e.target.files[0]))
            }
          />
          {evento.image && !hasDeletedImage && (
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
              alt="Imaxe do evento"
            />
          )}
          {(evento.image && !hasDeletedImage) ||
            (imageFile && (
              <Button
                text="Eliminar imaxe"
                variant="small"
                onClick={removeImage}
              />
            ))}
        </div>
        <div className="edit__botons">
          <Button
            type="submit"
            text="Gardar"
            isSubmitting={isSubmitting}
            onClick={handleSubmit(handleSave)}
          />
          <Button type="button" text="Cancelar" onClick={handleCancel} />
          <Button
            type="button"
            text="Clonar"
            isSubmitting={isSubmitting}
            onClick={handleSubmit(handleClone)}
          />
        </div>
      </form>
    </div>
  );
};

export default EventoEdicion;
