import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import "./MapIcon.css"

const MapIcon = ({ onClick, showMap }) => {
  return <FaMapMarkerAlt className={showMap ? "map-icon__active" : "map-icon"} onClick={onClick} />;
};

export default MapIcon;
