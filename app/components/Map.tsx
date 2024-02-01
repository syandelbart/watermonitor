import { Dispatch, SetStateAction } from "react";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import PlacesAutocompleteComponent from "./PlacesAutoComplete";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 51.219448,
  lng: 4.402464,
};

const MyMap = ({
  onLocationSelect,
  searchLocationPosition,
  setSearchLocationPosition,
}: {
  onLocationSelect: (location: google.maps.LatLng) => void;
  searchLocationPosition: google.maps.LatLng | null;
  setSearchLocationPosition: Dispatch<
    SetStateAction<google.maps.LatLng | google.maps.LatLngLiteral | null>
  >;
}) => {
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const location = new google.maps.LatLng(
        event.latLng.lat(),
        event.latLng.lng()
      );

      setSearchLocationPosition(location);
      onLocationSelect(location);
    }
  };

  return (
    <LoadScript
      libraries={["places"]}
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
    >
      <div className="flex flex-col gap-4">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={8}
          onClick={handleMapClick}
        >
          {/* Additional components like <Marker /> can be added here */}
          {searchLocationPosition && (
            <Marker position={searchLocationPosition} />
          )}
        </GoogleMap>
        <PlacesAutocompleteComponent
          setSearchLocationPosition={setSearchLocationPosition}
        />
      </div>
    </LoadScript>
  );
};

export default MyMap;
