"use client";

import { useState } from "react";

import SelectComponent from "@/app/components/SelectComponent";
import { Municipality } from "@/types/general";
import { Icon } from "@iconify/react/dist/iconify.js";

const Form = ({ municipalities }: { municipalities: Municipality[] }) => {
  const [sensor, setSensor] = useState({
    municipality: "",
    name: "",
    longitude: 0.0,
    latitude: 0.0,
    image: null as File | null,
    mac: "",
  });

  //const { data, loading, error } = useQuery(GET_COURSE, { variables: { id }, skip: id === 0 });

  function handleSubmit() {
    console.log(sensor);
  }

  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event?.target?.files?.[0]; // Use optional chaining to handle potential null or undefined
    if (file) {
      setSensor({ ...sensor, image: file });
    }
  }

  return (
    <div className="flex m-3 flex-col justify-center items-center">
      <div className="flex m-5 flex-col justify-center w-1/2">
        <div className="flex flex-col">
          <SelectComponent
            options={
              municipalities.map((municipality) => ({
                value: municipality.name,
                label: municipality.name,
              })) || []
            }
            onChange={(event) => setSensor({ ...sensor, municipality: event })}
            className="w-full"
          />
          <label className="m-2 mt-0 text-gray-500 text-sm">Municipality</label>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row">
            <input
              className="m-2 p-2 border rounded border-gray-300 text-gray-800 grow mb-1"
              type="text"
              name="Name"
              placeholder="Enter the sensor name"
              value={sensor.name}
              onChange={(e) => setSensor({ ...sensor, name: e.target.value })}
            />
            <div className="flex items-center">
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
                className="p-1 cursor-pointer justify-center"
              >
                <Icon icon="gridicons:add-image" width="30" height="30" />
              </label>
            </div>
          </div>
          <label className="m-2 mt-0 text-gray-500 text-sm">Sensor name</label>
        </div>
        <div className="flex flex-col">
          <input
            name="mac"
            id="mac"
            className="m-2 p-2 border rounded border-gray-300 text-gray-800 grow mb-1"
            type="text"
            placeholder="00:00:00:00:00:00"
            onChange={(e) => setSensor({ ...sensor, mac: e.target.value })}
          />
          <label className="m-2 mt-0 text-gray-500 text-sm">
            Sensor MAC Address (optional)
          </label>
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
            <label className="m-2 mt-0 text-gray-500 text-sm">Longitude</label>
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
            <label className="m-2 mt-0 text-gray-500 text-sm">Latitude</label>
          </div>
        </div>
        <hr className="text-xl h-2 text-gray-500 m-1" />
      </div>
      <button
        className="m-3 mt-5 bg-black text-white p-2 rounded"
        type="submit"
        onClick={handleSubmit}
      >
        Create sensor for location
      </button>
    </div>
  );
};

export default Form;
