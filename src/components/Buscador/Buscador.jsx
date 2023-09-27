import React, { useRef, useState } from "react";
import "./Buscador.css";
import { BiDotsHorizontalRounded, BiSearchAlt } from "react-icons/bi";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import FilterEvents from "../../customhooks/Filter";
import { useDispatch } from "react-redux";
import {
  deleteFilteredEventos,
  getFilteredEventos,
} from "../../redux/eventos/eventos.actions";

const Buscador = ({ eventos, user }) => {
  
  const dispatch = useDispatch();
  const [showAdvancedSearch, setShowAdavancedSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchAll, setSearchAll] = useState(true);
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

     // Filtrado previo de eventos pasados
  let eventosToShow = eventos;
  if (!pastEvents) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventosToShow = eventos.filter(evento => new Date(evento.date_start) >= today);
  }

    console.log(data);
    const filteredResults = FilterEvents(eventosToShow, data, user);
    if (filteredResults.length===0){
        console.log("no hay resultados");
    } else {
    dispatch(getFilteredEventos(filteredResults));}
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
    setFreeEvent(false);
    setSearchDate(false);
    setSearchArtist(false);
    setSearchTitle(false);
    setSearchSite(false);
    setSearchGenre(false);
    setSearchAll(true);
    setFavoritesOnly(false);
    setCustomDates(false);
    dispatch(deleteFilteredEventos());
  };

  return (
    <div className="buscador-container">
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
          <BiSearchAlt className="search_icon" onClick={handleSearchClick} />
          <p onClick={handleShowAdvancedSearch} className="buscador-avanzada">
            Avanzada
          </p>
        </div>
        <div
          className={`buscador-checks ${
            showAdvancedSearch ? "show-advanced" : ""
          }`}
        >
          <div className="buscador-checks_item">
            <label>Calquera</label>
            <input
              type="checkbox"
              checked={searchAll}
              onChange={(e) => {
                setSearchAll(e.target.checked);
                setSearchTitle(false);
                setSearchArtist(false);
                setSearchSite(false);
                setSearchGenre(false);
              }}
            />
          </div>

          <div className="buscador-checks_item">
            <label>Evento</label>
            <input
              type="checkbox"
              checked={searchTitle}
              onChange={(e) => {
                setSearchTitle(e.target.checked);
                setSearchAll(false);
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
                setSearchAll(false);
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
                setSearchAll(false);
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
                setSearchAll(false);
              }}
            />
          </div>
        </div>
        <div
          className={`buscador-item ${
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
          className={`buscador-item ${
            showAdvancedSearch ? "show-advanced" : ""
          }`}
        >
          <div className="buscador-datalabel">
            <label>Data</label>
            <input
              type="checkbox"
              checked={searchDate}
              onChange={(e) => setSearchDate(e.target.checked)}
            />{" "}
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

        <div className={`buscador-item ${
            showAdvancedSearch ? "show-advanced" : ""
          }`}>
          <label>Só favoritos</label>
          <input
            type="checkbox"
            checked={favoritesOnly}
            onChange={(e) => setFavoritesOnly(e.target.checked)}
            disabled={!user}
          />
        </div>
        <div className={`boton-buscar ${
            showAdvancedSearch ? "show-advanced" : ""
          }`}>
        <Button text="Buscar" type="small" />
          <Button text="Limpar" type="small" onClick={cleanFiltered} />{" "}
          <label>
            Inclue eventos pasados
            <input
              type="checkbox"
              checked={pastEvents}
              onChange={(e) => setPastEvents(e.target.checked)}
              disabled={searchDate} // Deshabilitar si searchDate está activo
            />
           
          </label>
          <BiDotsHorizontalRounded className="dotts-icon" onClick={()=>{setShowAdavancedSearch(false)}} />
        </div>
      </form>
    </div>
  );
};

export default Buscador;