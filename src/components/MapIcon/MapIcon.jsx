import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import "./MapIcon.css"

const MapIcon = ({ onClick }) => {
  return <FaMapMarkerAlt className="map-icon" onClick={onClick} />;
};

export default MapIcon;
