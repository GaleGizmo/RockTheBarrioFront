import React, { useState } from "react";
import "./Buscador.css";
import { BiChevronsUp } from "react-icons/bi";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import FilterEvents from "../../customhooks/Filter";
import { useDispatch } from "react-redux";
import {
  deleteFilteredEventos,
  setFilteredEventos,
} from "../../redux/eventos/eventos.actions";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { API } from "../../shared/api";
import Modal from "../Modal/Modal";
import SwitchButton from "../SwitchButton/SwitchButton";
import ToolTip from "../ToolTip/ToolTip";
import { IoIosSearch } from "react-icons/io";
import { AiTwotoneQuestionCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";


const Buscador = ({ eventos, user }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const isAdmin = user && user.role === 2;

  const [showAdvancedSearch, setShowAdavancedSearch] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchAll, setSearchAll] = useState(true);
  const [searchWithOr, setSearchWithOr] = useState(false);
  const [searchTitle, setSearchTitle] = useState(false);
  const [searchArtist, setSearchArtist] = useState(false);
  const [searchGenre, setSearchGenre] = useState(false);
  const [searchSite, setSearchSite] = useState(false);
  const [freeEvent, setFreeEvent] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [searchDate, setSearchDate] = useState(false);
  const [searchInitialDate, setSearchInitialDate] = useState("");
  const [searchFinalDate, setSearchFinalDate] = useState("");
  const [customDates, setCustomDates] = useState(false);
  const [pastEvents, setPastEvents] = useState(isAdmin);
  const [showLoader, setShowLoader] = useState(false);
  const [hovered, setHovered] = useState(false);

  let eventosToShow;
  let filteredResults = [];
  function showFilteredResults() {
    setShowLoader(false);

    if (filteredResults.length === 0) {
      setNoResults(true);
    } else {
      dispatch(setFilteredEventos(filteredResults));
    }
  }
  async function getAllEventos(filters, userData) {
    // Si no hay búsqueda, ni favoritos ni gratuito, no buscar
    const isInputEmpty = !filters.input || filters.input.trim() === "" || filters.input.length < 3;
    const isFavorites = !!filters.favorites;
    const isFreeEvent = !!filters.freeEvent;
    if (isInputEmpty && !isFavorites && !isFreeEvent) {
      setShowLoader(false);
      return;
    }
    try {
      const response = await API.get("/evento");
      eventosToShow = response.data;

      filteredResults = FilterEvents(eventosToShow, filters, userData, i18n.language);
      showFilteredResults();
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      throw error;
    }
  }

  async function getEventosEntreFechas(filters, userData, startDate, endDate) {
    try {
      const response = await API.post("/evento/eventosEntreFechas", {
        startDate,
        endDate,
      });
      eventosToShow = response.data;

      filteredResults = FilterEvents(eventosToShow, filters, userData, i18n.language);
      showFilteredResults();
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      throw error;
    }
  }

  const getNextDayOfWeek = (date, dayOfWeek) => {
    const resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7));
    return resultDate;
  };
  const isMonday = (date) => {
    return date.getDay() === 1;
  };

  const handleShowAdvancedSearch = () => {
    setShowAdavancedSearch(!showAdvancedSearch);
  };
  const handleSearchClick = () => {
    setShowAdavancedSearch(false);
    handleSubmit(onSubmit)();
  };
  const handleDateChange = (value) => {
    let initialDate, finalDate;
    const today = new Date();
    switch (value) {
      case "Esta semana":
        setCustomDates(false);
        initialDate = today;
        finalDate = getNextDayOfWeek(today, 0);
        break;
      case "Esta finde":
        setCustomDates(false);
        initialDate = getNextDayOfWeek(today, 5);
        finalDate = getNextDayOfWeek(today, 0);
        // Si hoy ya es domingo, saltar a la semana siguiente
        if (today.getDay() === 0) {
          initialDate.setDate(initialDate.getDate() + 7);
          finalDate.setDate(finalDate.getDate() + 7);
        }
        break;
      case "Este mes":
        setCustomDates(false);
        initialDate = today;
        finalDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "A vindeira semana":
        setCustomDates(false);
        let nextMonday = getNextDayOfWeek(today, 1);
        if (isMonday(today)) {
          nextMonday.setDate(nextMonday.getDate() + 7);
        }
        initialDate = nextMonday;
        finalDate = getNextDayOfWeek(nextMonday, 0);
        break;
      case "O vindeiro mes":
        setCustomDates(false);
        initialDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        finalDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
        break;
      case "Persoalizado":
        setCustomDates(true);

        return;
    }
    if (!customDates && initialDate) {
      setSearchInitialDate(initialDate);
      setSearchFinalDate(finalDate);
    }
  };

  const { register, handleSubmit, reset, setValue } = useForm();
  const onSubmit = (data) => {
    setShowLoader(true);

    data.searchWithOr = searchWithOr;
    data.searchAll = searchAll;
    data.searchArtist = searchArtist;
    data.searchSite = searchSite;
    data.searchTitle = searchTitle;
    data.searchGenre = searchGenre;
    data.freeEvent = freeEvent;
    data.favorites = favoritesOnly;
    data.searchInitialDate = "";
    data.searchFinalDate = "";
    if (searchDate) {
      data.searchDate = true;
      data.searchInitialDate = searchInitialDate;
      data.searchInitialDate.setHours(9, 0, 0, 0);
      data.searchFinalDate = searchFinalDate;
      data.searchFinalDate.setHours(23, 59, 0, 0);
    }

    const today = new Date();

    if (pastEvents) {
      getAllEventos(data, user);
    } else if (searchInitialDate && searchInitialDate < today) {
      let initialDate = new Date(searchInitialDate);
      let finalDate = new Date(searchFinalDate);

      getEventosEntreFechas(data, user, initialDate, finalDate);
    } else {
      eventosToShow = [...eventos];
      filteredResults = FilterEvents(eventosToShow, data, user, i18n.language);

      showFilteredResults();
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };
  const handleInputChange = (e) => {
    setValue("input", e.target.value, { shouldValidate: true });
  };

  const cleanFiltered = (event) => {
    event.preventDefault();
    reset({ input: "" });
    setSearchWithOr(false);
    setFreeEvent(false);
    setSearchDate(false);
    setSearchInitialDate(null);
    setSearchFinalDate(null);
    setSearchArtist(false);
    setSearchTitle(false);
    setSearchSite(false);
    setSearchGenre(false);
    setSearchAll(true);
    setFavoritesOnly(false);
    setCustomDates(false);
    setPastEvents(false);
    setShowAdavancedSearch(false);
    dispatch(deleteFilteredEventos());
  };
  const handleDisplayTooltip = () => {
    setHovered(!hovered);
  };
  return (
    <div className="buscador-container">
      {showLoader && <Modal show={true} showLoader={true} />}
      <ConfirmModal
        title={t('buscador.noResults')}
        p1={t('buscador.noResultsHint1')}
        p2={t('buscador.noResultsHint2')}
        buttonText={t('buttons.accept')}
        show={noResults}
        onConfirm={() => {
          setNoResults(false);
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="buscador-input_wrapper">
          <input
            type="text"
            placeholder={t('buscador.placeholder')}
            className="buscador-input"
            {...register("input")}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <IoIosSearch className="search_icon" onClick={handleSearchClick} />
          <p onClick={handleShowAdvancedSearch} className="buscador-avanzada">
            {showAdvancedSearch ? "" : t('buscador.advanced')}
          </p>
          <div
            className={`buscador-input_type ${
              showAdvancedSearch ? "show-advanced " : ""
            }`}
          >
            <input
              type="checkbox"
              checked={searchWithOr}
              onChange={(e) => {
                setSearchWithOr(e.target.checked);
              }}
            />
            <label
              className="label-info"
              onMouseEnter={handleDisplayTooltip}
              onMouseLeave={handleDisplayTooltip}
              onClick={handleDisplayTooltip}
            >
              <span>{t('buscador.anyTerm')} </span>{" "}
              <span>
                <AiTwotoneQuestionCircle />
              </span>
              {hovered && (
                <ToolTip
                  specificClass="termos-tooltip"
                  content={t('buscador.anyTermTooltip')}
                />
              )}
            </label>
            <label className="past-events">
              {t('buscador.pastEvents')}
              <SwitchButton
                isOn={pastEvents}
                handleToggle={() => setPastEvents(!pastEvents)}
              />
            </label>
          </div>
        </div>
        <div
          className={`buscador buscador-checks ${
            showAdvancedSearch ? "show-advanced" : ""
          }`}
        >
          <div className="buscador-checks_item">
            <label>{t('buscador.event')}</label>
            <input
              type="checkbox"
              checked={searchTitle}
              onChange={(e) => {
                setSearchTitle(e.target.checked);
                setSearchAll(!e.target.checked);
              }}
            />
          </div>
          <div className="buscador-checks_item">
            <label>{t('buscador.artist')}</label>
            <input
              type="checkbox"
              checked={searchArtist}
              onChange={(e) => {
                setSearchArtist(e.target.checked);
                setSearchAll(!e.target.checked);
              }}
            />
          </div>
          <div className="buscador-checks_item">
            <label>{t('buscador.place')}</label>
            <input
              type="checkbox"
              checked={searchSite}
              onChange={(e) => {
                setSearchSite(e.target.checked);
                setSearchAll(!e.target.checked);
              }}
            />
          </div>
          <div className="buscador-checks_item">
            <label>{t('buscador.genre')}</label>
            <input
              type="checkbox"
              checked={searchGenre}
              onChange={(e) => {
                setSearchGenre(e.target.checked);
                setSearchAll(!e.target.checked);
              }}
            />
          </div>
        </div>
        <div
          className={`buscador buscador-item ${
            showAdvancedSearch ? "show-advanced" : ""
          }`}
        >
          <div
            className={`buscador buscador-fav ${
              showAdvancedSearch ? "show-advanced" : ""
            }`}
          >
            <label>{t('buscador.free')}</label>
            <input
              type="checkbox"
              {...register("freeEvent")}
              checked={freeEvent}
              onChange={(e) => setFreeEvent(e.target.checked)}
            />
          </div>
          <div
            className={`buscador buscador-fav  ${
              showAdvancedSearch ? "show-advanced" : ""
            }`}
          >
            <label>{t('buscador.favoritesOnly')}</label>
            <input
              type="checkbox"
              checked={favoritesOnly}
              onChange={(e) => setFavoritesOnly(e.target.checked)}
              disabled={!user}
            />
          </div>
        </div>

        <div
          className={`buscador buscador-data ${
            showAdvancedSearch ? "show-advanced" : ""
          }`}
        >
          <div className=" buscador-datalabel">
            <label>{t('buscador.date')}</label>
            <input
              type="checkbox"
              checked={searchDate}
              onChange={(e) => setSearchDate(e.target.checked)}
            />
          </div>
          {searchDate && (
            <div
              className="buscador-dataoptions"
              onChange={(e) => handleDateChange(e.target.value)}
            >
              <label>
                <input type="radio" name="dateOption" value="Esta semana" />
                {t('buscador.thisWeek')}
              </label>
              <label>
                <input type="radio" name="dateOption" value="Esta finde" />
                {t('buscador.thisWeekend')}
              </label>
              <label>
                <input
                  type="radio"
                  name="dateOption"
                  value="A vindeira semana"
                />
                {t('buscador.nextWeek')}
              </label>
              <label>
                <input type="radio" name="dateOption" value="Este mes" />
                {t('buscador.thisMonth')}
              </label>

              <label>
                <input type="radio" name="dateOption" value="O vindeiro mes" />{t('buscador.nextMonth')}
              </label>
              <label>
                <input type="radio" name="dateOption" value="Persoalizado" />
                {t('buscador.custom')}
              </label>
              {customDates && (
                <div>
                  <label>
                    {t('buscador.startDate')}
                    <input
                      type="date"
                      onChange={(e) =>
                        setSearchInitialDate(new Date(e.target.value))
                      }
                    />
                  </label>
                  <label>
                    {t('buscador.endDate')}
                    <input
                      type="date"
                      onChange={(e) =>
                        setSearchFinalDate(new Date(e.target.value))
                      }
                    />
                  </label>
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className={`boton-buscar ${
            showAdvancedSearch ? "show-advanced" : ""
          }`}
        >
          <div className="botones-buscar-limpiar">
            <Button text={t('buttons.clear')} variant="small" onClick={cleanFiltered} />{" "}
            <Button text={t('buttons.search')} variant="small" onClick={handleSearchClick} />
          </div>

          <BiChevronsUp
            className="chevrons-icon"
            onClick={() => {
              setShowAdavancedSearch(false);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Buscador;
