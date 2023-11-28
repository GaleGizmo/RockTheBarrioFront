import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader">
      <span style={{ "--delay": 2 }}></span>
      <span style={{ "--delay": 4 }}></span>
      <span style={{ "--delay": 6 }}></span>
      <span style={{ "--delay": 8 }}></span>
      <span style={{ "--delay": 10 }}></span>
    </div>
  );
};

export default Loader;
