import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { RiUser3Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { saveScrollPosition } from "../../shared/saveScrollPosition";
import { Zoom, toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Navbar = () => {
  const { user } = useSelector((state) => state.usuariosReducer);
  const { t } = useTranslation();
  const [loggedIn, setloggedIn] = useState(false);
  useEffect(() => {
    if (user && !loggedIn) {
      toast(t("login.hello", { username: user.username }), {
        className: "hello-toast",
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
      setloggedIn(true);
    } else if (!user) {
      setloggedIn(false);
    }
  }, [user]);

  return (
    <>
      <div className="header-user">
        {/* {user && user.role === 2 && (
              <Link to="/borradores" className="header-drafts">
                <FiEdit size={24} />
              </Link>
            )} */}
        <LanguageSwitcher />
        {user ? (
          user.avatar ? (
            <div className="avatar-container">
              <Link to="/perfil" onClick={saveScrollPosition}>
                <img className="header_avatar" src={user.avatar} alt="avatar" />
              </Link>
            </div>
          ) : (
            <div className="avatar-container">
              <Link to="/perfil">
                <RiUser3Fill className="header_avatar no_picture " />
              </Link>
            </div>
          )
        ) : (
          <div  >
          <Link to="/login">
            <RiUser3Fill  className="header_avatar no_logged"/>
          </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
