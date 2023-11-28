import useEquipos from '../hooks/useEquipos';
import tasks from '../images/tasks.svg';
import addUser from '../images/addUser.svg';
import {
  ClockIcon,
  TrashIcon
} from "@heroicons/react/24/solid";
import { useState } from 'react';
import ModalEliminarTarea from '../components/ModalEliminarTarea';
import DrawerEditarTarea from '../components/DrawerEditarTarea';

const Tarea = ({tarea}) => {

  const {nombre,tiempo} = tarea
  const [showIcon, setShowIcon] = useState(false);

  const {handleModalEliminarTarea,handleDrawerOpen} = useEquipos();

  const handleClick  = (event) => {
    // Evitar que el clic se propague cuando se hace clic en elementos internos
    event.stopPropagation();
    handleDrawerOpen();
  }

  const handleDeleteClick = (event) => {
    // Evitar que el clic se propague al contenedor principal
    event.stopPropagation();
    
    handleModalEliminarTarea(tarea);
  };  

  const handleClickAddMienbro = (event) => {
    event.stopPropagation();
    
  }

  return (
    <>
      <div 
        className="border border-silver-300 p-4 flex items-center justify-between hover:cursor-pointer hover:bg-silver-100"
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
        onClick={handleClick}
      >
          
          <div className='flex'>
            <div className='flex gap-1'>
                <img src={tasks} alt='tarea' className='h-5 w-5'/>
                <p className="text-sm text-silver-950 text-center uppercase">{nombre}</p>
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className='flex gap-1 items-start col-span-2 w-24'>
              <ClockIcon className="h-5 w-5 text-silver-400"/>
              <p className="text-sm text-silver-800"><span className="text-sm font-bold text-black">{tiempo}</span> mts</p>
            </div>
            <button 
              className='flex justify-end col-span-1'
              onClick={handleClickAddMienbro}
            >
                <img 
                  src={addUser} 
                  alt='agregar usuario' 
                  className='h-5 w-5 transition-all duration-300 transform hover:scale-125 hover:cursor-pointer' />
            </button>
            <div className='flex gap-1 justify-end col-span-1'>
              <button
                onClick={handleDeleteClick}
              >
                  <TrashIcon className="h-5 w-5 text-silver-400 transition-all duration-300 transform hover:scale-125"/>
              </button>
            </div>
          </div>
        <ModalEliminarTarea />
        
      </div>
      
    </>
  )
}

export default Tarea