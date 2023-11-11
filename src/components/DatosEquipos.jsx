import { ListItemPrefix } from "@material-tailwind/react";
import useEquipos from "../hooks/useEquipos";
import {
    PlusIcon,
    AdjustmentsHorizontalIcon
  } from "@heroicons/react/24/solid";

const DatosEquipos = () => {

    const { equipo } = useEquipos();

    const { proyectos } = equipo;

  return (
    <>  
        <div className="flex justify-start border-b p-2 sticky top-0 bg-white z-10">
            <div className="flex-1 ml-2 ">
                <h2 className="text-silver-950 font-bold text-sm inline">Actividades</h2>
            </div>
            <div>
                <ListItemPrefix>
                    <AdjustmentsHorizontalIcon className="h-5 w-5 hover:cursor-pointer hover:text-midnight-800"/>
                </ListItemPrefix>
            </div>
        </div>
        <div className="">
            {proyectos?.length ? 
                proyectos.map(proyecto => (
                    <div 
                        className="border-b w-full"
                        key={proyecto.id}
                    >
                        <p className="px-4 py-2 overflow-hidden whitespace-nowrap overflow-ellipsis capitalize text-sm text-silver-950 hover:bg-silver-300 hover:cursor-pointer">{proyecto.nombre}</p>
                    </div>
            )):
            <p>No hay Actividades aún</p>
            }
        </div>
        
    </>

  )
}

export default DatosEquipos