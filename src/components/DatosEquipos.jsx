import { ListItemPrefix } from "@material-tailwind/react";
import useEquipos from "../hooks/useEquipos";
import {
    PlusIcon,
    AdjustmentsHorizontalIcon
} from "@heroicons/react/24/solid";
import ModalFormSprint from '../components/ModalFormSprint'

const DatosEquipos = () => {

    const { handleModalFormSprint } = useEquipos();

  return (
    <>  
        <div className="flex justify-start py-2 px-5 sticky top-0 bg-violet-100 z-10 items-center">
            <div className="flex-1 ml-2 ">
                <h2 className="text-silver-950 font-bold text-sm inline">Backlog</h2>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={handleModalFormSprint}
                    className="text-sm font-bold px-2 py-2 bg-violet-300 hover:bg-violet-400 rounded-md"
                >
                    Crear Sprint
                </button>
                <ListItemPrefix>
                    <AdjustmentsHorizontalIcon className="h-5 w-5 hover:cursor-pointer hover:text-midnight-800"/>
                </ListItemPrefix>
            </div>
        </div>
        <div className="">
            <div className="border-dashed border-2 border-silver-300 p-4 mb-1">
                <p className="text-xs text-silver-700 text-center">Tu backlog está vacío</p>
            </div>
            <div className="">
                <button className="text-sm font-bold flex gap-1 w-full px-6 hover:bg-violet-200 py-3 rounded-md">
                    <ListItemPrefix>
                        <PlusIcon className="h-5 w-5"/>
                    </ListItemPrefix>
                    Crear Tarea
                </button>
            </div>
        </div>
        <ModalFormSprint/>
    </>

  )
}

export default DatosEquipos