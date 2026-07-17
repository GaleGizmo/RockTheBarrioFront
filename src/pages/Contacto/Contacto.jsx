import React, { useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Contacto.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { addMessage } from "../../shared/api";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";

const Contacto = () => {
  const userData = useSelector((state) => state.usuariosReducer.user);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleIcon = () => {
    navigate(-1);
  };
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: userData?.username || "",
    email: userData?.email || "",
    type: "", // Obligatorio
    user: userData?._id || "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  // Manejar el cambio en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      formData.name = "Anónimo";
    }

    // Validación: tipo de mensaje obligatorio
    if (!formData.type) {
      newErrors.type = "O tipo de mensaxe é obrigatorio.";
    }

    // Validación: al menos el campo Asunto o Mensaje debe estar rellenado
    if (!formData.content) {
      newErrors.content = "Debes cubrir este campo.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Si no hay errores, devuelve true
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await addMessage(formData);
        toast.success("Mensaxe enviada correctamente", {
          style: { background: "#51e651" },
        });
        setFormData({
          name: "",
          email: "",
          type: "",
          user: userData?._id || "",
          content: "",
        });
        setErrors({});
      } catch (err) {
        console.error("Erro ao enviar o formulario:", err);
      }
    }
  };
  return (
    <div className="cardLegal">
      <AiFillCloseSquare className="close-icon" onClick={handleIcon} />
      <h1 className="medios-contacto_title">{t('contacto.title')}</h1>
      <div className="medios-contacto_items">
        <h2>
          <BiMailSend />
          <span>
            {" "}
            <Link to="mailto:rockthebarrio@gmail.com">
              rockthebarrio@gmail.com
            </Link>
          </span>
        </h2>
        <h2>
          <FaInstagram />
          <span>
            {" "}
            <Link to="https://www.instagram.com/rockthebarrio/">
              {" "}
              @rockthebarrio{" "}
            </Link>
          </span>
        </h2>
      </div>
      <form className="cardCrearEvento contactForm" onSubmit={handleSubmit}>
        <h2>{t('contacto.formTitle')}</h2>

        <div className="div-inputCrearEvento contactForm">
          <label htmlFor="name">
            {t('contacto.name')} <span style={{ color: "grey" }}>{t('contacto.optional')}</span>:
          </label>
          <input
            className="inputCrearEvento"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="div-inputCrearEvento contactForm">
          <label htmlFor="email">
            {t('contacto.email')} <span style={{ color: "grey" }}>{t('contacto.optional')}</span>:
          </label>
          <input
            className="inputCrearEvento"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="div-inputCrearEvento contactForm">
          <label htmlFor="type">
            {t('contacto.subject')} <span style={{ color: "red" }}>*</span>:
          </label>
          <select
            className="inputCrearEvento"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="">{t('contacto.chooseOption')}</option>
            <option value="Erro en evento">{t('contacto.eventError')}</option>
            <option value="Engade un evento">{t('contacto.addEvent')}</option>
            <option value="Suxerencia">{t('contacto.suggestion')}</option>
            <option value="Problema coa web">{t('contacto.webProblem')}</option>
            <option value="Outros">{t('contacto.others')}</option>
          </select>
          {errors.type && <p style={{ color: "red" }}>{errors.type}</p>}
        </div>

        <div className="infoCrearEvento contactForm">
          <label htmlFor="content">
            {t('contacto.message')} <span style={{ color: "red" }}>*</span>:
          </label>
          <textarea
            className="inputCrearEvento"
            id="content"
            name="content"
            style={{ minHeight: "100px" }}
            value={formData.content}
            onChange={handleInputChange}
          />
        </div>

        {errors.subject && <p style={{ color: "red" }}>{errors.subject}</p>}

        <Button type="submit" text={t('buttons.send')} variant="medium"></Button>
      </form>
    </div>
  );
};

export default Contacto;
