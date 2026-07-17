import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addEvento, editEvento } from "../../redux/eventos/eventos.actions";
import SubirImagen from "../SubirImagen/SubirImagen";
import Button from "../Button/Button";
import { utcToZonedTime, format } from "date-fns-tz";
import "./EventoEdicion.css";
import { AiFillCloseSquare } from "react-icons/ai";
import {
  getLocalizaciones,
  addLocalizacion,
  getNextFestivals,
} from "../../shared/api";
import LocalizacionSelector from "../LocalizacionSelector/LocalizacionSelector";
import { useEffect } from "react";
import formatContent from "../../utils/formatContent.jsx";
import EventoConfirmModal from "../EventoConfirmModal/EventoConfirmModal";
import { useTranslation } from "react-i18next";

const EventoEdicion = ({ evento, navigate }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasDeletedImage, setHasDeletedImage] = useState(false);
  const [doPublish, setDoPublish] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingData, setPendingData] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const isDraft = evento.status === "draft";
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  //manejo de localizaciones
  const [locations, setLocations] = useState([]);
  const [nextFestivals, setNextFestivals] = useState([]);

  // Sincronizar el valor del select festival con el evento cargado
  useEffect(() => {
    if (nextFestivals.length > 0 && evento.festival) {
      const festivalId = evento.festival?._id || evento.festival;
      setValue("festival", festivalId);
    }
  }, [nextFestivals, evento.festival, setValue]);
  const [imageFile, setImageFile] = useState();
  const statusOptions = [
    { label: t('forms.statusOptions.ok'), value: "Ok" },
    { label: t('forms.statusOptions.cancelled'), value: "cancelled" },
    { label: t('forms.statusOptions.delayed'), value: "delayed" },
    { label: t('forms.statusOptions.newDate'), value: "new_date" },
    { label: t('forms.statusOptions.soldout'), value: "soldout" },
    { label: t('forms.statusOptions.draft'), value: "draft" },
  ];

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

  useEffect(() => {
    if (evento.site) {
      setValue("site", evento.site);
      setValue("location", evento.location?._id || evento.location || "");
    }
  }, [evento.site, evento.location, setValue]);

  const handleLocalizacionChange = ({ site, location }) => {
    setValue("site", site, { shouldValidate: true });
    setValue("location", location);
  };

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
    setPendingData(editedEvento);
    setPendingAction("save");
    setShowConfirmModal(true);
  };
  const handleClone = (data) => {
    if (!data.image && evento.image) {
      data.image = evento.image;
    }
    const editedEvento = prepareData(data, evento);
    setPendingData(editedEvento);
    setPendingAction("clone");
    setShowConfirmModal(true);
  };
  const handleConfirm = () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);
    if (pendingAction === "clone" || pendingData.publish) {
      dispatch(addEvento(pendingData, navigate, { user: evento.user_creator }));
    } else {
      dispatch(editEvento(evento._id, pendingData, navigate));
    }
  };
  function prepareData(data, evento) {
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
    if (!data.location) {
      data.location = evento.location?._id;
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
    <>
    <EventoConfirmModal
      show={showConfirmModal}
      onCancel={() => setShowConfirmModal(false)}
      onConfirm={handleConfirm}
      data={pendingData}
      festivals={nextFestivals}
      actionLabel={pendingAction === "clone" ? t('buttons.clone') : t('buttons.save')}
      imagePreview={imageFile}
      isSubmitting={isSubmitting}
    />
    <div className="cardCrearEvento">
      <AiFillCloseSquare className="close-icon" onClick={handleIcon} />
      <h1>{t('editEvent.title')}</h1>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="div-inputCrearEvento">
          <label>{t('forms.title')}:</label>
          <input
            className="inputCrearEvento"
            type="text"
            name="title"
            defaultValue={evento.title}
            onChange={handleInputChange}
            {...register("title", { required: true })}
          />
          {errors.title && <span>{t('forms.titleRequired')}</span>}
        </div>
        <div className="div-inputCrearEvento">
          <label>{t('forms.artist')}:</label>
          <input
            className="inputCrearEvento"
            type="text"
            name="artist"
            defaultValue={evento.artist}
            onChange={handleInputChange}
            {...register("artist", { required: !isDraft })}
          />
          {errors.artist && <span>{t('forms.artistRequired')}</span>}
        </div>
        <div className="div-inputCrearEvento">
          <LocalizacionSelector
            defaultLocationId={evento.location?._id}
            locations={locations}
            setLocations={setLocations}
            onChange={handleLocalizacionChange}
            addLocalizacion={addLocalizacion}
          />
          <input
            {...register("site", { required: !isDraft })}
            tabIndex={-1}
            aria-hidden="true"
            style={{ opacity: 0, height: 0, width: 0, position: "absolute", pointerEvents: "none" }}
          />
          {errors.site && (
            <span className="error-message">{t('forms.locationRequired')}</span>
          )}
        </div>
        <div className="infoCrearEvento">
          <label>{t('forms.content')}:</label>
          <textarea
            className="inputCrearEvento"
            defaultValue={evento.content}
            onChange={handleInputChange}
            name="content"
            {...register("content", { required: !isDraft })}
          ></textarea>
          {errors.content && <span>{t('forms.contentRequired')}</span>}

          <div className="previewWrapper">
            <strong>{t('forms.previewLabel')}</strong>
            <div className="previewContent">
              {formatContent(watch("content"))}
            </div>
          </div>
        </div>
        <div className="div-inputCrearEvento">
          <label>{t('forms.price')}:</label>
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
          {errors.price && <span>{t('forms.priceRequired')}</span>}
        </div>
        <div className="div-inputCrearEvento">
          <label>{t('forms.reverseTicket')}</label>
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
          <label>{t('forms.buyUrl')}</label>
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
          <label>{t('forms.eventDate')}</label>
          <input
            className="inputCrearEvento"
            type="date"
            name="day_start"
            defaultValue={evento.date_start.slice(0, 10)}
            onChange={handleInputChange}
            {...register("day_start", { required: !isDraft })}
          />
          {errors.date_start && <span>{t('forms.dateRequired')}</span>}
        </div>
        <div className="fechaCrearEvento">
          <label>{t('forms.startTime')}</label>
          <input
            className="inputCrearEvento"
            type="time"
            name="time_start"
            defaultValue={adjustTime(evento.date_start)}
            onChange={handleInputChange}
            {...register("time_start", { required: !isDraft })}
          />
          {errors.time_start && <span>{t('forms.timeRequired')}</span>}
        </div>

        <div className="div-inputCrearEvento">
          <label>{t('forms.festival')}</label>
          <select
            className="inputCrearEvento"
            name="festival"
            defaultValue={evento.festival?._id || evento.festival || ""}
            onChange={handleInputChange}
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
          <label>{t('forms.genre')}:</label>
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
          <label>{t('forms.youtubeId')}:</label>
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
          <label>{t('forms.moreInfoLabel')}:</label>
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
          <label>{t('forms.featured')}</label>
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
          <label>{t('forms.statusLabel')}</label>
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
            <label>{t('forms.publish')}</label>
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
          <label>{t('forms.image')}:</label>
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
          {((evento.image && !hasDeletedImage) || imageFile) && (
            <div className="delete-image-button">
              <Button
                text={t('buttons.deleteImage')}
                variant="small"
                onClick={removeImage}
              />
            </div>
          )}
        </div>
        <div className="edit__botons">
          <Button
            type="submit"
            text={t('buttons.save')}
            isSubmitting={isSubmitting}
            onClick={handleSubmit(handleSave)}
          />
          <Button type="button" text={t('buttons.cancel')} onClick={handleCancel} />
          <Button
            type="button"
            text={t('buttons.clone')}
            isSubmitting={isSubmitting}
            onClick={handleSubmit(handleClone)}
          />
        </div>
      </form>
    </div>
    </>
  );
};

export default EventoEdicion;
