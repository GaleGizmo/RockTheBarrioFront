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
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const FAQ = () => {
const navigate=useNavigate()
const { t } = useTranslation('faq');
const faqData = t('items', { returnObjects: true });

  const handleIcon = () => {
    navigate(-1);
  };
  return (
    <div className="cardFaq-container">
    <Helmet>
    <title>FAQ</title>
            <meta property="description" content="Preguntas frecuentes sobre a web" />

           
    </Helmet>
          <AiFillCloseSquare className="close-icon" onClick={handleIcon} />

      <div className="cardFaq">
        <h1>{t('title')}</h1>
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
