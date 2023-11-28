import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useEquipos from "../hooks/useEquipos";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { 
    TrashIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";
import DatosEquipos from "../components/DatosEquipos";
import ModalFormMiembroEquipo from "../components/ModalFormMiembroEquipo";
import Miembro from "../components/Miembro";
import PreviewSprint from "../components/PreviewSprint";


const Equipo = () => {

    const params = useParams();
    
    const { obtenerEquipo, equipo, cargando, editarEquipo,eliminarEquipo,handleModalMiembroEquipo } = useEquipos();

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
            <div className="border py-2 px-2 sticky top-16 bg-white z-50">
                <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            className="font-bold text-lg hover:bg-silver-100 rounded hover:cursor-pointer  overflow-hidden overflow-ellipsis text-center w-auto whitespace-nowrap max-w-xs"
                            value={nombre}
                            size={nombre?.length}
                            onChange={e => setNombre(e.target.value)}
                            onBlur={handleNombreBlur}
                        />
                        <button
                            onClick={handleModalMiembroEquipo}
                            className="flex items-center gap-1 px-3 py-2 bg-silver-600 rounded-md text-sm font-bold text-white"
                        >   
                            <PlusIcon className="h-5 w-5 hover:cursor-pointer"/>
                            Añadir Miembro
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
            <div>
                
            </div>
            <div className="flex text-sm text-center mt-20 p-3 justify-end items-center px-10">
                {equipo.miembros?.length ? 
                    equipo.miembros.map(usuario => (
                        <Miembro
                            key={usuario._id}
                            usuario={usuario}
                        />
                    ))
                    : <p className="text-sm text-center">Aún no hay miembros en tu equipo</p>
                }
            </div>
            
            <div className="grid grid-cols-1 mx-10 mt-3 gap-3 relative overflow-hidden h-full">
                <div className="">
                    {equipo.sprints?.length &&
                        equipo.sprints.map(sprint => (
                            <PreviewSprint 
                                key={sprint._id}
                                sprint={sprint}
                            />
                        ))
                    }
                </div>
                <div className="bg-violet-100 shadow-lg rounded-lg p-2 mb-10">
                    <DatosEquipos/>
                </div>  
            </div>
            <ModalFormMiembroEquipo/>
        </div>
    )

  )

}

export default Equipo