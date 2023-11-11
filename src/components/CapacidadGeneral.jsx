import { useEffect, useState } from 'react';
import useEquipos from '../hooks/useEquipos';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlCapacidad = () => {

  const { totalMiembrosEquipo,equipo } = useEquipos();

  const { nombre, proyectos, creador, createdAt } = equipo;

  return (
    <>
      <div className='flex justify-around p-6 items-center shadow-lg border rounded h-52 gap-1'>
        <div className='flex-col'>
          <p className='font-bold text-sm text-midnight-500 '>Total Usuarios: <span className='text-silver-900 font-normal'>{totalMiembrosEquipo}</span></p>
          <p className='font-bold text-sm text-midnight-500 '>Capacidad Disponible: <span className='text-silver-900 font-normal'>90%</span></p>
          <p className='font-bold text-sm text-midnight-500 '>% Asignación: <span className='text-silver-900 font-normal'>10%</span></p>
        </div>
        <div className=''>
          <CircularProgressbar
            value={10}
            text={`100% General`}
            styles={buildStyles({
                // pathColor: 50 > 100 ? '#DC2626' : '#3B82F6',
                // trailColor: '#F5F5F5',
                // textColor: 50 > 100 ? '#DC2626' : '#3B82F6'
                textSize: '10px'
            })}
            className='w-40'
          />
        </div>
      </div>
        <div className="bg-white shadow-lg border rounded h-40 mt-5">
          <div className='border-b py-2 px-5'>
            <h2 className='text-silver-950 font-bold text-sm inline'>Detalles</h2>
          </div>
            <div className='m-5 flex justify-between mt-10'>
              <div className='text-sm'>
                <h3 className='font-bold text-silver-950'>Equipo:</h3>
                <p className='text-silver-900'>{nombre}</p>
              </div>
              <div className='text-sm'>
                <h3 className='font-bold text-silver-950'>Actividades:</h3>
                <p className='text-silver-900'>{proyectos?.length}</p>
              </div>
              <div className='text-sm'>
                <h3 className='font-bold text-silver-950'>Creador:</h3>
                <p className='text-silver-900'>{creador?.nombre}</p>
              </div>
              <div className='text-sm'>
                <h3 className='font-bold text-silver-950'>Fecha Creación:</h3>
                <p className='text-silver-900'>{createdAt?.split('T')[0]}</p>
              </div>
            </div>
        </div>
    </>
    
  )
}

export default ControlCapacidad