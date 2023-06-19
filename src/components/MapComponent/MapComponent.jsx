import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Inicializar el mapa
    const map = L.map(mapRef.current).setView([42.88282178490326, -8.539535059983809], 16);

    // Agregar capa de mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    return () => {
        map.remove();
      };
    }, []);
  
    return <div id="map" ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
  };
  
export default MapComponent;