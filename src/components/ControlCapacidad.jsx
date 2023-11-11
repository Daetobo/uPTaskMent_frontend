import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlCapacidad = () => {
  return (
    <div className='flex justify-start p-6 items-center shadow-lg w-1/2 min-h-64 border rounded-xl ml-10'>
        <div className='w-1/2'>
        <CircularProgressbar
                    value={50}
                    text={`100% Capacidad`}
                    styles={buildStyles({
                        // pathColor: 50 > 100 ? '#DC2626' : '#3B82F6',
                        // trailColor: '#F5F5F5',
                        // textColor: 50 > 100 ? '#DC2626' : '#3B82F6'
                        textSize: '10px'
                    })}
                />
        </div>
    </div>
  )
}

export default ControlCapacidad