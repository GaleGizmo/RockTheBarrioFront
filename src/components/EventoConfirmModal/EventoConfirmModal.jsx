import React from "react";
import Button from "../Button/Button";
import formatContent from "../../utils/formatContent.jsx";
import "./EventoConfirmModal.css";
import { useTranslation } from "react-i18next";

const EventoConfirmModal = ({
  show,
  onCancel,
  onConfirm,
  data,
  festivals = [],
  actionLabel,
  imagePreview = null,
  isSubmitting = false,
}) => {
  const { t, i18n } = useTranslation();
  if (!show || !data) return null;

  const resolvedActionLabel = actionLabel ?? t('buttons.confirm');

  const festivalName = data.festival
    ? festivals.find((f) => f._id === data.festival)?.name || data.festival
    : t('forms.none');

  const formatDate = (date) => {
    if (!date) return "—";
    try {
      const localeKey = i18n.language?.startsWith("es") ? "es-ES" : "gl-ES";
      return new Date(date).toLocaleString(localeKey, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return String(date);
    }
  };

  const imageCell = () => {
    if (imagePreview)
      return <img src={imagePreview} className="evento-confirm-img" alt="preview" />;
    if (typeof data.image === "string" && data.image)
      return <img src={data.image} className="evento-confirm-img" alt="preview" />;
    if (!data.image) return t('events.noImage');
    return t('events.newImageSelected');
  };

  const rows = [
    { label: t('forms.title'), value: data.title },
    { label: t('forms.artist'), value: data.artist },
    { label: t('forms.location'), value: data.site },
    { label: t('forms.date'), value: formatDate(data.date_start) },
    { label: t('forms.price'), value: data.price !== undefined ? `${data.price} €` : "—" },
    { label: t('forms.reverseTicket'), value: data.payWhatYouWant ? t('profile.yes') : t('profile.no') },
    data.buy_ticket ? { label: t('forms.buyUrl'), value: data.buy_ticket } : null,
    { label: t('forms.statusLabel'), value: data.status },
    { label: t('forms.festival'), value: festivalName },
    data.genre ? { label: t('forms.genre'), value: data.genre } : null,
    data.youtubeVideoId ? { label: t('forms.youtubeId'), value: data.youtubeVideoId } : null,
    data.url ? { label: t('forms.moreInfoLabel'), value: data.url } : null,
    { label: t('forms.featured'), value: data.highlighted ? t('profile.yes') : t('profile.no') },
    { label: t('forms.image'), value: imageCell() },
    data.content ? { label: t('forms.content'), value: <div className="evento-confirm-content">{formatContent(data.content)}</div> } : null,
  ].filter(Boolean);

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: "1050" }} />
      <div
        className="modal fade show"
        style={{ display: "block", zIndex: "1055" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable evento-confirm-dialog">
          <div className="modal-content estilo-modal">
            <div className="modal-header custom-header">
              <h5 className="modal-title">{t('modals.confirmEventData')}</h5>
            </div>
            <div className="modal-body evento-confirm-body">
              <table className="evento-confirm-table">
                <tbody>
                  {rows.map(({ label, value }) => (
                    <tr key={label}>
                      <td className="evento-confirm-label">{label}</td>
                      <td className="evento-confirm-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer justify-content-center">
              <Button text={t('buttons.cancel')} variant="medium" onClick={onCancel} />
              <Button text={resolvedActionLabel} variant="medium" onClick={onConfirm} isSubmitting={isSubmitting} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventoConfirmModal;
