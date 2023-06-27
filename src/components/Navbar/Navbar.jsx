import React, { useEffect } from "react";
import "./Navbar.css";
import Button from "../Button/Button";
import { AiOutlinePoweroff } from "react-icons/ai";
import { Link } from "react-router-dom";
import { logout, setUser } from "../../redux/usuarios/usuarios.actions";
import { useDispatch, useSelector } from "react-redux";
import SwitchIcon from "../SwitchIcon/SwitchIcon";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usuariosReducer);

  return (
    <div>
      {user ? (
        <div className="disp">
          <div className="header-user">
            <h3 className="h3">
              Ola, <Link to="/perfil">{user.username}</Link>
            </h3>
            {user.avatar && (
              <div className="avatar-container">
                <img className="header_avatar" src={user.avatar} alt="avatar" />
              </div>
            )}
          </div>
          <div className="div-boton">
            <div>
              {user && user.role === 2 && (
                <Link to="/crear-evento">
                  <span className="boton-crear">
                    <Button text="Crear Evento" type="medium" />
                  </span>
                </Link>
              )}
            </div>
            <Link to="/">
            
              <span className="icono-salir">
                <SwitchIcon onClick={logout} />
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="no-logged">
            <Link to="/login">
              <Button text="Acceder" type="medium" />
            </Link>
            <Link to="date-de-alta">
              <Button text="Rexistrarse" type="medium" />
            </Link>{" "}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
