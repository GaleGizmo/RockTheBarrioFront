const FilterEvents = (eventos, filtros, user) => {
    const propertiesToConvert = ['title', 'artist', 'site', 'genre'];
  
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
  
    const eventosLowerCase = convertEventosToLowerCase(eventos);
    const inputLowerCase = filtros.input.toLowerCase();
    let filtered = eventosLowerCase;
  
    const filteredEvents = () => {
      filtered = filtered.filter((evento) => {
        const matchInput = 
          (filtros.searchAll || filtros.searchTitle) && evento.title.includes(inputLowerCase) ||
          (filtros.searchAll || filtros.searchArtist) && evento.artist.includes(inputLowerCase) ||
          (filtros.searchAll || filtros.searchSite) && evento.site.includes(inputLowerCase) ||
          (filtros.searchAll || filtros.searchGenre) && evento.genre.includes(inputLowerCase);
    
        const matchFavorites = user && filtros.favorites && user.favorites.includes(evento._id);
        const matchFreeEvent = filtros.freeEvent && evento.price === 0;
        const matchDate = filtros.searchDate && dateInRange(new Date(evento.date_start), new Date(filtros.searchInitialDate), new Date(filtros.searchFinalDate));
    
        return matchInput && (!filtros.favorites || matchFavorites) && (!filtros.freeEvent || matchFreeEvent) && (!filtros.searchDate || matchDate);
      });
      return filtered;
    };
  
    const eventsToShow = filteredEvents();
    return eventsToShow;
  };
  
  export default FilterEvents;
  