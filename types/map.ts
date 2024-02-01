// Define a Location interface for the selected location
interface Location {
  lat: number;
  lng: number;
}

// Props for the MyMap component, including a callback function for when a location is selected
interface MyMapProps {
  onLocationSelect: (location: Location) => void;
}
