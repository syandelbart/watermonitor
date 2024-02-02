"use client";

import Link from "next/link";
import { Table } from "reactstrap";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSensorStore } from "@/zustand";
import { Icon } from "@iconify/react";

const SensorTable = () => {
  const { sensors, add, remove } = useSensorStore();

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Sensor ID</TableHead>
          <TableHead>Municipality</TableHead>
          <TableHead>MAC Address</TableHead>
          <TableHead>Station Name</TableHead>
          <TableHead>(Longitude | Latitude)</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sensors.map((sensor, i) => (
          <TableRow key={sensor.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{sensor.id}</TableCell>
            <TableCell>{sensor.municipality}</TableCell>
            <TableCell>{sensor.mac_address}</TableCell>
            <TableCell>{sensor.station_name}</TableCell>
            <TableCell>
              {sensor.longitude &&
                sensor.latitude &&
                `(${sensor.longitude},${sensor.latitude})`}
            </TableCell>
            <TableCell className="flex text-2xl gap-2">
              <Link
                href={`/dashboard/sensor?id=${sensor.id}&action=edit`}
                className="cursor-pointer"
              >
                <Icon icon="mdi:pencil" />
              </Link>

              <button
                onClick={async () => {
                  console.log("clicked");
                  if ("serviceWorker" in navigator) {
                    const register = await navigator.serviceWorker.register(
                      "/sw.js"
                    );

                    const subscription = await register.pushManager.subscribe({
                      userVisibleOnly: true,
                      applicationServerKey:
                        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
                    });

                    const res = await fetch("/api/push/subscribe", {
                      method: "POST",
                      body: JSON.stringify(subscription),
                      headers: {
                        "content-type": "application/json",
                      },
                    });

                    const data = await res.json();
                    console.log(data);
                  }
                }}
              >
                <Icon icon="mdi:bell" />
              </button>

              <Icon
                className="cursor-pointer"
                icon="mdi:delete"
                onClick={async () => {
                  remove(sensor.id);
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SensorTable;
