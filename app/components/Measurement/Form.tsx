"use client";

import { useState } from "react";

import SelectComponent from "@/app/components/SelectComponent";
import { Measurement, MeasurementTypes, Sensor } from "@/types/general";
import { Icon } from "@iconify/react/dist/iconify.js";

const Form = () => {
  const [sensor, setSensor] = useState<Sensor>();

  const [measurement, setMeasurement] = useState<Measurement>({
    id: "",
    moment: "",
    result: 0,
    measurement: MeasurementTypes.m,
    sensor_id: "",
  });

  const handleSubmit = async () => {
    console.log(measurement);
    // TODO: Check measurement fields

    const response = await fetch("/api/measurement", {
      method: "POST",
      body: JSON.stringify(measurement),
    });

    console.log(response);

    if (response.ok) {
      console.log("Measurement added");
      setMeasurement({
        id: "",
        moment: "",
        result: 0,
        measurement: MeasurementTypes.m,
        sensor_id: "",
      });
    } else {
      console.log("Measurement not added");
    }
  };

  return (
    <div className="flex m-3 flex-col justify-center items-center">
      <div className="flex m-5 flex-col justify-center w-1/2">
        <div className="flex flex-row">
          <div className="flex flex-col w-full">
            <SelectComponent
              value={
                // map sensor find to value and label
                sensor
                  ? {
                      value: sensor.id,
                      label: `${sensor.municipality}/${sensor.station_name}`,
                    }
                  : {
                      value: "",
                      label: "Select sensor",
                    }
              }
              onChange={(e: { value: string; label: string }) => {
                setSensor(sensors.find((sensor) => sensor.id === e.value));
                setMeasurement({ ...measurement, sensor_id: e.value });
              }}
              options={sensors.map((sensor) => ({
                value: sensor.id,
                label: `${sensor.municipality}/${sensor.station_name}`,
              }))}
            />

            <label>Sensor</label>
          </div>
        </div>
        <hr className="text-xl h-2 text-gray-500 m-1" />
        <div className="flex flex-row"></div>
        <hr className="text-xl h-2 text-gray-500 m-1" />
        <div className="flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <input
                type="datetime-local"
                name="Moment"
                placeholder="Moment"
                value={measurement.moment}
                onChange={(e) =>
                  setMeasurement({ ...measurement, moment: e.target.value })
                }
              />
              <div className="flex items-center">
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  hidden
                  // onChange={handleChangeImage}
                />
                <label
                  htmlFor="img"
                  className="p-1 cursor-pointer justify-center"
                >
                  <Icon icon="gridicons:add-image" width="30" height="30" />
                </label>
              </div>
            </div>

            <label>Moment</label>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col w-full">
            <input
              type="result"
              name="result"
              value={measurement.result}
              onChange={(e) =>
                setMeasurement({
                  ...measurement,
                  result: Number(e.target.value),
                })
              }
            />
            <label>Water Height</label>
          </div>
          <div className="flex flex-col w-full">
            <SelectComponent
              value={{
                value: measurement.measurement,
                label: measurement.measurement,
              }}
              onChange={(e: { value: string; label: string }) =>
                setMeasurement({ ...measurement, measurement: e.value })
              }
              options={Object.values(MeasurementTypes).map((measurement) => ({
                value: measurement,
                label: measurement,
              }))}
            />
            <label>Measurement</label>
          </div>
        </div>
      </div>
      <div className="flex m-3 flex-col justify-center items-center"></div>
      <button
        className="m-3 bg-black text-white p-2 rounded"
        type="submit"
        onClick={handleSubmit}
      >
        Add water level for location
      </button>
    </div>
  );
};

export default Form;
