import React from "react";
import "./Legal.css";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Privacidad = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("privacy");
  const handleIcon = () => {
    navigate(-1);
  };
  return (
    <div className="cardLegal">
      <Helmet>
        <title>{t("title")}</title>
        <meta property="description" content={t("metaDescription")} />
      </Helmet>
      <AiFillCloseSquare className="close-icon" onClick={handleIcon} />
      <h1>{t("title")}</h1>
      <h3>{t("sections.collectedInfo.heading")}</h3>
      <p>{t("sections.collectedInfo.content")}</p>

      <h3>{t("sections.howWeUse.heading")}</h3>
      <p>{t("sections.howWeUse.content")}</p>

      <h3>{t("sections.sharing.heading")}</h3>
      <p>{t("sections.sharing.content")}</p>

      <h3>{t("sections.rights.heading")}</h3>
      <p>
        {t("sections.rights.contentBeforeEmail")}{" "}
        <Link to="mailto:rockthebarrio@gmail.com">
          {" "}
          rockthebarrio@gmail.com
        </Link>
        {t("sections.rights.contentAfterEmail")}{" "}
      </p>
      <h3>{t("sections.security.heading")}</h3>
      <p>{t("sections.security.content")}</p>
      <h3>{t("sections.policyChanges.heading")}</h3>
      <p>{t("sections.policyChanges.content")}</p>
      <h3>{t("sections.contact.heading")}</h3>
      <p>
        {t("sections.contact.contentBeforeEmail")}{" "}
        <Link to="mailto:rockthebarrio@gmail.com">
          {" "}
          rockthebarrio@gmail.com
        </Link>
        {t("sections.contact.contentAfterEmail")}
      </p>
    </div>
  );
};

export default Privacidad;
