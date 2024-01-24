"use client";
import {Label} from 'reactstrap';
import { useState } from 'react';

export default function Page() {
  const [Sensor, setSensor] = useState({municipality: '', name: '',  longitude: 0.00, latitude: 0.00});
  const [Alarm, setAlarm] = useState({municipality: '', name: '',  moment: '', result : 0.00, measurment: ''});
  //const { data, loading, error } = useQuery(GET_COURSE, { variables: { id }, skip: id === 0 });

  function handleInsert() {
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
          value={Alarm.municipality}
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
          value={Alarm.name}
          onChange={handleChangeName}
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
          disabled
          value={Sensor.longitude}
          
        />
        Longitude
        </label>
        <label className='m-3'>
        <input 
          className='m-3 border border-gray-400 text-gray-800'
          type="number"
          name="Latitude"
          value={Sensor.latitude}
          disabled
        />
        Latitude
        </label>
      </div>
      <hr className='text-black'/>
      <input 
          className='m-3 border border-gray-400 text-gray-800'
          type="date"
          name="Moment"
          placeholder='Moment'
          value={Alarm.moment}
          onChange={handleChangeMoment}
        />
        <div>
        <label className='m-3'>
        <input 
          className='m-3 border border-gray-400 text-gray-800'
          type="result"
          name="result"
          value={Alarm.result}
          onChange={handleChangeResult}
        />
        result
        </label>
        <label className='m-3'>
        <select
          className='m-3'
          name="measurment"
          value={Alarm.measurment}
          onChange={handleChangeMeasurment}
        >
          <option value="cm">cm</option>
          <option value="m">m</option>
        </select>
        measurment
            </label>
        </div>
      </div>
      <button className='m-3' type="submit" onClick={handleInsert}>Submit</button>
      </div>
    </main>);
  }