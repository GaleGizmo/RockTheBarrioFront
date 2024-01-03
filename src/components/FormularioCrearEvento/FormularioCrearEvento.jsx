import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addEvento } from "../../redux/eventos/eventos.actions";
import "./FormularioCrearEvento.css";
import { useNavigate } from "react-router-dom";
import SubirImagen from "../../components/SubirImagen/SubirImagen";
import Button from "../Button/Button";
import { AiFillCloseSquare } from "react-icons/ai";

const FormularioCrearEvento = () => {
  const { user } = useSelector((state) => state.usuariosReducer);
  const navigate = useNavigate();
  const [priceError, setPriceError] = useState(false);

  const [showBuyTicketField, setShowBuyTicketField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePriceChange = (event) => {
    const price = event.target.value;
    const floatPrice = parseFloat(price);
    if (!isNaN(floatPrice)) {
      setShowBuyTicketField(floatPrice > 0);
      setPriceError(false);
      clearErrors("price");
    } else {
      setPriceError(true);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
     
      await dispatch(addEvento(formData, navigate, { user: user._id }));
      
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error al enviar el evento:", error);
    } finally {
      setIsSubmitting(false)
    }
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const { day_start, time_start } = data;
    if (data.price > 0) data.payWhatYouWant = false;
    // Combinar la fecha y la hora en un objeto Date
    const combinedDate = new Date(`${day_start}T${time_start}`);

    // Actualizar el valor de "date_start" en los datos a enviar
    const finalFormData = {
      ...data,
      date_start: combinedDate,
    };

    // Enviar los datos al backend

    handleFormSubmit(finalFormData);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState();
  const handleIcon = () => {
    navigate(-1);
  };

  return (
    <div className="cardCrearEvento">
      <AiFillCloseSquare className="close-icon" onClick={handleIcon} />
      <h1>Crear Evento</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="div-inputCrearEvento">
          <label>Título</label>
          <input
            className="inputCrearEvento"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="error-message">Título é requerido</span>
          )}
        </div>
        <div className="div-inputCrearEvento">
          <label>Artista/s</label>
          <input
            className="inputCrearEvento"
            {...register("artist", { required: true })}
          />
          {errors.artist && (
            <span className="error-message">Artista é requerido</span>
          )}
        </div>
        <div className="infoCrearEvento">
          <label>Información</label>
          <textarea
            {...register("content", { required: true })}
            className="inputCrearEvento"
          />
          {errors.content && (
            <span className="error-message">Contido é requerido</span>
          )}
        </div>

        <div className="div-inputCrearEvento">
          <label>Lugar</label>
          <input
            className="inputCrearEvento"
            {...register("site", { required: true })}
          />
          {errors.site && (
            <span className="error-message">Lugar é requerido</span>
          )}
        </div>
        <div className="div-inputCrearEvento">
          <label>Prezo</label>
          <input
            className="inputCrearEvento"
            type="text"
            {...register("price", {
              required: true,
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Máximo dous decimáis permitidos.",
              },
            })}
            onChange={handlePriceChange}
          />
          {errors.price && (
            <span className="error-message">{errors.price.message}</span>
          )}
          {priceError && (
            <span className="error-message">
              Por favor, introduce un número válido
            </span>
          )}
        </div>
        {showBuyTicketField ? (
          <div className="div-inputCrearEvento">
            <label>URL de compra</label>
            <input className="inputCrearEvento" {...register("buy_ticket")} />
          </div>
        ) : (
          <div>
            <label>Entrada Inversa</label>
            <input
              className="inputCrearEvento"
              type="checkbox"
              {...register("payWhatYouWant")}
            />{" "}
          </div>
        )}
        <div className="fechaCrearEvento">
          <label>Data de Inicio</label>
          <input
            className="inputCrearEvento"
            type="date"
            {...register("day_start", { required: true })}
          />
          {errors.day_start && (
            <span className="error-message">Data de Inicio é requerida</span>
          )}
          <label>Hora de Inicio</label>
          <input
            className="inputCrearEvento"
            type="time"
            {...register("time_start", { required: true })}
          />
          {errors.time_start && (
            <span className="error-message">Hora de Inicio é requerida</span>
          )}
        </div>
        <div className="fechaCrearEvento">
          <label>Data de Fin</label>
          <input
            className="inputCrearEvento"
            type="date"
            {...register("date_end")}
          />
        </div>
        <div className="div-inputCrearEvento">
          <label>Xénero</label>
          <input className="inputCrearEvento" {...register("genre")} />
        </div>
        <div className="div-inputCrearEvento">
          <label>YouTube ID</label>
          <input className="inputCrearEvento" {...register("youtubeVideoId")} />
        </div>
        <div className="div-inputCrearEvento">
          <label>URL</label>
          <input className="inputCrearEvento" {...register("url")} />
        </div>
        <div className="div-inputCrearEvento">
          <label>Imaxe</label>
          <SubirImagen
            register={register}
            evento={true}
            funcion={(e) =>
              setImageFile(URL.createObjectURL(e.target.files[0]))
            }
          />
          {imageFile && (
            <img className="imagen-formulario imagen-crear" src={imageFile} />
          )}
        </div>

        <div className="margin-boton">
          <Button
            text="Crear evento"
            type="large"
            isSubmitting={isSubmitting}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioCrearEvento;
