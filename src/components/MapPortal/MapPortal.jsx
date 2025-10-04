import { createPortal } from 'react-dom';
import MapComponent from '../MapComponent/MapComponent';
import './MapPortal.css';

const MapPortal = ({ location, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.className === 'map-portal-overlay') {
      onClose();
    }
  };

  return createPortal(
    <div className="map-portal-overlay" onClick={handleOverlayClick}>
      <div className="map-portal-content">
        <button className="map-portal-close" onClick={onClose} title="Pechar mapa">×</button>
        <div className="map-portal-header">
          <h3>{location?.name || 'Ubicación do evento'}</h3>
        </div>
        <MapComponent location={location} />
      </div>
    </div>,
    document.body
  );
};

export default MapPortal;