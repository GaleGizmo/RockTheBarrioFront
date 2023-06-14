import React from "react";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="title">
        <Link to="/" className="link">
          <h1 className="title-font">ROC K THE BARRIO</h1>
        </Link>
      </div>
      <div className="navbar">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
