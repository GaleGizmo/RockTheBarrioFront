import React from "react";
import "./Legal.css";
import { Helmet } from "react-helmet";
import { AiFillCloseSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Terminos = () => {
const navigate = useNavigate()
const { t } = useTranslation("terms");
  const handleIcon = ()=>{
    navigate(-1)
  }

  const termsItems = t("items", { returnObjects: true });

  return (
    <div className="cardLegal">
        <Helmet>
    <title>{t("title")}</title>
            <meta property="description" content={t("metaDescription")} />
    </Helmet>
     <AiFillCloseSquare className="close-icon" onClick={handleIcon}/>
      <h1>{t("title")}</h1>
      <h3>{t("intro")}</h3>
      <ul>
        {Array.isArray(termsItems) && termsItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>{t("acceptanceHeading")}</h3>
      <p>{t("acceptanceText")}</p>
    </div>
  );
};

export default Terminos;
