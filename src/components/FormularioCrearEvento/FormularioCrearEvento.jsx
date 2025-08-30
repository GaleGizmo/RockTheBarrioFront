import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addEvento } from "../../redux/eventos/eventos.actions";
import "./FormularioCrearEvento.css";
import { useNavigate } from "react-router-dom";
import SubirImagen from "../../components/SubirImagen/SubirImagen";
import Button from "../Button/Button";
import { AiFillCloseSquare } from "react-icons/ai";
import { useEffect } from "react";
import { getLocalizaciones, addLocalizacion } from "../../shared/api";
import LocalizacionSelector from "../LocalizacionSelector/LocalizacionSelector";

const FormularioCrearEvento = () => {
  const { user } = useSelector((state) => state.usuariosReducer);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm();
  const [priceError, setPriceError] = useState(false);

  const [showBuyTicketField, setShowBuyTicketField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getLocalizaciones();
     
      setLocations(data);
    };
    fetchLocations();
  }, []);

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
  const handleLocalizacionChange = ({ site, location }) => {
    setValue("site", site);
    setValue("location", location);
  };
  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);

      await dispatch(addEvento(formData, navigate, { user: user._id }));
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error al enviar el evento:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const { day_start, time_start } = data;

    if (data.price > 0) data.payWhatYouWant = false;
    // Combinar la fecha y la hora en un objeto Date
    const combinedDate = new Date(`${day_start}T${time_start}`);

    if (data.content === "" || data.content.trim() == "")
      data.content = "Non hai información deste evento";

    // Actualizar el valor de "date_start" en los datos a enviar
    const finalFormData = {
      ...data,
      date_start: combinedDate,
    };
    console.log(finalFormData);

    // Enviar los datos al backend

    handleFormSubmit(finalFormData);
  };

  const status = watch("status");
  const isDraft = status === "draft";
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState();
  const statusOptions = [
    { label: "Ok", value: "Ok" },
    { label: "Borrador", value: "draft" },
    { label: "Cancelado", value: "cancelled" },
    { label: "Aplazado", value: "delayed" },
    { label: "Nova data", value: "new_date" },
    { label: "Esgotado", value: "soldout" },
  ];
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
            {...register("artist", { required: !isDraft })}
          />
          {errors.artist && (
            <span className="error-message">Artista é requerido</span>
          )}
        </div>
        <div className="infoCrearEvento">
          <label>Información</label>
          <textarea
            {...register("content", { required: false })}
            className="inputCrearEvento"
          />
        </div>

        <div className="div-inputCrearEvento">
          <LocalizacionSelector
            locations={locations}
            setLocations={setLocations}
            onChange={handleLocalizacionChange}
            addLocalizacion={addLocalizacion}
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
              required: !isDraft,
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Máximo dous decimáis permitidos.",
              },
            })}
            defaultValue={0}
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
          <div className="div-checkbox">
            <label>Entrada Inversa</label>
            <input type="checkbox" {...register("payWhatYouWant")} />{" "}
          </div>
        )}
        <div className="fechaCrearEvento">
          <label>Data do Evento</label>
          <input
            className="inputCrearEvento"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            {...register("day_start", { required: !isDraft })}
          />
          {errors.day_start && (
            <span className="error-message">Data é requerida</span>
          )}
          <label>Hora de Inicio</label>
          <input
            className="inputCrearEvento"
            type="time"
            defaultValue={new Date().toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {...register("time_start", { required: !isDraft })}
          />
          {errors.time_start && (
            <span className="error-message">Hora de Inicio é requerida</span>
          )}
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
          <label>Evento Destacado</label>
          <input
            className="inputCrearEvento"
            type="checkbox"
            {...register("highlighted")}
          />{" "}
        </div>
        <div className="div-inputCrearEvento">
          <label>Estado:</label>
          <select
            className="inputCrearEvento"
            name="status"
            {...register("status")}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
            type="submit"
            text="Crear evento"
            variant="large"
            isSubmitting={isSubmitting}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioCrearEvento;
