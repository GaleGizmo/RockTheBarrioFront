import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBorradorById } from "../../redux/eventos/eventos.actions";
import { useEffect } from "react";
import EventoEdicion from "../../components/EditarEvento/EventoEdicion";

const EditarBorrador = () => {
    const { id } = useParams();
      const dispatch = useDispatch();
      const navigate = useNavigate();
      useEffect(() => {
        dispatch(getBorradorById(id));
      }, []);
      const { borrador } = useSelector((state) => state.eventosReducer);
    return (
        <div>
      {borrador &&  <EventoEdicion evento={borrador} navigate={navigate} />}
        </div>
    );
    }
export default EditarBorrador;