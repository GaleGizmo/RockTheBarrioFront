//convierte los campos de los eventos a minusculas
import { getLocalizedField } from "../utils/localizedFields";

const propertiesToConvert = ["title", "artist", "site", "genre"];
const propertiesToConvertExtended = [
  "title",
  "artist",
  "site",
  "genre",
  "content",
];
const convertEventosToLowerCase = (eventos, language) => {
  return eventos.map((evento) => {
    let eventoLowerCase = { ...evento };
    propertiesToConvert.forEach((prop) => {
      const originalValue =
        prop === "title" || prop === "content"
          ? getLocalizedField(evento[prop], language)
          : evento[prop];

      eventoLowerCase[prop] = String(originalValue || "").toLowerCase();
      if (eventoLowerCase[prop] == "varios") {
        eventoLowerCase.content = String(
          getLocalizedField(evento.content, language) || "",
        ).toLowerCase();
      }
    });

    return eventoLowerCase;
  });
};

const dateInRange = (date, start, end) => {
  return date >= start && date <= end;
};

const FilterEvents = (eventos, filtros, user, language = "gl") => {
  const eventosLowerCase = convertEventosToLowerCase(eventos, language);
  const inputLowerCase = filtros.input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((e) => String(e).trim());
  let filtered = eventosLowerCase;

  const filteredEvents = () => {
    filtered = filtered.filter((evento) => {
      let propertiesToSearch = null;
      if (evento.site == "varios" || evento.artist == "varios") {
        propertiesToSearch = propertiesToConvertExtended;
      } else {
        propertiesToSearch = propertiesToConvert;
      }
      const matchInput = propertiesToSearch.some((prop) => {
        return (
          (filtros.searchAll ||
            filtros[`search${prop.charAt(0).toUpperCase() + prop.slice(1)}`]) &&
          (filtros.searchWithOr
            ? inputLowerCase.some((word) => evento[prop].includes(word))
            : inputLowerCase.every((word) => evento[prop].includes(word)))
        );
      });

      const matchFavorites =
        user && filtros.favorites && user.favorites.includes(evento._id);
      const matchFreeEvent = filtros.freeEvent && evento.price === 0;
      const matchDate =
        filtros.searchDate &&
        dateInRange(
          new Date(evento.date_start),
          new Date(filtros.searchInitialDate),
          new Date(filtros.searchFinalDate)
        );

      return (
        matchInput &&
        (!filtros.favorites || matchFavorites) &&
        (!filtros.freeEvent || matchFreeEvent) &&
        (!filtros.searchDate || matchDate)
      );
    });
    const filteredIds = filtered.map((evento) => evento._id);

    const eventsToShowInCapital = eventos.filter((evento) => {
      return filteredIds.includes(evento._id);
    });

    return eventsToShowInCapital;
  };

  const eventsToShow = filteredEvents();

  return eventsToShow;
};

export default FilterEvents;
