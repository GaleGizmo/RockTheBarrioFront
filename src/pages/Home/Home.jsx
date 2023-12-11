import React from "react";
import "./Home.css";
import EventosList from "../../components/EventosList/EventosList";
import {
  BsArrowUp,

} from "react-icons/bs";

const Home = () => {
  return (
    <div className="home">
      <div className="listado-border">
      <h1 className="listado-text">PROXIMOS EVENTOS</h1>
      </div>
      <div className="listado-container">
        <h1 className="listado-text">PROXIMOS EVENTOS</h1>
      </div> 
      <EventosList />
      <BsArrowUp
        className="scroll-up"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
};

export default Home;
