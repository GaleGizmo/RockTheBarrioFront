import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getEventoById } from "../../redux/eventos/eventos.actions";
import EventoEdicion from "../../components/EditarEvento/EventoEdicion";
import "./EditarEvento.css";

const EditarEvento = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getEventoById(id));
  }, []);
  const { evento } = useSelector((state) => state.eventosReducer);

  return (
    <div className="editarEvento">
      {evento && <EventoEdicion evento={evento} navigate={navigate} />}
    </div>
  );
};

export default EditarEvento;
