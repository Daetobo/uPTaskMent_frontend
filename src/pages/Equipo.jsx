import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useEquipos from "../hooks/useEquipos";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import ControlCapacidad from "../components/ControlCapacidad";
import CapacidadGeneral from "../components/CapacidadGeneral";
import { 
    TrashIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";
import ModalFormProyecto from "../components/ModalFormProyecto";
import Sidebar from "../components/Sidebar";
import DatosEquipos from "../components/DatosEquipos";


const Equipo = () => {

    const params = useParams();
    
    const { obtenerEquipo, equipo, cargando, editarEquipo,eliminarEquipo,nuevoProyecto,handleModalFormProyecto } = useEquipos();

    const [nombre, setNombre] = useState(equipo.nombre);
    const [id, setId] = useState(equipo.nombre);

    useEffect(() => {
        obtenerEquipo(params.id);
        setId(equipo._id)
        setNombre(equipo.nombre);
    }, [params.id,equipo.nombre]);


    const handleNombreBlur = () => {
        editarEquipo({
            id,
            nombre
        })
    }


    const handleClick = () => {
        if(confirm('¿Deseas Eliminar este equipo?'))
        eliminarEquipo(id)
    };
    

  return (
    cargando ? <CircularProgress /> : (
        <div className="">
            <div className="border py-2 px-2 sticky top-16 bg-white">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="font-bold text-lg hover:bg-silver-100 rounded hover:cursor-pointer  overflow-hidden overflow-ellipsis text-center w-auto whitespace-nowrap max-w-xs"
                            value={nombre}
                            size={nombre?.length}
                            onChange={e => setNombre(e.target.value)}
                            onBlur={handleNombreBlur}
                        />
                        <button
                            onClick={handleModalFormProyecto}
                            className="flex items-center gap-1 px-3 py-2 bg-silver-600 rounded-md text-sm font-bold text-white"
                        >   
                            <PlusIcon className="h-5 w-5 hover:cursor-pointer"/>
                            Añadir Actividad
                        </button>
                    </div>
                    
                    <div className="px-2 flex gap-2 items-center">
                        <button
                            onClick={handleClick}
                        >
                            <TrashIcon  className="h-5 w-5 text-midnight-500 hover:text-red-600 hover:cursor-pointer"/>
                        </button>
                        <p className="text-silver-900 font-medium">Eliminar</p>
                    </div>
                </div>
            </div>
            <Sidebar/>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 m-5 bg-white mt-24 min-h-screen gap-3">
                <div className="bg-white shadow-lg border rounded h-96 overflow-y-auto relative">
                    <DatosEquipos/>
                </div>
                
                <div className="">
                    <CapacidadGeneral />
                </div>
            </div>
            <ModalFormProyecto/>
        </div>
    )

  )

}

export default Equipo