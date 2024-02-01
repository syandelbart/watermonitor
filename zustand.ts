import { create } from "zustand";

import { Measurement, NodeRedAuthHeaders, Sensor } from "./types/general";

type SensorStore = {
  sensors: Sensor[];
  isFetchedInitial: boolean;
  add: (sensor: Sensor) => void;
  modify: (sensor: Sensor) => void;
  remove: (sensorId: number) => void;
  removeAll: () => void;
  fetch: () => void;
};

export const useSensorStore = create<SensorStore>((set) => {
  const state: SensorStore = {
    sensors: [],
    isFetchedInitial: false,
    add: (sensor) => set((state) => ({ sensors: [...state.sensors, sensor] })),
    remove: (sensorId) =>
      set((state) => ({
        sensors: state.sensors.filter((sensor) => sensor.id !== sensorId),
      })),
    modify: (sensor) =>
      set((state) => ({
        sensors: state.sensors.map((s) =>
          sensor.id === s.id ? { ...sensor } : sensor
        ),
      })),
    removeAll: () => set({ sensors: [] }),
    fetch: async () => {
      try {
        const response = await fetch("/api/sensor", {
          headers: NodeRedAuthHeaders,
        });
        const data: Sensor[] = await response.json();
        set({ sensors: data, isFetchedInitial: true });
      } catch (error) {
        console.error("Failed to fetch sensors:", error);
      }
    },
  };

  (async () => {
    // Call any actions or set any state you need here
    await state.fetch();
  })();

  return state;
});

type MeasurementStore = {
  measurements: Measurement[];
  isFetchedInitial: boolean;
  add: (measurement: Measurement) => void;
  remove: (measurementId: number) => void;
  removeAll: () => void;
  fetch: () => void;
};

export const useMeasurementStore = create<MeasurementStore>((set) => {
  const state: MeasurementStore = {
    measurements: [],
    isFetchedInitial: false,
    add: (measurement) =>
      set((state) => ({ measurements: [...state.measurements, measurement] })),
    remove: (measurementId) =>
      set((state) => ({
        measurements: state.measurements.filter(
          (measurement) => measurement.id !== measurementId
        ),
      })),
    removeAll: () => set({ measurements: [] }),
    fetch: async () => {
      try {
        const response = await fetch("/api/measurements", {
          headers: NodeRedAuthHeaders,
        });
        const data: Measurement[] = await response.json();
        set({ measurements: data, isFetchedInitial: true });
      } catch (error) {
        console.error("Failed to fetch measurements:", error);
      }
    },
  };

  (async () => {
    // Call any actions or set any state you need here
    await state.fetch();
  })();

  return state;
});
