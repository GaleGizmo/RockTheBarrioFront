import React, { useEffect } from "react";
import "./Navbar.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { logout, setUser } from "../../redux/usuarios/usuarios.actions";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usuariosReducer);

  return (
    <div>
      {user ? (
        <div className="disp">
        <div className="header-user">
          <h3 className="h3">Hola, {user.username}</h3>
          {user.avatar && <img className="header_avatar" src={user.avatar} alt="avatar" />}
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
              <span>
                <Button text="Salir" type="medium" onClick={logout} />
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
              <Button text="Registrarse" type="medium" />
            </span>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
