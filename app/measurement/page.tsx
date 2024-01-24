"use client";
import {Label} from 'reactstrap';
import { useState } from 'react';

export default function Page() {
  const [Sensor, setSensor] = useState({municipality: '', name: '',  longitude: 0.00, latitude: 0.00});
  //const { data, loading, error } = useQuery(GET_COURSE, { variables: { id }, skip: id === 0 });

  function handleInsert() {
  }

  function handleChangeMunicipality(value: any) {
    setSensor({ ...Sensor, municipality: value });
  }

  function handleChangeName(value: any) {
    setSensor({ ...Sensor, name: value });
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
      <div className='flex m-10 flex-col justify-center items-center'>
        <div className='flex m-10 flex-col justify-center items-start'>
          <div>
            <label className='m-3'>
        <select
          className='m-3'
          name="Municipality"
          value={Sensor.municipality}
          onChange={handleChangeMunicipality}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        Municipality
            </label>
            <label className='m-3'>
        <select
          className='m-3'
          name="Municipality"
          value={Sensor.municipality}
          onChange={handleChangeMunicipality}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        Municipality
            </label>
      </div>
      <hr />
      <div>
        <label className='m-3'>
        <input
          className='m-3 border border-gray-400 text-gray-800'
          type="number"
          name="Longitude"
          value={Sensor.longitude}
          onChange={handleChangeLongitude}
        />
        Longitude
        </label>
        <label className='m-3'>
        <input 
          className='m-3 border border-gray-400 text-gray-800'
          type="number"
          name="Latitude"
          value={Sensor.latitude}
          onChange={handleChangeLatitude}
        />
        Latitude
        </label>
      </div>
      <hr className='text-black'/>
      <input 
          className='m-3 border border-gray-400 text-gray-800'
          type="date"
          name="Latitude"
          placeholder='Moment'
          value={Sensor.latitude}
          onChange={handleChangeLatitude}
        />
        <div>
        <label className='m-3'>
        <input 
          className='m-3 border border-gray-400 text-gray-800'
          type="number"
          name="Latitude"
          value={Sensor.latitude}
          onChange={handleChangeLatitude}
        />
        Latitude
        </label>
        <label className='m-3'>
        <select
          className='m-3'
          name="Municipality"
          value={Sensor.municipality}
          onChange={handleChangeMunicipality}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        Municipality
            </label>
        </div>
      </div>
      <button className='m-3' type="submit" onClick={handleInsert}>Submit</button>
      </div>
    </main>);
  }