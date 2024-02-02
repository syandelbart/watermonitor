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
    remove: async (sensorId) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APPLICATION_URL}/api/sensor`,
        {
          body: JSON.stringify({ id: sensorId }),
          method: "DELETE",
          headers: NodeRedAuthHeaders,
        }
      );

      if (!response.ok) return;

      set((state) => ({
        sensors: state.sensors.filter((sensor) => sensor.id !== sensorId),
      }));
    },
    modify: (sensor) =>
      set((state) => ({
        sensors: state.sensors.map((s) =>
          sensor.id === s.id ? { ...sensor } : s
        ),
      })),
    removeAll: () => set({ sensors: [] }),
    fetch: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APPLICATION_URL}/api/sensor`,
          {
            headers: NodeRedAuthHeaders,
            next: {
              revalidate: 0,
            },
          }
        );
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
    remove: async (measurementId) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APPLICATION_URL}/api/measurement`,
        {
          body: JSON.stringify({ id: measurementId }),
          method: "DELETE",
          headers: NodeRedAuthHeaders,
        }
      );

      if (!response.ok) return;

      set((state) => ({
        measurements: state.measurements.filter(
          (measurement) => measurement.id !== measurementId
        ),
      }));
    },
    removeAll: () => set({ measurements: [] }),
    fetch: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APPLICATION_URL}/api/measurement`,
          {
            headers: NodeRedAuthHeaders,
            next: {
              revalidate: 0,
            },
          }
        );
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
