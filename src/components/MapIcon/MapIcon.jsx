import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import "./MapIcon.css"

const MapIcon = ({ onClick, showMap }) => {
  return <FaMapMarkerAlt className={` map-icon ${showMap ? "map-icon__mapOnScreen":"" } ${onClick ? "map-icon__active":""}`} onClick={onClick} />;
};

export default MapIcon;
