import { useState } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"]; // Required for Autocomplete

const LocationPicker = ({ setAddress, setCoordinates, onClose }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 22.7196, lng: 75.8577 }); // Default location (Indore, India)
  const [markerPosition, setMarkerPosition] = useState(null);

  const handlePlaceSelect = (autocomplete) => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      setMapCenter(place.geometry.location);
      setMarkerPosition(place.geometry.location);
      setAddress(place.formatted_address);
      setCoordinates({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  return (
    <LoadScript googleMapsApiKey="" libraries={libraries}>
      <div style={{ width: "400px", height: "500px", padding: "10px", background: "white" }}>
        <Autocomplete onLoad={(autocomplete) => (autocomplete.onPlaceChanged = () => handlePlaceSelect(autocomplete))}>
          <input type="text" placeholder="Search location..." style={{ width: "100%", padding: "10px" }} />
        </Autocomplete>

        <GoogleMap mapContainerStyle={{ width: "100%", height: "400px" }} center={mapCenter} zoom={15}>
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>

        <button onClick={onClose} style={{ marginTop: "10px", padding: "8px", cursor: "pointer" }}>Select Location</button>
      </div>
    </LoadScript>
  );
};

export default LocationPicker;
