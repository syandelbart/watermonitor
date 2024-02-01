// components/PlacesAutocompleteComponent.jsx
import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const PlacesAutocompleteComponent = ({
  setSearchLocationPosition,
}: {
  setSearchLocationPosition: React.Dispatch<
    React.SetStateAction<Location | null>
  >;
}) => {
  const [address, setAddress] = React.useState("");

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    // setAddress(value);
    // console.log(latLng);
    setSearchLocationPosition(latLng as Location);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <div className="flex flex-col">
            <input {...getInputProps({ placeholder: "Type address" })} />
            <label>Select an address</label>
          </div>

          <div>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const style = suggestion.active
                ? { backgroundColor: "#a8dadc", cursor: "pointer" }
                : { backgroundColor: "#f1faee", cursor: "pointer" };

              return (
                // eslint-disable-next-line react/jsx-key
                <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default PlacesAutocompleteComponent;
