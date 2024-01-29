"use client";

import { useState } from "react";

import SelectComponent from "@/app/components/SelectComponent";
import { Station } from "@/types/general";

const Dashboard = ({ stations }: { stations: Station[] }) => {
  const [selectedStations, setSelectedStations] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  console.log(selectedStations);

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
            onChange={(event) => setSelectedStations(event)}
            label="Stations"
            isMulti
            options={stations.map((station) => ({
              value: station.name,
              label: station.name,
            }))}
          />
        </div>
        <div className="mt-5 ml-2 flex justify-end">
          <button className="border-2 border-emerald-800 rounded bg-emerald-800 text-white hover:text-emerald-800 hover:bg-white"
          onClick={() => setSavedStations(selectedStations)}>
            Save selection
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border-1 rounded overflow-hidden">
        <iframe
          src={`${
            process.env.NEXT_PUBLIC_GRAFANA_URL
          }?orgId=1&from=1706496762253&to=1706518362253&panelId=34&var-station=${savedStations
            .map((station) => station.value)
            .join("&var-station=")}`}
          width="100%"
          className="aspect-video"
        ></iframe>
        </div>
        <div className="border-1 rounded overflow-hidden">
        <iframe
          src={`${process.env.NEXT_PUBLIC_GRAFANA_URL}?orgId=1&from=1706498094771&to=1706519694771&panelId=22`}
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
                src={`${process.env.NEXT_PUBLIC_GRAFANA_URL}?orgId=1&from=1706498160237&to=1706519760238&panelId=38&var-station=${station.value}`}
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
