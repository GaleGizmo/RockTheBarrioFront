import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "./Map.css";

const Map = ({ location }) => {
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(typeof google !== "undefined");

  useEffect(() => {
    if (!isGoogleLoaded) {
      const checkGoogle = setInterval(() => {
        if (typeof google !== "undefined") {
          setIsGoogleLoaded(true);
          clearInterval(checkGoogle);
        }
      }, 100);

      return () => clearInterval(checkGoogle);
    }
  }, [isGoogleLoaded]);

  if (!isGoogleLoaded) {
    return <div className="map-container">Cargando mapa...</div>;
  }

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%"
        }}
        options={{
          fullscreenControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: "all",
              elementType: "all",
              stylers: [
                { saturation: 0 },
                { lightness: 0 }
              ]
            }
          ]
        }}
        center={location}
        zoom={16}
      >
        <Marker position={location} />
      </GoogleMap>
    </div>
  );
};

export default Map;
