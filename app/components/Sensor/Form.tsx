"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import SelectComponent from "@/app/components/SelectComponent";
import { Municipality, Sensor } from "@/types/general";
import { Icon } from "@iconify/react/dist/iconify.js";

type Methods = {
  GET: "GET";
  POST: "POST";
  PUT: "PUT";
};

const Form = ({ municipalities }: { municipalities: Municipality[] }) => {
  const urlSearchParams = useSearchParams();

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
    id: "",
  });

  async function handleSubmit() {
    const response = await fetch(`/api/sensor`, {
      method: action === "edit" ? "PUT" : "POST",
      body: JSON.stringify(sensor),

      headers: {
        "Content-Type": "application/json",
      },
    });
    // If response was a success, clear the form
    if (response.ok && action !== "edit") {
      setSensor({
        municipality: "",
        station_name: "",
        longitude: 0.0,
        latitude: 0.0,
        image: "",
        mac_address: "",
        id: "",
      });
    } else {
      console.log(response);
    }
  }

  async function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event?.target?.files?.[0]; // Use optional chaining to handle potential null or undefined
    if (file) {
      setSensor({ ...sensor, image: await file.text() });
    }
  }

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
        <hr className="text-xl h-2 text-gray-500 m-1" />
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2">
            <input
              className="m-2 p-2 mb-1 border rounded border-gray-300 text-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              name="Longitude"
              value={sensor.longitude}
              onChange={(e) =>
                setSensor({ ...sensor, longitude: Number(e.target.value) })
              }
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
                setSensor({ ...sensor, latitude: Number(e.target.value) });
              }}
            />
            <label>Latitude</label>
          </div>
        </div>
        <hr className="text-xl h-2 text-gray-500 m-1" />
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
