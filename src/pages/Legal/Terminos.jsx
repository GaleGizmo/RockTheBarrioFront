import React from "react";
import "./Legal.css";
import { Helmet } from "react-helmet";
import { AiFillCloseSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Terminos = () => {
const navigate = useNavigate()
  const handleIcon = ()=>{
    navigate(-1)
  }
  return (
    <div className="cardLegal">
        <Helmet>
    <title>TERMOS DE USO</title>
            <meta property="description" content="Termos de uso da web" />

           
    </Helmet>
     <AiFillCloseSquare className="close-icon" onClick={handleIcon}/>
      <h1>TERMOS E CONDICIONS</h1>
      <h3>
        Ao te rexistrar neste sitio web, aceptas os seguintes termos e
        condicións:
      </h3>
      <ul>
        <li>
          Es ti mesmo o responsable de manter a confidencialidade do teu nome de
          usuario e contrasinal e es responsable de todas as actividades que
          ocorren baixo a túa conta.
        </li>
        <li>
          Non utilizarás este sitio web para ningún propósito ilegal ou
          non autorizado.
        </li>
        <li>
          Non distribuirás ningún material que sexa danoso, ofensivo,
          discriminatorio ou difamatorio.
        </li>
        <li>
          Non utilizarás este sitio web para recopilar ou almacenar
          información persoal sobre outros usuarios sen o seu consentimento.
        </li>
        <li>
          Reservámonos o dereito de rescindir o teu acceso a este sitio web en
          calquera momento sen previo aviso.
        </li>
      </ul>
      <h3>Aceptación de termos e condicións</h3>
      <p>
        Ao te rexistrar neste sitio web, aceptas os termos e condicións
        anteriores. Se non estás de acordo con estes termos e condicións, non te
        debes rexistrar neste sitio web.
      </p>
    </div>
  );
};

export default Terminos;
