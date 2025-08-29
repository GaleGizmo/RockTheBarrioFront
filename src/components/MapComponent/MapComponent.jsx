import React from "react";
import Map from "../Map/Map";

const MapComponent = ({ location }) => {
  return <>{location && <Map location={location.coordenates} />}</>;
};

export default MapComponent;
