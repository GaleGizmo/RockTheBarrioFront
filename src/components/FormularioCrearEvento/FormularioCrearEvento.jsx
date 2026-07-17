import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addEvento } from "../../redux/eventos/eventos.actions";
import "./FormularioCrearEvento.css";
import formatContent from "../../utils/formatContent.jsx";
import { useNavigate } from "react-router-dom";
import SubirImagen from "../../components/SubirImagen/SubirImagen";
import Button from "../Button/Button";
import { AiFillCloseSquare } from "react-icons/ai";
import { useEffect } from "react";
import {
  getLocalizaciones,
  addLocalizacion,
  getNextFestivals,
} from "../../shared/api";
import LocalizacionSelector from "../LocalizacionSelector/LocalizacionSelector";
import EventoConfirmModal from "../EventoConfirmModal/EventoConfirmModal";
import { useTranslation } from "react-i18next";

const FormularioCrearEvento = () => {
  const { user } = useSelector((state) => state.usuariosReducer);
  const navigate = useNavigate();
  const { t } = useTranslation();
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
  const [nextFestivals, setNextFestivals] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getLocalizaciones();

      setLocations(data);
    };
    const fetchNextFestivals = async () => {
      const data = await getNextFestivals();

      setNextFestivals(data);
    };
    fetchLocations();
    fetchNextFestivals();
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

    setPendingData(finalFormData);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    handleFormSubmit(pendingData);
  };

  const status = watch("status");
  const isDraft = status === "draft";
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState();
  const statusOptions = [
    { label: t('forms.statusOptions.ok'), value: "Ok" },
    { label: t('forms.statusOptions.draft'), value: "draft" },
    { label: t('forms.statusOptions.cancelled'), value: "cancelled" },
    { label: t('forms.statusOptions.delayed'), value: "delayed" },
    { label: t('forms.statusOptions.newDate'), value: "new_date" },
    { label: t('forms.statusOptions.soldout'), value: "soldout" },
  ];
  const handleIcon = () => {
    navigate(-1);
  };

  return (
    <>
      <EventoConfirmModal
        show={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
        data={pendingData}
        festivals={nextFestivals}
        imagePreview={imageFile}
        isSubmitting={isSubmitting}
      />
      <div className="cardCrearEvento">
        <AiFillCloseSquare className="close-icon" onClick={handleIcon} />
        <h1>{t('createEvent.title')}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="div-inputCrearEvento">
            <label>{t('forms.title')}</label>
            <input
              className="inputCrearEvento"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="error-message">{t('forms.titleRequired')}</span>
            )}
          </div>
          <div className="div-inputCrearEvento">
            <label>{t('forms.artist')}</label>
            <input
              className="inputCrearEvento"
              {...register("artist", { required: !isDraft })}
            />
            {errors.artist && (
              <span className="error-message">{t('forms.artistRequired')}</span>
            )}
          </div>
          <div className="infoCrearEvento">
            <label>{t('forms.information')}</label>
            <textarea
              {...register("content", { required: false })}
              className="inputCrearEvento"
            />

            <div className="previewWrapper">
              <strong>{t('forms.previewLabel')}</strong>
              <div className="previewContent">
                {formatContent(watch("content"))}
              </div>
            </div>
          </div>

          <div className="div-inputCrearEvento">
            <LocalizacionSelector
              locations={locations}
              setLocations={setLocations}
              onChange={handleLocalizacionChange}
              addLocalizacion={addLocalizacion}
            />
            <input
              {...register("site", { required: !isDraft })}
              tabIndex={-1}
              aria-hidden="true"
              style={{
                opacity: 0,
                height: 0,
                width: 0,
                position: "absolute",
                pointerEvents: "none",
              }}
            />
            {errors.site && (
              <span className="error-message">{t('forms.locationRequired')}</span>
            )}
          </div>
          <div className="div-inputCrearEvento">
            <label>{t('forms.price')}</label>
            <input
              className="inputCrearEvento"
              type="text"
              {...register("price", {
                required: !isDraft,
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: t('forms.priceDecimals'),
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
                {t('forms.priceInvalid')}
              </span>
            )}
          </div>
          {showBuyTicketField ? (
            <div className="div-inputCrearEvento">
              <label>{t('forms.buyUrl')}</label>
              <input className="inputCrearEvento" {...register("buy_ticket")} />
            </div>
          ) : (
            <div className="div-checkbox">
              <label>{t('forms.reverseTicket')}</label>
              <input type="checkbox" {...register("payWhatYouWant")} />{" "}
            </div>
          )}
          <div className="fechaCrearEvento">
            <label>{t('forms.date')}</label>
            <input
              className="inputCrearEvento"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              {...register("day_start", { required: !isDraft })}
            />
            {errors.day_start && (
              <span className="error-message">{t('forms.dateRequired')}</span>
            )}
            <label>{t('forms.time')}</label>
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
              <span className="error-message">{t('forms.timeRequired')}</span>
            )}
          </div>
          <div className="div-inputCrearEvento">
            <label>{t('forms.festival')}</label>
            <select
              className="inputCrearEvento"
              name="festival"
              {...register("festival")}
            >
              <option value="">{t('forms.none')}</option>
              {nextFestivals.map((festival) => (
                <option key={festival._id} value={festival._id}>
                  {festival.name}
                </option>
              ))}
            </select>
          </div>

          <div className="div-inputCrearEvento">
            <label>{t('forms.genre')}</label>
            <input className="inputCrearEvento" {...register("genre")} />
          </div>
          <div className="div-inputCrearEvento">
            <label>{t('forms.youtubeId')}</label>
            <input
              className="inputCrearEvento"
              {...register("youtubeVideoId")}
            />
          </div>
          <div className="div-inputCrearEvento">
            <label>{t('forms.moreInfoLabel')}</label>
            <input className="inputCrearEvento" {...register("url")} />
          </div>
          <div className="div-inputCrearEvento">
            <label>{t('forms.featuredEvent')}</label>
            <input
              className="inputCrearEvento"
              type="checkbox"
              {...register("highlighted")}
            />{" "}
          </div>
          <div className="div-inputCrearEvento">
            <label>{t('forms.statusLabel')}</label>
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
            <label>{t('forms.image')}</label>

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
              type="button"
              text={t('buttons.cancel')}
              variant="medium"
              onClick={handleIcon}
            />
            <Button
              type="submit"
              text={t('buttons.submitEvent')}
              variant="medium"
              isSubmitting={isSubmitting}
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default FormularioCrearEvento;
