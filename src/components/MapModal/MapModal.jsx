import React from "react";
import L from "leaflet"
import "./MapModal.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const MapModal = ({ onClose }) => {
    
  return (
    <div className="map-modal">
      
        <MapContainer
          center={[42.88282178490326, -8.539535059983809]}
          zoom={16}
          className="map-content"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* <Marker position={[42.88282178490326, -8.539535059983809]} icon={icon}>
            <Popup>CGAC</Popup>
          </Marker> */}
        </MapContainer>
        <button onClick={onClose}>Cerrar</button>
     
    </div>
  );
};

export default MapModal;
