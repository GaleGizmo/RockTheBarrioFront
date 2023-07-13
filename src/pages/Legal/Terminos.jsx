import React from "react";
import "./Legal.css";

import { AiFillCloseSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Terminos = () => {
const navigate = useNavigate()
  const handleIcon = ()=>{
    navigate(-1)
  }
  return (
    <div className="cardLegal">
     <AiFillCloseSquare className="close-icon" onClick={handleIcon}/>
      <h1>TERMOS E CONDICIONS</h1>
      <h3>
        Ao se rexistrar neste sitio web, vostede acepta os seguintes termos e
        condicións:
      </h3>
      <ul>
        <li>
          Vostede é responsable de manter a confidencialidade do seu nome de
          usuario e contrasinal e é responsable de todas as actividades que
          ocorren baixo a súa conta.
        </li>
        <li>
          Vostede non utilizará este sitio web para ningún propósito ilegal ou
          non autorizado.
        </li>
        <li>
          Vostede non distribuirá ningún material que sexa danoso, ofensivo,
          discriminatorio ou difamatorio.
        </li>
        <li>
          Vostede non utilizará este sitio web para recopilar ou almacenar
          información persoal sobre outros usuarios sen o seu consentimento.
        </li>
        <li>
          Reservámonos o dereito de rescindir o seu acceso a este sitio web en
          calquera momento sen previo aviso.
        </li>
      </ul>
      <h3>Aceptación de termos e condicións</h3>
      <p>
        Ao se rexistrar neste sitio web, vostede acepta os termos e condicións
        anteriores. Se non está de acordo con estes termos e condicións, non
        debe rexistrarse neste sitio web.
      </p>
    </div>
  );
};

export default Terminos;
