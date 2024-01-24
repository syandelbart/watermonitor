"use client";
import {Label} from 'reactstrap';
import { useState } from 'react';

export default function Page() {
  const [Sensor, setSensor] = useState({municipality: '', name: '',  longitude: 0.00, latitude: 0.00});
  //const { data, loading, error } = useQuery(GET_COURSE, { variables: { id }, skip: id === 0 });

  function handleInsert() {
  }

  function handleChangeLongitude(value: any) {
    setSensor({ ...Sensor, longitude: value });
  }

  function handleChangeLatitude(value: any) {
    setSensor({ ...Sensor, latitude: value });
  }

    return (
    <main className="flex m-10 flex-col"> 
      <Label className="m-3 text-3xl items-start">WaterWatchers</Label>
      <label>
        <input
          type="number"
          name="Longitude"
          value={Sensor.longitude}
          onChange={handleChangeLongitude}
        />
        Longitude
      </label>
      <label>
        <input
          type="number"
          name="Latitude"
          value={Sensor.latitude}
          onChange={handleChangeLatitude}
        />
        Latitude
      </label>
      <button type="submit" onClick={handleInsert}>Submit</button>
    </main>);
  }