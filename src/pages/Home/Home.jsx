import React from "react";
import "./Home.css";
import EventosList from "../../components/EventosList/EventosList";
import { BsFillArrowUpCircleFill, BsInfoCircleFill } from "react-icons/bs";


const Home = () => {
  return (
    <div className="home">
      <div className="header-listado">
      <div className="black-border">
        <h1>LISTADO DE EVENTOS</h1>
        <p>Preme <BsInfoCircleFill style={{ color: 'var(--icon-color)' }}/> para ver a ficha completa</p>
        </div>
      </div>
      <EventosList />
      <BsFillArrowUpCircleFill className="scroll-up" onClick={()=>{window.scrollTo(0,0)}}/>
    </div>
  );
};

export default Home;
