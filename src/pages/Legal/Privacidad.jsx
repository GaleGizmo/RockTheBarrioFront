import React from "react";
import "./Legal.css";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";
import { Helmet } from "react-helmet";

const Privacidad = () => {
  const navigate = useNavigate();
  const handleIcon = () => {
    navigate(-1);
  };
  return (
    <div className="cardLegal">
        <Helmet>
    <title>POLÍTICA DE PRIVACIDADE</title>
            <meta property="description" content="Política de privacidade da nosa web" />

           
    </Helmet>
      <AiFillCloseSquare className="close-icon" onClick={handleIcon} />
      <h1>POLITICA DE PRIVACIDADE</h1>
      <h3>Información que recollemos</h3>
      <p>
        Recollemos información persoal dos usuarios cando se rexistran no noso
        sitio web, cando se subscriben á nosa newsletter ou cando nos envían un
        correo electrónico. A información persoal que recollemos inclúe o seu
         correo electrónico, dirección IP e calquera outra
        información que proporcione voluntariamente.
      </p>

      <h3>Como utilizamos a túa información</h3>
      <p>
        Utilizamos a información persoal que recollemos para proporcionarchee os
        servizos que solicitaches, para mellorar o noso sitio web e para
        comunicarnos contigo. Tamén podemos utilizar a túa información
        persoal para te enviar información sobre os nosos produtos e servizos.
      </p>

      <h3>Con quen compartimos a túa información</h3>
      <p>
        Non compartimos a túa información persoal con terceiros sen o teu
        consentimento. Con todo, podemos compartir a túa información persoal con
        terceiros para te proporcionar os servizos que solicitaches, para mellorar
        o noso sitio web ou para cumprir coa lei.
      </p>

      <h3>Os teus dereitos</h3>
      <p>
        Tes dereito a acceder, corrixir ou eliminar a túa información persoal.
        Tamén tes dereito a te opoñer ao uso da túa información persoal. Para
        exercer estes dereitos, podes contactar connosco en 
        <Link to="mailto:rockthebarrio@gmail.com"> rockthebarrio@gmail.com</Link>.{" "}
      </p>
      <h3>Seguridade</h3>
      <p>
        Adoptamos medidas para protexer a túa información persoal. Estas medidas
        inclúen o uso de firewalls e cifrado para protexer a túa información
        persoal do acceso non autorizado.
      </p>
      <h3>Cambios na política de privacidade</h3>
      <p>
        Podemos actualizar esta política de privacidade de vez en cando. Se
        realizamos algún cambio importante nesta política de privacidade,
        serache notificado por correo electrónico ou mediante un aviso no noso
        sitio web.{" "}
      </p>
      <h3>Contacto</h3>
      <p>
        Se tes algunha pregunta sobre esta política de privacidade, podes
        contactar connosco en <Link to="mailto:rockthebarrio@gmail.com"> rockthebarrio@gmail.com</Link>.{" "}
      </p>
    </div>
  );
};

export default Privacidad;
