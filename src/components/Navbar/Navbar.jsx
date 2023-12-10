import React from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";
import { RiUser3Fill } from "react-icons/ri";
import { logout } from "../../redux/usuarios/usuarios.actions";
import { useSelector } from "react-redux";
import SwitchIcon from "../SwitchIcon/SwitchIcon";

const Navbar = () => {
  const { user } = useSelector((state) => state.usuariosReducer);

  return (
    <>
      {user ? (
        <div >
          <div className="header-user">
            <h3 className="h3">
              Ola, <Link to="/perfil">{user.username}</Link>
            </h3>
            {user.avatar ? (
              <div className="avatar-container">
                <Link to="/perfil">
                  <img
                    className="header_avatar"
                    src={user.avatar}
                    alt="avatar"
                  />
                </Link>
              </div>
            ) : (
              <div className="avatar-container">
                <Link to="/perfil">
                  <RiUser3Fill className="header_noavatar" />
                </Link>
              </div>
            )}
          </div>
          <div className="boton-salir">
            <Link to="/">
              <span className="icono-salir">
                <SwitchIcon onClick={logout} />
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div>
            <Link to="/login">
              <RiUser3Fill className="no-logged" />
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
