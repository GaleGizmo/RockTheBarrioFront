import React, { useEffect } from "react";
import "./Navbar.css";
import Button from "../Button/Button";
import {AiOutlinePoweroff} from 'react-icons/ai';
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
            <h3 className="h3">Ola, {user.username}</h3>
            {user.avatar && (
              <img className="header_avatar" src={user.avatar} alt="avatar" />
            )}
          </div>
          <div className="div-boton">
            <div>
              {user && user.role === 2 && (
                <Link to="/crear-evento">
                  <span>
                    <Button text="Crear Evento" type="medium" />
                  </span>
                </Link>
              )}
            </div>
            <Link to="/">
              <span className="header-salir">
             
                <Button text="Saír" type="medium" onClick={logout} />
              </span>
              <span className="icono-salir">
              <SwitchIcon onClick={logout}/>
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <Link to="/login">
            <span>
              <Button text="Acceder" type="medium" />
            </span>
          </Link>
          <Link to="date-de-alta">
            <span>
              <Button text="Rexistrarse" type="medium" />
            </span>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
