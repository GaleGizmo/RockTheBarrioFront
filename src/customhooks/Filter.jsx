//convierte los campos de los eventos a minusculas
const propertiesToConvert = ["title", "artist", "site", "genre"];
const convertEventosToLowerCase = (eventos) => {
  return eventos.map((evento) => {
    let eventoLowerCase = { ...evento };
    propertiesToConvert.forEach((prop) => {
      if (typeof evento[prop] === "string") {
        eventoLowerCase[prop] = evento[prop].toLowerCase();
      }
    });
    return eventoLowerCase;
  });
};

const dateInRange = (date, start, end) => {
  return date >= start && date <= end;
};

const FilterEvents = (eventos, filtros, user) => {
  const eventosLowerCase = convertEventosToLowerCase(eventos);
  const inputLowerCase = filtros.input.toLowerCase();
  let filtered = eventosLowerCase;

  const filteredEvents = () => {
    filtered = filtered.filter((evento) => {
      const matchInput = propertiesToConvert.some((prop) => {
        return (
          (filtros.searchAll ||
            filtros[`search${prop.charAt(0).toUpperCase() + prop.slice(1)}`]) &&
          evento[prop].includes(inputLowerCase)
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
