import useEquipos from '../hooks/useEquipos';
import ModalFormEquipo from '../components/ModalFormEquipo';
import PreviewEquipos from '../components/PreviewEquipos';
import { PlusIcon } from "@heroicons/react/24/solid";
import addIcon from "../images/addIcon.svg"

const Equipos = () => {

  const { equipos, handleModalEquipo } = useEquipos();

  return (
    <div className=''>
      <ul className='mt-20 mx-3'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>
          <button 
            className="overflow-hidden border rounded-lg shadow-md m-2 bg-white hover:bg-silver-300 h-24 flex items-center gap-2 p-5"
            onClick={handleModalEquipo}
            >
              <li className="text-center">
                  <img src={addIcon} alt='icon add equipo' className="h-10 w-10"/>
              </li>
              <div>
                <h2 className="text-sm font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">Crear un nuevo equipo</h2>
              </div>
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