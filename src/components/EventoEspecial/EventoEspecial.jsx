import { setEventsOnSpecialEvent } from "../../redux/eventos/eventos.actions";
import { useDispatch } from "react-redux";
import "./EventoEspecial.css";
const EventoEspecial = () => {
  const dispatch = useDispatch();
  const showSpecialEvent = () => {
    dispatch(setEventsOnSpecialEvent("Feito a Man"));
  };

  return (
    <div className="evento-especial" onClick={showSpecialEvent}>
      <img
        src="https://res.cloudinary.com/dwv0trjwd/image/upload/v1754425915/rockthebarrio/feitoaman_banner_rwgnk1.jpg"
        alt="Festival Feito a Man"
      />
    </div>
  );
};
export default EventoEspecial;
