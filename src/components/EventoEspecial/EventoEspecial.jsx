import { setEventsOnSpecialEvent } from "../../redux/eventos/eventos.actions";
import { useDispatch } from "react-redux";
import "./EventoEspecial.css";
const EventoEspecial = () => {
  const dispatch = useDispatch();
  const showSpecialEvent = () => {
    dispatch(setEventsOnSpecialEvent("Apóstolo 2025"));
  };

  return (
    <div className="evento-especial" onClick={showSpecialEvent}>
      <img
        src="https://res.cloudinary.com/dwv0trjwd/image/upload/v1752695892/rockthebarrio/banner2_apostolo_2025_lps2s5.jpg"
        alt="Concertos do Apóstolo 2025"
      />
    </div>
  );
};
export default EventoEspecial;
