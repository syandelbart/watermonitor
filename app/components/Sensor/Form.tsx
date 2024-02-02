"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import SelectComponent from "@/app/components/SelectComponent";
import { Municipality, Sensor } from "@/types/general";
import { useSensorStore } from "@/zustand";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LoadScript } from "@react-google-maps/api";

import MyMap from "../Map";

type Methods = {
  GET: "GET";
  POST: "POST";
  PUT: "PUT";
};

const Form = ({ municipalities }: { municipalities: Municipality[] }) => {
  const urlSearchParams = useSearchParams();
  const { sensors, add, modify } = useSensorStore();

  const [image, setImage] = useState<File>();

  const action = urlSearchParams.get("action");

  useEffect(() => {
    const id = urlSearchParams.get("id");
    const action = urlSearchParams.get("action");

    if (id && action == "edit") {
      fetch(`/api/sensor/${id}`, {
        method: "GET",
        // Stop cache
        headers: {
          "Cache-Control": "no-cache",
        },
      })
        .then((response) => response.json())
        .then((data: Sensor) => {
          setSensor(data);
          console.log(data.image);
          // Buffer to image file
          if (image) {
            const file = new File([image], "image.png", { type: "image/png" });
            setImage(file);
          }
        });
    }
  }, [urlSearchParams]);

  const [sensor, setSensor] = useState<Sensor>({
    municipality: "",
    station_name: "",
    longitude: 0.0,
    latitude: 0.0,
    image: "",
    mac_address: "",
    id: 0,
  });

  async function handleSubmit() {
    // const result = JSON.stringify(sensor);
    // console.log(result);
    const response = await fetch(`/api/sensor`, {
      method: action === "edit" ? "PUT" : "POST",
      body: JSON.stringify(sensor),

      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return console.log(response);

    const createdSensor: Sensor = await response.json();

    // Upload image
    // if (createdSensor?.id && image) {
    //   const formData = new FormData();
    //   formData.append("image", image);
    //   formData.append("id", createdSensor.id);
    //   const response = await fetch(`/api/sensor/image`, {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     console.log("Image uploaded");
    //     setImage(undefined);
    //   }
    // }

    // If response was a success, clear the form
    if (response.ok) {
      const newSensor: Sensor = await response.json();
      if (action == "edit") {
        modify(newSensor);
      } else {
        setSensor({
          municipality: "",
          station_name: "",
          longitude: 0.0,
          latitude: 0.0,
          image: "",
          mac_address: "",
          id: 0,
        });
        add(newSensor);
      }
    }
  }

  const [selectedLocation, setSelectedLocation] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | null
  >(null);

  const handleLocationSelect = (location: google.maps.LatLng) => {
    setSelectedLocation(location);
    setSensor({
      ...sensor,
      latitude: location.lat(),
      longitude: location.lng(),
    });
    // Optionally send location to backend here
  };

  async function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event?.target?.files?.[0]; // Use optional chaining to handle potential null or undefined
    if (file) {
      setImage(file);

      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        // resolve(fileReader.result);
        // console.log(fileReader.result);

        const base64 = fileReader.result;
        // if (!base64) return;
        // if(typeof base64 === "object"){
        //   base64.
        // }
        setSensor({...sensor, image: base64 as string})
      };

      fileReader.onerror = (error) => {
        // reject(error);
        console.log(error);
      };

      // const reader = new FileReader();

      // reader.onload = (e) => {
      //   // e.target.result contains the base64-encoded string
      //   const base64String = e.target?.result as string;
      //   console.log(base64String);

      //   // You can set the base64String state or use it as needed
      // };

      // reader.readAsDataURL(file);

      // const base64 = toBase64(file as File);

      // console.log(base64);
    }
  }

  // Convert a file to base64 string
  // const toBase64 = (file: File) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();

  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //       console.log(fileReader.result);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };


  return (
    <div className="flex m-3 flex-col justify-center items-center">
      <div className="flex m-5 flex-col justify-center w-1/2 gap-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <SelectComponent
              value={
                sensor.municipality
                  ? {
                      value: sensor.municipality,
                      label: sensor.municipality,
                    }
                  : undefined
              }
              options={
                municipalities.map((municipality) => ({
                  value: municipality.name,
                  label: municipality.name,
                })) || []
              }
              onChange={(event) =>
                setSensor({ ...sensor, municipality: event.value })
              }
              className="w-full"
            />
            <label>Municipality</label>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col flex-grow">
              <input
                type="text"
                name="Name"
                placeholder="Enter the sensor name"
                value={sensor.station_name}
                onChange={(e) =>
                  setSensor({ ...sensor, station_name: e.target.value })
                }
              />
              <label>Sensor name</label>
            </div>
            <div className="flex">
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                hidden
                onChange={handleChangeImage}
              />
              <label
                htmlFor="img"
                className="p-1 cursor-pointer justify-center "
              >
                <Icon icon="gridicons:add-image" width="30" height="30" />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <input
            name="mac"
            id="mac"
            type="text"
            placeholder="00:00:00:00:00:00"
            value={sensor.mac_address}
            onChange={(e) =>
              setSensor({ ...sensor, mac_address: e.target.value })
            }
          />
          <label>Sensor MAC Address (optional)</label>
        </div>
        <hr className="text-xl h-2 text-gray-500" />
        <div className="w-full">
          {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
            window.google === undefined ? (
              <LoadScript
                id="script-loader"
                libraries={["places"]}
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              >
                <MyMap
                  onLocationSelect={handleLocationSelect}
                  searchLocationPosition={selectedLocation}
                  setSearchLocationPosition={setSelectedLocation}
                />
              </LoadScript>
            ) : (
              <MyMap
                onLocationSelect={handleLocationSelect}
                searchLocationPosition={selectedLocation}
                setSearchLocationPosition={setSelectedLocation}
              />
            )
          ) : null}
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col w-1/2">
            <input
              className="m-2 p-2 mb-1 border rounded border-gray-300 text-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              name="Longitude"
              value={sensor.longitude}
              onChange={(e) => {
                setSensor({ ...sensor, longitude: Number(e.target.value) });
                setSelectedLocation(
                  new google.maps.LatLng(
                    selectedLocation?.lat() ?? 0,
                    Number(e.target.value)
                  )
                );
              }}
            />
            <label>Longitude</label>
          </div>
          <div className="flex flex-col w-1/2">
            <input
              className="m-2 p-2 mb-1 border rounded border-gray-300 text-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              name="Latitude"
              value={sensor.latitude}
              onChange={(e) => {
                setSelectedLocation(
                  new google.maps.LatLng(
                    Number(e.target.value),
                    selectedLocation?.lng() ?? 0
                  )
                );
                setSensor({ ...sensor, latitude: Number(e.target.value) });
              }}
            />
            <label>Latitude</label>
          </div>
        </div>
        <hr className="text-xl h-2 text-gray-500 m-1" />
        {/* image of setup with react use state and preview */}
        <div className="flex flex-col">
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt="Image of the sensor setup (preview)"
              width={200}
              height={200}
            />
          )}
          <label className="m-2 mt-0 text-gray-500 text-sm">Image</label>

          <input type="file" accept="image/*" onChange={handleChangeImage} />
        </div>
      </div>
      <button
        className="m-3 mt-5 bg-black text-white p-2 rounded"
        type="submit"
        onClick={handleSubmit}
      >
        {action === "edit" ? "Edit sensor" : "Create sensor for location"}
      </button>
    </div>
  );
};

export default Form;
