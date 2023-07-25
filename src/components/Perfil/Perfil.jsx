import React from "react";
import Button from "../../components/Button/Button";
import { sendEventosSemanales } from "../../redux/eventos/eventos.actions";
import { useDispatch } from "react-redux";
import "./Perfil.css"

const Perfil = ({ userData, onEditClick }) => {
  const dispatch = useDispatch();
  const sendEventos=()=>{
    dispatch(sendEventosSemanales())
  }
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
      <div className="margin-botonReg">
        <Button text="Editar Datos" type="medium" onClick={onEditClick} />
      </div>
    </div>
  );
};

export default Perfil;
