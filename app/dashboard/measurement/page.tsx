"use client";
import {Label} from 'reactstrap';
import { useState } from 'react';

export default function Page() {
  const [Sensor, setSensor] = useState({municipality: '', name: '',  longitude: 10.00, latitude: 3.00});
  const [Alarm, setAlarm] = useState({municipality: '', name: '',  moment: '', result : 0.00, measurment: '', image: null as File | null});
  //const { data, loading, error } = useQuery(GET_COURSE, { variables: { id }, skip: id === 0 });

  function handleInsert() {
    console.log(Alarm);
  }

  function handleChangeMunicipality(value: any) {
    setAlarm({ ...Alarm, municipality: value });
  }

  function handleChangeName(value: any) {
    setAlarm({ ...Alarm, name: value });
  }

  function handleChangeMoment(value: any) {
    setAlarm({ ...Alarm, moment: value });
  }

  function handleChangeResult(value: any) {
    setAlarm({ ...Alarm, result: value });
  }
  function handleChangeMeasurment(value: any) {
    setAlarm({ ...Alarm, measurment: value });
  }

  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event?.target?.files?.[0]; // Use optional chaining to handle potential null or undefined
    if (file) {
      setAlarm({ ...Alarm, image: file });
    }
  }
    return (
    <main className="flex m-10 flex-col"> 
      <Label className="m-3 text-3xl items-start">WaterWatchers</Label>
      <div className='flex m-10 flex-col justify-center items-center'>
        <div className='flex m-10 flex-col justify-center items-start'>
          <div>
            <label className='m-3'>
        <select
          className='m-3 rounded p-2'
          name="Municipality"
          value={Alarm.municipality}
          onChange={(e) => handleChangeMunicipality(e.target.value)}
        >
          <option value="choose">null</option>
          <option value="Vorst">Vorst</option>
        </select>
        Municipality
            </label>
            <label className='m-3'>
        <select
          className='m-3 rounded p-2'
          name="Municipality"
          value={Alarm.name}
          onChange={(e) => handleChangeName(e.target.value)}
        >
          <option value="choose">null</option>
          <option value="GrootMeer">Groot Meer</option>
        </select>
        sensor
            </label>
      </div>
      <hr />
      <div>
        <label className='m-3'>
        <input
          className='m-3 p-2 rounded border border-gray-400 text-gray-800'
          type="number"
          name="Longitude"
          disabled
          value={Sensor.longitude}
          
        />
        Longitude
        </label>
        <label className='m-3'>
        <input 
          className='m-3 p-2 rounded border border-gray-400 text-gray-800'
          type="number"
          name="Latitude"
          value={Sensor.latitude}
          disabled
        />
        Latitude
        </label>
      </div>
      <hr className='text-black'/>
      <div className='flex m-3 justify-center items-center'>
      <input 
          className='m-3 p-2 rounded border border-gray-400 text-gray-800'
          type="date"
          name="Moment"
          placeholder='Moment'
          value={Alarm.moment}
          onChange={(e) => handleChangeMoment(e.target.value)}
        />
      </div>
        <div>
        <label className='m-3'>
        <input 
          className='m-3 p-2 rounded border border-gray-400 text-gray-800'
          type="result"
          name="result"
          value={Alarm.result}
          onChange={(e) => handleChangeResult(e.target.value)}
        />
        Water Heigt
        </label>
        <label className='m-3'>
        <select
          className='m-3 p-2 rounded'
          name="measurment"
          value={Alarm.measurment}
          onChange={(e) => handleChangeMeasurment(e.target.value)}
        >
          <option value="cm">cm</option>
          <option value="m">m</option>
        </select>
        measurment
            </label>
        </div>
      </div>
      <div className='flex m-3 flex-col justify-center items-center'>
      <input type="file" id="img" name="img" accept="image/*" hidden  onChange={handleChangeImage}/>
        <label htmlFor="img" className='bg-gray-400 rounded p-3 text-gray-800 text-lg cursor-pointer'>
        Upload Image
        </label>
      </div>
      <button className='m-3 bg-black text-white p-2 rounded' type="submit" onClick={handleInsert}>Add water level for location</button>
      </div>
    </main>);
  }