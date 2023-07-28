import React from 'react'
import "./Home.css";
import EventosList from '../../components/EventosList/EventosList';

const Home = () => {

 
  return (
    <div className="home-margin">
      <div className="header-listado"><h1 >LISTADO DE EVENTOS</h1>
      <p>Preme na imaxe ou no botón para ver a ficha completa</p></div>
    <EventosList/>

    </div>
  )
}

export default Home


