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


const Buscador = ({ eventos, user }) => {
  const dispatch = useDispatch();
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
  const [pastEvents, setPastEvents] = useState(false);
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

      filteredResults = FilterEvents(eventosToShow, filters, userData);
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

      filteredResults = FilterEvents(eventosToShow, filters, userData);
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
      filteredResults = FilterEvents(eventosToShow, data, user);

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
        title="Non se atoparon resultados"
        p1="Proba a buscar con outros termos"
        p2="Lembra que o buscador é sensible aos acentos"
        buttonText="Aceptar"
        show={noResults}
        onConfirm={() => {
          setNoResults(false);
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="buscador-input_wrapper">
          <input
            type="text"
            placeholder="Buscar..."
            className="buscador-input"
            {...register("input")}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <IoIosSearch className="search_icon" onClick={handleSearchClick} />
          <p onClick={handleShowAdvancedSearch} className="buscador-avanzada">
            {showAdvancedSearch ? "" : "Avanzada"}
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
              <span>Calquera termo </span>{" "}
              <span>
                <AiTwotoneQuestionCircle />
              </span>
              {hovered && (
                <ToolTip
                  specificClass="termos-tooltip"
                  content="Devolve todos os resultados que conteñan calquera dos termos introducidos"
                />
              )}
            </label>
            <label className="past-events">
              Eventos pasados
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
            <label>Evento</label>
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
            <label>Artista</label>
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
            <label>Lugar</label>
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
            <label>Xénero</label>
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
            <label>Gratuito</label>
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
            <label>Só favoritos</label>
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
            <label>Data</label>
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
                Esta semana
              </label>
              <label>
                <input type="radio" name="dateOption" value="Esta finde" />
                Esta finde
              </label>
              <label>
                <input
                  type="radio"
                  name="dateOption"
                  value="A vindeira semana"
                />
                A vindeira semana
              </label>
              <label>
                <input type="radio" name="dateOption" value="Este mes" />
                Este mes
              </label>

              <label>
                <input type="radio" name="dateOption" value="O vindeiro mes" />O
                vindeiro mes
              </label>
              <label>
                <input type="radio" name="dateOption" value="Persoalizado" />
                Persoalizado
              </label>
              {customDates && (
                <div>
                  <label>
                    Data inicial:
                    <input
                      type="date"
                      onChange={(e) =>
                        setSearchInitialDate(new Date(e.target.value))
                      }
                    />
                  </label>
                  <label>
                    Data final:
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
            <Button text="Limpar" variant="small" onClick={cleanFiltered} />{" "}
            <Button text="Buscar" variant="small" onClick={handleSearchClick} />
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
