import useEquipos from '../hooks/useEquipos';
import ModalFormEquipo from '../components/ModalFormEquipo';
import PreviewEquipos from '../components/PreviewEquipos';
import { PlusIcon } from "@heroicons/react/24/solid";

const Equipos = () => {

  const { equipos, handleModalEquipo } = useEquipos();

  return (
    <div className='flex justify-center'>
      <ul className='mt-24 md:w-11/12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1'>
          <button 
            className="overflow-hidden border rounded-lg shadow-md m-2 lg:m-4 p-4 bg-silver-200 hover:bg-silver-400 h-24"
            onClick={handleModalEquipo}
            >
              <li className="block text-center">
                  <div className="p-4 flex gap-3 justify-center">
                      <PlusIcon className="h-5 w-5"/>
                      <h2 className="text-sm font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">Crear un nuevo equipo</h2>
                  </div>
              </li>
          </button>
          { equipos.length ? 
            equipos.map( equipo => (
              <PreviewEquipos 
                key={equipo._id}
                equipo={equipo}
              />
            ))
            :
            <p></p>
          } 
        </div>
      </ul>
      <ModalFormEquipo />
    </div>
  )
}

export default Equipos