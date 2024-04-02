import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  FluentProvider,
  
} from "@fluentui/react-components";
import React from "react";
import "./FAQ.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import {  BiHeart } from "react-icons/bi";
import {  BsInfoCircleFill } from "react-icons/bs";
import { AiFillCloseSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const faqData = [
  {
    title: "Que estou vendo ao entrar na web?",
    content: `A páxina principal amosa un listado de eventos ordeados cronolóxicamente, partindo da data actual. Hai un buscador á esquerda e un calendario á dereita. En móbiles tanto o calendario (oculto por defecto) coma o buscador están baixo a cabeceira e o calendario amósase clicando neste icono: `,
  },
  {
    title: "Que información hai de cada evento?",
    content:
      "Na páxina principal amósase para cada evento: nome do evento, artista(s), lugar, data, xénero musical, prezo (se procede) e número de comentarios dos usuarios. Pódense ver máis detalles de cada evento, así coma os comentarios (de habelos) facendo click na imaxe do evento ou no icono de Info:",
  },
  
  {
    title: "Podo ver información de eventos xa pasados?",
    content:
      "Si. Ainda que a páxina principal amosa por defecto só os eventos futuros, hai dous xeitos de ver información de eventos xa acontecidos: ben a través do calendario ou ben activando o switch na parte inferior do buscador.",
  },
  {
    title: "Que información teño no calendario?",
    content:
      "No calendario, os días nos que hai un ou máis eventos están marcados de cor turquesa. Se hai maís dun evento nunha data, esa data leva ademáis un signo '+' á dereita do número. Clicando nos días que teñen eventos, amósanse os eventos dese día ordeados por hora de inicio.",
  },
  {
    title: "Como funciona o buscador?",
    content:
      'Por defecto, a palabra que se introduza búscase en tódolos campos principais dos eventos: nome do evento, artista, lugar e  xénero.\n Cando se introduce máis dun termo de búsqueda devólvense os resultados que conteñan tódolos termos, salvo que se marque a casiña "Calquera termo" o que fará que se devolvan tódolos eventos que conteñan alomenos unha das palabras.\n Para axilizar a búsqueda é aconsellabel marcar o campo concreto no que se quere buscar. Ademáis, pódese restrinxir a búsqueda só a eventos gratuitos, que tiveran lugar nunhas datas concretas, ou os que o usuario teña engadidos a favoritos. O resultado da búsqueda, salvo que se active o switch "Eventos pasados", devolverá só os eventos a partires da data actual. ',
  },
  {
    title: "Como volto á lista de eventos por defecto?",
    content:
      "Os resultados da búsqueda permañecen en pantalla ata que se clica o botón 'Limpar' do buscador. Clicando no logo da web que está na parte superior esquerda tamén se carga o listado de eventos por defecto.",
  },
  {
    title: "Como engado eventos a favoritos e para que me serve facelo?",
    content:
      "Como usuario rexistrado, cando engadas un evento a favoritos recibirás un recordatorio do mesmo unha semana antes da data do evento, e outro recordatorio o día previo ao evento. Tanto na páxina principal como na de detalles de cada evento, pódese engadir un evento a favoritos clicando neste icono: ",
  },
  {
    title: "O icono que dis aparece inhabilitado",
    content:
      "Para poder engadir un evento a favoritos debes de te rexistrar primeiro na web. Unha vez logueado activarase o icono para engadir un evento a favoritos, e máis facer búsquedas que incluan só eventos favoritos. ",
  },
  {
    title: "Que vantaxes ten rexistrarse?",
    content:
      "Ainda que a información dos eventos está dispoñibel para calquera que visite a web, os usuarios rexistrados teñen acceso a: notificación de eventos via email, engadir comentarios e valoracións aos eventos, e engadir eventos a favoritos.",
  },
  {
    title: "Cantas notificacións me vas mandar? Non máis spam, por favor!",
    content:
      "Calma, a frecuencia de notificacións decidirala ti no proceso de rexistro. Marcando as casiñas correspondentes poderás elexir entre: recibir un email semanal cos eventos programados para esa semana (mándase os luns pola mañá), recibir notificacións puntuais cando se engadan novos eventos, ou non recibir ningunha notificación. ",
  },
  {
    title: "Pois marco as notificacións semanais, con iso chega, non?",
    content:
      "Case... Dado que algúns locais avisan dos eventos con poucos días de antelación, pode pasar que se engadan eventos durante a semana que non estaban incluidos no email semanal. A solución sería marcar tamén as notificacións puntuais, ou visitar a web regularmente. ",
  },

  {
    title: "Como podo cambiar os datos da miña conta?",
    content:
      "Facendo clic no teu nome de usuario ou no teu avatar, abriras a páxina do teu perfil. Nela hai un botón de 'Editar datos' que che permitirá cambiar o teu nome de usuario, o email co que te rexistraches, o teu avatar, e as túas preferencias de notificacións. ",
  },
  {
    title: "Hai aplicación para móbiles?",
    content: "Non hai aplicación coma tal, sen embargo a web está optimizada para uso en pantallas de calquera tamaño. Se tes a aberta a páxina nun smartphone e vas ao menú do navegador, pulsando 'Añadir a pantalla de inicio' crearás un acceso directo á web na pantalla do teléfono, o que a efectos prácticos será coma ter unha aplicación. "
  }
];

const FAQ = () => {
const navigate=useNavigate()
  const handleIcon = () => {
    navigate(-1);
  };
  return (
    <div className="cardFaq-container">
          <AiFillCloseSquare className="close-icon" onClick={handleIcon} />

      <div className="cardFaq">
        <h1>PREGUNTAS FRECUENTES</h1>
        <FluentProvider>
          <Accordion collapsible>
            {faqData.map((comentario, index) => (
              <AccordionItem key={index} value={index.toString()}>
                <AccordionHeader>
                  <div className="faq-titulo">{comentario.title} 
                 </div>
                </AccordionHeader>
                <AccordionPanel>
                  {comentario.content && (
                    <div className="faq-contenido">
                      {comentario.content.split('\n').map((linea, i) => 
                        <p key={i} >{linea} 
                        {index==0 && <FaRegCalendarAlt/>}
                      {index==6 && (<span className="faq-favIcon"><BiHeart/></span>)}
                      {index==1 && <span  > <BsInfoCircleFill className="faq-infoIcon"/> </span>}</p>
                      )}
                      
                    </div>
                  )}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </FluentProvider>
      </div>{" "}
    </div>
  );
};

export default FAQ;
