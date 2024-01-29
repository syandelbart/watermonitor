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
      <main className="flex m-3 flex-col"> 
      <Label className="m-2 text-3xl items-start">WaterWatchers</Label>
      <div className='flex m-3 flex-col justify-center items-center'>
        <div className='flex m-5 flex-col justify-center w-1/2'>
          <div className='flex flex-row'>
            <div className='flex flex-col w-1/2'>
        <select
          className='m-2 p-2 rounded bg-transparent border grow mb-1'
          name="Municipality"
          value={Alarm.municipality}
          onChange={(e) => handleChangeMunicipality(e.target.value)}
        >
          <option value="">Choose Municipality</option>
          <option value="Vorst">Vorst</option>
        </select>
        <label className='m-2 mt-0 text-gray-500 text-sm'>
        Municipality
          </label>
            </div>
            <div className='flex flex-col w-1/2'>
        <select
          className='m-2 p-2 rounded bg-transparent border grow mb-1'
          name="Municipality"
          value={Alarm.name}
          onChange={(e) => handleChangeName(e.target.value)}
        >
          <option value="">Choose Sensor</option>
          <option value="GrootMeer">Groot Meer</option>
        </select>
        <label className='m-2 mt-0 text-gray-500 text-sm'>
        sensor
        </label>
            </div>
          </div>
          <hr className='text-xl h-2 text-gray-500 m-1' />
          <div className='flex flex-row'>
          <div className='flex flex-col w-1/2'>
        <input
          className='m-2 p-2 mb-1 border rounded border-gray-300 text-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          type="number"
          name="Longitude"
          disabled
          value={Sensor.longitude}
        />
        <label className='m-2 mt-0 text-gray-500 text-sm'>
        Longitude
        </label>
          </div>
          <div className='flex flex-col w-1/2'>
        <input 
          className='m-2 p-2 mb-1 border rounded border-gray-300 text-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          type="number"
          name="Latitude"
          value={Sensor.latitude}
          disabled
        />
        <label className='m-2 mt-0 text-gray-500 text-sm'>
        Latitude
        </label>
            </div>
          </div>
          <hr className='text-xl h-2 text-gray-500 m-1' />
          <div className='flex m-3 justify-center items-center'>
            <div className='flex flex-col w-1/2'>
          <input 
          className='m-2 p-2 rounded border border-gray-300 text-gray-800'
          type="Date"
          name="Moment"
          placeholder='Moment'
          value={Alarm.moment}
          onChange={(e) => handleChangeMoment(e.target.value)}
          />
        <label className='m-2 mt-0 text-gray-500 text-sm'>
        Moment
        </label>
        </div>
          </div> 
          <div className='flex flex-row'>
        <div className='flex flex-col w-1/2'>
        <input 
          className='m-2 p-2 rounded border border-gray-300 text-gray-800'
          type="result"
          name="result"
          value={Alarm.result}
          onChange={(e) => handleChangeResult(e.target.value)}
        />
        <label className='m-2 mt-0 text-gray-500 text-sm'>
        Water Heigt
        </label>
        </div>
        <div className='flex flex-col w-1/2'>
        <select
          className='m-2 p-2 rounded rounded bg-transparent border'
          name="measurment"
          value={Alarm.measurment}
          onChange={(e) => handleChangeMeasurment(e.target.value)}
        >
          <option value="cm">cm</option>
          <option value="m">m</option>
        </select>
        <label className='m-2 mt-0 text-gray-500 text-sm'>
        measurment
        </label>
            </div>
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