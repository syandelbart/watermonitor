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
        <div className="flex grow max-w-full relative z-[0]">
          <SelectComponent
            closeMenuOnSelect={false}
            onChange={(event) => setSelectedStations(event)}
            label="Stations"
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
        </div>
        <div className="mt-5 ml-2 flex justify-end">
          <button
            className="border-2 border-emerald-800 rounded bg-emerald-800 text-white hover:text-emerald-800 hover:bg-white"
            onClick={() => setSavedStations(selectedStations)}
          >
            Save selection
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border-1 rounded overflow-hidden">
          <iframe
            src={`${process.env.NEXT_PUBLIC_GRAFANA_URL}?orgId=1&from=${
              period.from
            }&to=${period.to}&panelId=34&var-station=${savedStations
              .map((station) => station.value)
              .join("&var-station=")}&theme=light`}
            width="100%"
            className="aspect-video"
          ></iframe>
        </div>
        <div className="border-1 rounded overflow-hidden">
          <iframe
            src={`${process.env.NEXT_PUBLIC_GRAFANA_URL}?orgId=1&from=${period.from}&to=${period.to}&panelId=22&theme=light`}
            width="100%"
            className="aspect-video"
          ></iframe>
        </div>
        <div className="grid grid-cols-4 gap-4 col-span-2">
          {savedStations.map((station) => (
            <div key={`station-height-${station.value}`}>
              <h2>{station.label}</h2>
              <div className="border-1 rounded overflow-hidden">
                <iframe
                  src={`${process.env.NEXT_PUBLIC_GRAFANA_URL}?orgId=1&from=${period.from}&to=${period.to}&panelId=38&var-station=${station.value}&theme=light`}
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
