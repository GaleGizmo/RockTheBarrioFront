import React, { useEffect } from "react";
import Button from "../../components/Button/Button";

import "./Perfil.css"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendEventosDiarios } from "../../redux/eventos/eventos.actions";

const Perfil = ({ userData, onEditClick }) => {

  const dispatch=useDispatch()

  const sendDiarios=()=>{
    try {
      dispatch(sendEventosDiarios())
      console.log("eventos diarios enviados");
    } catch (err) {
      console.error("Error al mandar eventos:", err)
    }
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

      <p>Mandar eventos da semana: {userData.newsletter ? (<span className="perfil__user-data">Sí</span>):(<span className="perfil__user-data">No</span>)}</p>
      <div>
              {userData && userData.role === 2 && (<>
                <Link to="/crear-evento">
                  <span className="boton-crear">
                    <Button text="Crear evento" type="medium" />
                  </span>
                </Link>
                <Button text="Eventos diarios" type="medium" onClick={sendDiarios}/>
                </>
              )}
            </div>
      <div className="margin-botonReg">
        <Button text="Editar Datos" type="medium" onClick={onEditClick} />
      </div>
    </div>
  );
};

export default Perfil;
