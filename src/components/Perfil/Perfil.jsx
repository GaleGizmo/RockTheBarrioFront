import React from "react";
import Button from "../../components/Button/Button";

const Perfil = ({ userData, onEditClick }) => {
  return (
    <div>
      <p>Email: {userData.email}</p>
      <p>Usuario: {userData.username}</p>
      {userData.avatar && (
        <div className="perfil-avatar">
          <img className="header_avatar" src={userData.avatar} alt="avatar" />
        </div>
      )}
      <div className="margin-botonReg">
        <Button text="Editar" type="large" onClick={onEditClick} />
      </div>
    </div>
  );
};

export default Perfil;
