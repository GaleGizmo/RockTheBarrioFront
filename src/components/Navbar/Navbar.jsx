import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { RiUser3Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { saveScrollPosition } from "../../shared/saveScrollPosition";
import {  Zoom, toast } from "react-toastify";

const Navbar = () => {
  const { user } = useSelector((state) => state.usuariosReducer);
  const [loggedIn, setloggedIn]=useState(false)
  useEffect(() => {
    if (user && !loggedIn) {
      toast(`Ola, ${user.username}`, {
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
      {user ? (
        <div >
          <div className="header-user">
           
            {user.avatar ? (
              <div className="avatar-container">
                <Link to="/perfil" onClick={saveScrollPosition}>
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
