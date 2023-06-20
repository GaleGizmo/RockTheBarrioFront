import React, { useEffect, useState } from 'react';
import Map from '../Map/Map';


const MapComponent =  ({ direccion }) => {
    const [location, setLocation] = useState(null);
  
    useEffect(() => {
      const fetchLocation = async () => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              direccion
            )}&key=${import.meta.env.VITE_APP_GOOGLE_CLOUD_API_KEY}`
          );
          const data = await response.json();
        
          if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setLocation({ lat, lng });
          }
        } catch (error) {
          console.log("Error al obtener la ubicación:", error);
        }
      };
  
      fetchLocation();
    }, [direccion]);
  
    return location && <Map location={location} />;
  };
  
export default MapComponent;