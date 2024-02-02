"use client";

import { useState } from "react";

import SelectComponent from "@/app/components/SelectComponent";
import { Station } from "@/types/general";

const getConstructedNameFromStation = (station: Station) => {
  return `${station.municipality}/${station.station}`;
};

const Dashboard = ({ stations }: { stations: Station[] }) => {
  const [period, setPeriod] = useState({
    from: new Date().getTime() - 1000 * 60 * 60 * 6,
    to: new Date().getTime(),
  });
  const [selectedStations, setSelectedStations] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const [savedStations, setSavedStations] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  return (
    <div>
      <div className="flex flex-row py-4">
        <div className="flex grow max-w-full relative z-[0] flex-wrap gap-4">
          <SelectComponent
            closeMenuOnSelect={false}
            onChange={(event) => setSelectedStations(event)}
            className="w-full"
            label="Selected Stations"
            isMulti
            options={stations.map((station) => ({
              value: station.station,
              label: getConstructedNameFromStation(station),
            }))}
          />
          <input
            type="datetime-local"
            onChange={(event) =>
              setPeriod({
                ...period,
                from: new Date(event.target.value).getTime(),
              })
            }
            value={new Date(period.from).toISOString().slice(0, 16)}
          />
          <input
            type="datetime-local"
            onChange={(event) =>
              setPeriod({
                ...period,
                to: new Date(event.target.value).getTime(),
              })
            }
            value={new Date(period.to).toISOString().slice(0, 16)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setSavedStations(selectedStations)}
          >
            Save selection
          </button>
        </div>
        <div className="mt-5 ml-2 flex justify-end"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <h1 className="text-3xl w-full border-b border-b-gray-400 col-span-2 my-4 py-3">
          General overview
        </h1>
        <div className="border-1 rounded overflow-hidden">
          <iframe
            src={`${
              process.env.NEXT_PUBLIC_GRAFANA_URL
            }?theme=light&orgId=1&from=${period.from}&to=${
              period.to
            }&panelId=34&var-station=${savedStations
              .map((station) => station.value)
              .join("&var-station=")}`}
            width="100%"
            className="aspect-video"
          ></iframe>
        </div>
        <div className="border-1 rounded overflow-hidden">
          <iframe
            src={`${process.env.NEXT_PUBLIC_GRAFANA_URL}?theme=light&orgId=1&from=${period.from}&to=${period.to}&panelId=22`}
            width="100%"
            className="aspect-video"
          ></iframe>
        </div>
        <h1 className="text-3xl w-full border-b border-b-gray-400 col-span-2 my-4 py-3">
          Heights per station
        </h1>
        <div className="grid grid-cols-4 gap-4 col-span-2">
          {savedStations.map((station) => (
            <div key={`station-height-${station.value}`}>
              <h2 className="text-center font-semibold">
                {station.label.substring(0, station.label.indexOf("/"))}
              </h2>
              <div className="rounded overflow-hidden">
                <iframe
                  src={`${process.env.NEXT_PUBLIC_GRAFANA_URL}?theme=light&orgId=1&from=${period.from}&to=${period.to}&panelId=38&var-station=${station.value}`}
                  width="100%"
                  className="aspect-video"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
