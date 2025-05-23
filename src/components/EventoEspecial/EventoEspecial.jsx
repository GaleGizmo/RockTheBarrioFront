import { setEventsOnSpecialEvent } from "../../redux/eventos/eventos.actions";
import { useDispatch } from "react-redux";
import "./EventoEspecial.css";
const EventoEspecial = () => {
    const dispatch = useDispatch();
  const showSpecialEvent = () => {
    dispatch(setEventsOnSpecialEvent("Ascensión 2025"));
  };

  return (
    <div className="evento-especial" onClick={showSpecialEvent}>
      <img src="https://res.cloudinary.com/dwv0trjwd/image/upload/v1748002270/rockthebarrio/ascension2025banner_kauqd0.jpg" alt="Ascension 2025" />
    </div>
  );
};
export default EventoEspecial;
