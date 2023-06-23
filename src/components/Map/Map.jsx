import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = ({ location }) => {
    if (typeof google === 'undefined') {
        return null; // O muestra un mensaje de error o un indicador de carga
      }
  
  return (
    <GoogleMap
      mapContainerStyle={{ height: "400px", width: "100%", marginTop:"20px" }}
      center={location}
      zoom={15}
    >
      <Marker position={location} />
    </GoogleMap>
  );
};

export default Map;