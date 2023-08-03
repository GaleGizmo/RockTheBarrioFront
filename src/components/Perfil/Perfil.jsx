import React, { useEffect } from "react";
import Button from "../../components/Button/Button";
import { clearMensajes, sendEventosSemanales } from "../../redux/eventos/eventos.actions";
import { useDispatch, useSelector } from "react-redux";
import "./Perfil.css"

const Perfil = ({ userData, onEditClick }) => {

  const {error, eventosEnviados}=useSelector((state)=>state.eventosReducer)
  
  const dispatch = useDispatch();
  const sendEventos=()=>{
    dispatch(sendEventosSemanales())
  }
  useEffect(() => {
    // Función para limpiar el mensaje después de un cierto tiempo.
    const limpiarMensaje = () => {
      setTimeout(() => {
        dispatch(clearMensajes());
      }, 5000);
    };

    // Si hay un mensaje de eventos enviados o error, llama a la función para limpiarlos.
    if (eventosEnviados || error) {
      limpiarMensaje();
    }
  }, [eventosEnviados, error, dispatch]);
  return (
    <div>
      <p>Email: <span className="perfil__user-data">{userData.email}</span></p>
      <p>Usuario:<span className="perfil__user-data">{userData.username}</span> </p>
      {userData.avatar && (
        <div className="perfil-avatar">
          <img className="header_avatar" src={userData.avatar} alt="avatar" />
        </div>
      )}
      <p>Notificar novo evento: {userData.newevent ? (<span className="perfil__user-data">Sí</span>):(<span className="perfil__user-data">No</span>)}</p>

      <p>Newsletter semanal: {userData.newsletter ? (<span className="perfil__user-data">Sí</span>):(<span className="perfil__user-data">No</span>)}</p>
      {userData.role===2 && (
        <Button text="Newsletter" type="medium" onClick={sendEventos}/>
      )}
      {eventosEnviados && <p className="success-message">{eventosEnviados}</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="margin-botonReg">
        <Button text="Editar Datos" type="medium" onClick={onEditClick} />
      </div>
    </div>
  );
};

export default Perfil;
