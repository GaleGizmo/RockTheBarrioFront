import { getEventosFromFestivalAction } from "../../redux/eventos/eventos.actions";
import { useDispatch } from "react-redux";
import "./EventoEspecial.css";

const EventoEspecial = ({ eventoData }) => {
  const dispatch = useDispatch();
  const showSpecialEvent = () => {
    dispatch(getEventosFromFestivalAction(eventoData._id));
  };

  return (
    <div className="evento-especial" onClick={showSpecialEvent}>
      <img src={eventoData.image} alt={eventoData.name} />
    </div>
  );
};
export default EventoEspecial;
