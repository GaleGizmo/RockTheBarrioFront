import React from "react";
import "./Legal.css";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";


const Privacidad = () => {
  const navigate = useNavigate();
  const handleIcon = () => {
    navigate(-1);
  };
  return (
    <div className="cardLegal">
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

      <h3>Como utilizamos a súa información</h3>
      <p>
        Utilizamos a información persoal que recollemos para proporcionarlle os
        servizos que solicitou, para mellorar o noso sitio web e para
        comunicarnos con vostede. Tamén podemos utilizar a súa información
        persoal para enviarlle información sobre os nosos produtos e servizos.
      </p>

      <h3>Con quen compartimos a súa información</h3>
      <p>
        Non compartimos a súa información persoal con terceiros sen o seu
        consentimento. Con todo, podemos compartir a súa información persoal con
        terceiros para lle proporcionar os servizos que solicitou, para mellorar
        o noso sitio web ou para cumprir coa lei.{" "}
      </p>

      <h3>Os seus dereitos</h3>
      <p>
        Ten dereito a acceder, corrixir ou eliminar a súa información persoal.
        Tamén ten dereito a opoñerse ao uso da súa información persoal. Para
        exercer estes dereitos, pode contactar connosco en 
        <Link to="mailto:rockthebarrio@gmail.com"> rockthebarrio@gmail.com</Link>.{" "}
      </p>
      <h3>Seguridade</h3>
      <p>
        Adoptamos medidas para protexer a súa información persoal. Estas medidas
        inclúen o uso de firewalls e cifrado para protexer a súa información
        persoal do acceso non autorizado.{" "}
      </p>
      <h3>Cambios na política de privacidade</h3>
      <p>
        Podemos actualizar esta política de privacidade de vez en cando. Se
        realizamos algún cambio importante nesta política de privacidade,
        seralle notificado por correo electrónico ou mediante un aviso no noso
        sitio web.{" "}
      </p>
      <h3>Contacto</h3>
      <p>
        Se ten algunha pregunta sobre esta política de privacidade, pode
        contactar connosco en <Link to="mailto:rockthebarrio@gmail.com"> rockthebarrio@gmail.com</Link>.{" "}
      </p>
    </div>
  );
};

export default Privacidad;
