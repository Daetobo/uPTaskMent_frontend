import { useState } from "react";
import useEquipos from "../hooks/useEquipos";
import Tarea from "../components/Tarea";
import { formatDateMMDD } from "../../utils/format";
import { ListItemPrefix } from "@material-tailwind/react";
import {
    PlusIcon,
    AdjustmentsHorizontalIcon,
    PencilSquareIcon,
    TrashIcon
} from "@heroicons/react/24/solid";
import PopoverFormTarea from "./PopoverFormTarea";

const PreviewSprint = ({sprint}) => {

    const {nombre, fechaInicio, fechaFinal} = sprint;
    const inicioSprint = formatDateMMDD(fechaInicio)
    const finalSprint = formatDateMMDD(fechaFinal)

    const [id,setId] = useState(sprint._id);

    const {handleModalEditarSprint, eliminarSprint,handleClickPopover, mostrarAlerta} = useEquipos();

    const handleClick = () => {
        if (confirm('¿Deseas Eliminar este Sprint?')) {
            eliminarSprint(id)
        }
        setTimeout(() => {
            mostrarAlerta({})
        }, 2000);
    }

  return (
    <div className="bg-white shadow-lg rounded-lg p-2 mb-10">  
        <div className="flex justify-start py-2 px-5 sticky top-0 bg-white z-10 items-center">
            <div className="flex-1 ml-2 flex items-center gap-2">
                <h2 className="text-silver-950 font-bold text-sm inline">{nombre}</h2>
                <button 
                    className="flex gap-1 hover:cursor-pointer bg-violet-200 hover:bg-violet-300 px-2 py-1 rounded"
                    onClick={()=>handleModalEditarSprint(sprint)}
                >
                    <PencilSquareIcon className="h-4 w-4 text-violet-800"/>
                    <p className="text-xs font-bold text-violet-800">Editar sprint</p>
                </button>
                <p className="text-sm text-slate-500 font-medium">{inicioSprint}</p>
                <p className="text-sm text-slate-500 font-medium">-</p>
                <p className="text-sm text-slate-500 font-medium">{finalSprint}</p>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    
                    className="text-sm font-bold px-2 py-2 bg-silver-200 hover:bg-silver-300 rounded-md"
                >
                    Completar Sprint
                </button>
                <ListItemPrefix>
                    <AdjustmentsHorizontalIcon className="h-5 w-5 hover:cursor-pointer hover:text-midnight-800"/>
                </ListItemPrefix>
                <button
                    onClick={handleClick}
                >
                    <TrashIcon className="h-5 w-5 hover:cursor-pointer hover:text-red-600"/>
                </button>
            </div>
        </div>
        <div className="">
            {
                sprint.tareas?.length ? 
                    sprint.tareas.map(tarea => (
                        <Tarea 
                            key={tarea._id}
                            tarea={tarea}
                        />
                    ))
                    :
                    <div className="border-dashed border-2 border-silver-300 p-4 mb-1">
                        <p className="text-xs text-silver-700 text-center">Planifica tu sprint creando tareas y asignandolas a miembros de tu equipo</p>
                    </div>
            }  

            <div className="mt-1">
                <button 
                    className="text-sm font-bold flex gap-1 w-full px-6 hover:bg-silver-100 py-3 rounded-md"
                    onClick={(e) => handleClickPopover(e,id)}
                >
                    <ListItemPrefix>
                        <PlusIcon className="h-5 w-5"/>
                    </ListItemPrefix>
                    Crear Tarea
                </button>
                <PopoverFormTarea />
            </div>
        </div>
    </div>
  )
}

export default PreviewSprint