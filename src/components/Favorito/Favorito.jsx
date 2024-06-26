import React, { useEffect, useState } from "react";
import "./Favorito.css";

const Favorito = ({ favoriteStatus, claseDetalle }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(true);

    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    // Limpiar el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, [favoriteStatus]);

  return (
    <div
      className={`add-favorito ${
        showMessage ? "favorito-visible" : "favorito-hidden"
      } ${claseDetalle}`}
    >
      <p className="favorito-text">
        {favoriteStatus
          ? "Evento engadido a favoritos!"
          : "Evento eliminado de favoritos"}
      </p>
    </div>
  );
};

export default Favorito;
