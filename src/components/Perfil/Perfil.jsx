import React from "react";
import Button from "../../components/Button/Button";
import { sendEventosSemanales } from "../../redux/eventos/eventos.actions";
import { useDispatch } from "react-redux";

const Perfil = ({ userData, onEditClick }) => {
  const dispatch = useDispatch();
  const sendEventos=()=>{
    dispatch(sendEventosSemanales())
  }
  return (
    <div>
      <p>Email: {userData.email}</p>
      <p>Usuario: {userData.username}</p>
      {userData.avatar && (
        <div className="perfil-avatar">
          <img className="header_avatar" src={userData.avatar} alt="avatar" />
        </div>
      )}
      {userData.role===2 && (
        <Button text="Newsletter" type="medium" onClick={sendEventos}/>
      )}
      <div className="margin-botonReg">
        {/* <Button text="Editar" type="large" onClick={onEditClick} /> */}
      </div>
    </div>
  );
};

export default Perfil;
