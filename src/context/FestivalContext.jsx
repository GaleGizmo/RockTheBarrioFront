import { createContext, useContext, useState } from "react";

const FestivalContext = createContext(false);

export const FestivalProvider = ({ children }) => {
  const [showFestival, setShowFestival] = useState(false);
  return (
    <FestivalContext.Provider value={{ showFestival, setShowFestival }}>
      {children}
    </FestivalContext.Provider>
  );
};

export const useFestival = () => useContext(FestivalContext);
