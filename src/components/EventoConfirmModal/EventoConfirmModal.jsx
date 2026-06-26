import React from "react";
import Button from "../Button/Button";
import formatContent from "../../utils/formatContent.jsx";
import "./EventoConfirmModal.css";

const EventoConfirmModal = ({
  show,
  onCancel,
  onConfirm,
  data,
  festivals = [],
  actionLabel = "Confirmar",
  imagePreview = null,
  isSubmitting = false,
}) => {
  if (!show || !data) return null;

  const festivalName = data.festival
    ? festivals.find((f) => f._id === data.festival)?.name || data.festival
    : "Ningún";

  const formatDate = (date) => {
    if (!date) return "—";
    try {
      return new Date(date).toLocaleString("gl-ES", {
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
    if (!data.image) return "Sen imaxe";
    return "Nova imaxe seleccionada";
  };

  const rows = [
    { label: "Título", value: data.title },
    { label: "Artista", value: data.artist },
    { label: "Lugar", value: data.site },
    { label: "Data", value: formatDate(data.date_start) },
    { label: "Prezo", value: data.price !== undefined ? `${data.price} €` : "—" },
    { label: "Entrada Inversa", value: data.payWhatYouWant ? "Si" : "Non" },
    data.buy_ticket ? { label: "URL compra", value: data.buy_ticket } : null,
    { label: "Estado", value: data.status },
    { label: "Festival", value: festivalName },
    data.genre ? { label: "Xénero", value: data.genre } : null,
    data.youtubeVideoId ? { label: "YouTube ID", value: data.youtubeVideoId } : null,
    data.url ? { label: "URL Info", value: data.url } : null,
    { label: "Destacado", value: data.highlighted ? "Si" : "Non" },
    { label: "Imaxe", value: imageCell() },
    data.content ? { label: "Contido", value: <div className="evento-confirm-content">{formatContent(data.content)}</div> } : null,
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
              <h5 className="modal-title">Confirmar datos do evento</h5>
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
              <Button text="Cancelar" variant="medium" onClick={onCancel} />
              <Button text={actionLabel} variant="medium" onClick={onConfirm} isSubmitting={isSubmitting} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventoConfirmModal;
