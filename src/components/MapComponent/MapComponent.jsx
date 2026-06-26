import React from "react";
import Map from "../Map/Map";

const MapComponent = ({ location, onClose }) => {
  return <>{location && <Map location={location.coordenates} onClose={onClose} />}</>;
};

export default MapComponent;
