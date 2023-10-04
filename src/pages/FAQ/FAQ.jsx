import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  FluentProvider,
  teamsDarkTheme,
  teamsLightTheme,
} from "@fluentui/react-components";
import React from "react";
import "./FAQ.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiCalendarAlt } from "react-icons/bi";
import { BsInfo, BsInfoCircleFill } from "react-icons/bs";

const faqData = [
  {
    title: "Que estou vendo ao entrar na web?",
    content: `A páxina principal amosa un listado de eventos ordeados cronolóxicamente. Hai un buscador á esquerda e un calendario á dereita. En móbiles tanto o calendario (oculto por defecto) coma o buscador están baixo a cabeceira e o calendario amósase clicando neste icono: `,
  },
  {
    title: "Que información hai de cada evento?",
    content:
      "Na páxina principal amósase para cada evento: nome do evento, artista(s), lugar, data, xénero musical, prezo (se procede) e número de comentarios dos usuarios.",
  },
  {
    title: "Para que é o icono de Info?  ",
    content:
      "Clicando neste icono accédese á páxina detallada de cada evento onde, ademáis dos datos amosados na páxina principal, temos: descripción (máis ou menos detallada) do evento, video de YouTube cun tema do artista, enlace á web de compra de entradas e botón de '+Info' que leva a unha url externa con máis datos do artista ou do evento. Aquí podense ver tamén os comentarios dos usuarios sobor do evento.",
  },
  {
    title: "Podo ver información de eventos xa pasados?",
    content:
      "Si, ainda que a páxina principal amosa por defecto só os eventos futuros, hai dous xeitos de ver información de eventos xa acontecidos: ben a través do calendario ou ben usando o buscador.",
  },
  {
    title: "Que información teño no calendario?",
    content:
      "No calendario, os días nos que hai un ou máis eventos están marcados de cor laranxa. Se hai maís dun evento nunha data, esa data leva ademáis un signo '+' á dereita do número. Clicando nos días que teñen eventos, amósase un despregable con enlaces á información de cada un dos eventos dese día.",
  },
  {
    title: "Como funciona o buscador?",
    content:
      "Por defecto, a palabra ou palabras que se introduzan búscanse en todos os campos principais dun evento (nome do evento, artista, lugar e  xénero). Para axilizar a búsqueda é aconsellabel marcar o campo concreto no que se quere buscar. Ademáis, pódese restrinxir a búsqueda só a eventos gratuitos, que tiveran lugar nunhas datas concretas, ou os que o usuario teña engadidos a favoritos. O resultado da búsqueda, salvo que se marque a casiña 'Inclue eventos pasados', devolverá só os eventos a partires da data actual. ",
  },
  {
    title: "Como volto á lista de eventos por defecto?",
    content:
      "Os resultados da búsqueda permañecen en pantalla ata que se clica o botón 'Limpar' do buscador. Clicando no logo da web que está na parte superior esquerda tamén se carga o listado de eventos por defecto.",
  },
  {
    title: "Como engado eventos a favoritos?",
    content:
      "Tanto na páxina principal como na de detalles de cada evento, pódese engadir un evento a favoritos clicando neste icono: ",
  },
  {
    title: "Non vexo os iconos que dis para engadir a favoritos",
    content:
      "Para poder engadir un evento a favoritos debes rexistrarte antes na web. Unha vez logueado xa poderás ver o icono para engadir un evento a favoritos, e máis facer búsquedas que incluan só eventos favoritos. ",
  },
  {
    title: "Que vantaxes ten rexistrarse?",
    content:
      "Ainda que a información dos eventos está dispoñibel para calquera que visite a web, os usuarios rexistrados teñen acceso a: notificación de eventos via email, engadir comentarios e valoracións aos eventos, e engadir eventos a favoritos.",
  },
  {
    title: "Cantas notificacións me vas mandar? Non máis spam, por favor!",
    content:
      "Calma, a frecuencia de notificacións decidirala ti ao te rexistrar. Marcando as casiñas correspondentes podes elexir entre: recibir un email semanal cos eventos programados para esa semana (mándase os luns pola mañá), recibir notificacións puntuais cando se engadan novos eventos, ou non recibir ningunha notificación. ",
  },
  {
    title: "Pois marco as notificacións semanais, con iso chega, non?",
    content:
      "En xeral si. Mais dado que algúns locais avisan dos eventos con poucos días de antelación, pode pasar que se engadan eventos durante a semana que non estaban incluidos no email semanal. A solución sería marcar tamén as notificacións puntuais, ou visitar a web regularmente. ",
  },
  {
    title: "E para que vale engadir eventos a favoritos?",
    content:
      "Como usuario rexistrado, cando engadas un evento a favoritos recibirás un recordatorio do mesmo unha semana antes da data do evento, e outro recordatorio o día previo ao evento. ",
  },
  {
    title: "Como podo cambiar os datos da miña conta?",
    content:
      "Facendo clic no teu nome de usuario ou no teu avatar, abriras a páxina do teu perfil. Nela hai un botón de 'Editar datos' que che permitirá cambiar o teu nome de usuario, o email co que te rexistraches, o teu avatar, e as túas preferencias de notificacións. ",
  },
];
const FAQ = () => {
  return (
    <div className="cardFaq-container">
      <div className="cardFaq">
        <h1>Preguntas frecuentes</h1>
        <FluentProvider>
          <Accordion collapsible>
            {faqData.map((comentario, index) => (
              <AccordionItem key={index} value={index.toString()}>
                <AccordionHeader>
                  <div className="faq-titulo">{comentario.title} 
                  {index==2 && <span className="faq-infoContainer" > <BsInfoCircleFill className="faq-infoIcon"/><BsInfo className="faq-infoInner" /> </span>}</div>
                </AccordionHeader>
                <AccordionPanel>
                  {comentario.content && (
                    <p className="faq-contenido">{comentario.content}
                    {index==0 && <FaRegCalendarAlt/>}
                    {index==7 && (<span className="faq-favIcon"><BiCalendarAlt/></span>)}</p>
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