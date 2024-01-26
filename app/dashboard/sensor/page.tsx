"use client";
import {Label} from 'reactstrap';
import { useState } from 'react';
import Image from 'next/image';

export default function Page() {
  const [Sensor, setSensor] = useState({municipality: '', name: '',  longitude: 0.00, latitude: 0.00, image: null as File | null});
  //const { data, loading, error } = useQuery(GET_COURSE, { variables: { id }, skip: id === 0 });

  function handleInsert() {
    console.log(Sensor);
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

  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event?.target?.files?.[0]; // Use optional chaining to handle potential null or undefined
    if (file) {
      setSensor({ ...Sensor, image: file });
    }
  }

    return (
    <main className="flex m-10 flex-col"> 
      <Label className="m-3 text-3xl items-start">WaterWatchers</Label>
      <div className='flex m-10 flex-col justify-center items-center'>
        <div className='flex m-5 flex-col justify-center items-start'>
      <label className='m-3'>
        <select
          className='m-3 p-2 rounded bg-transparent border'
          name="Municipality"
          value={Sensor.municipality}
          onChange={(e) => handleChangeMunicipality(e.target.value)}
        >
          <option value="">Choose Municipality</option>
          <option value="Vorst">Vorst</option>
        </select>
        Municipality
      </label>
      <label className='m-3'>
      <input
          className='m-3 p-2 border rounded border-gray-400 text-gray-800'
          type="text" 
          name="Name"
          placeholder='Enter the sensor name'
          value={Sensor.name}
          onChange={(e) => handleChangeName(e.target.value)}
        />
        Sensor name
      </label>
      <hr />
      <label className='m-3'>
        <input
          className='m-3 p-2 border rounded border-gray-400 text-gray-800'
          type="number"
          name="Longitude"
          value={Sensor.longitude}
          onChange={(e) => handleChangeLongitude(e.target.value)}
        />
        Longitude
      </label>
      <label className='m-3'>
        <input 
          className='m-3 p-2 border rounded border-gray-400 text-gray-800'
          type="number"
          name="Latitude"
          value={Sensor.latitude}
          onChange={(e) => handleChangeLatitude(e.target.value)}
        />
        Latitude
      </label>
      <hr className='text-black'/>
      </div>
      <input type="file" id="img" name="img" accept="image/*" hidden  onChange={handleChangeImage}/>
        <label htmlFor="img" className='bg-gray-400 rounded p-3 text-gray-800 text-lg cursor-pointer'>
        Upload Image
        </label>
      <button className='m-3 mt-5 bg-black text-white p-2 rounded' type="submit" onClick={handleInsert}>Create sensor for location</button>
      </div>
    </main>);
  }