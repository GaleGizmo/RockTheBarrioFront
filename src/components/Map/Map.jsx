import { GoogleMap, Marker } from "@react-google-maps/api";
import "./Map.css";

const Map = ({ location }) => {
  if (typeof google === "undefined") {
    return null;
  }

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={location}
        zoom={15}
      >
        <Marker position={location} />
      </GoogleMap>
    </div>
  );
};

export default Map;
