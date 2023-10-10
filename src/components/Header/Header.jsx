import React from "react";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFilteredEventos } from "../../redux/eventos/eventos.actions";

const Header = () => {
  const dispatch=useDispatch()
  const reloadEvents=()=>{
    dispatch(deleteFilteredEventos())
  }
  return (
    <div className="header">
      <div className="title">
        <Link to="/" className="link">
         
          <img src="/assets/logo.png" onClick={reloadEvents}></img>
        </Link>
      </div>
      
      <div className="navbar">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
