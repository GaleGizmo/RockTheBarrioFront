import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const LeafletMap = () => {
  return (
    <MapContainer
    center={[51.505, -0.09]} // Coordenadas de centro del mapa
    zoom={13} // Nivel de zoom inicial
    style={{ height: '400px', width: '100%' }} // Estilo para ajustar el tamaño del mapa
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // URL de capa de mapas
      attribution="© OpenStreetMap contributors" // Atribución de la fuente de datos
    />
    <Marker position={[51.505, -0.09]} /> // Marcador de ejemplo
  </MapContainer>
  )
}

export default LeafletMap
