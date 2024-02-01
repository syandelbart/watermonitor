export type Station = {
  station: string;
  municipality: string;
  province: string;
  threshold: number;
};

export type Municipality = {
  id: number;
  province: string;
  name: string;
};

export type Measurement = {
  id: number;
  sensor_id: string;
  moment: string;
  measurement: string;
  result: number;
};

export enum MeasurementTypes {
  cm = "cm",
  m = "m",
}

export type Sensor = {
  id: number;
  municipality: string;
  station_name: string;
  mac_address: string;
  image: string;
  longitude: number;
  latitude: number;
};

export const NodeRedAuthHeaders = new Headers({
  Authorization:
    "Basic " +
    Buffer.from(
      process.env.API_USERNAME + ":" + process.env.API_PASSWORD
    ).toString("base64"),
});
