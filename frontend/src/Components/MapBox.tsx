import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import './fixLeafletIcon'; // Ensure the path is correct

const position: LatLngExpression = [-25.7461, 28.1881]; // Pretoria coordinates

const MapBox = () => {
  return (
    <div className="w-full h-96 border-2 border-gray-300 rounded-xl overflow-hidden shadow-md">
      <MapContainer center={position} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={position}>
          <Popup>Pretoria 📍</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapBox;