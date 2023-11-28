import { Link } from "react-router-dom";
import imgTeam from "../images/imgTeam.svg";

const PreviewEquipos = ({equipo}) => {

    const { nombre, _id, miembros } = equipo;

  return (
    <>
        <Link to={`${_id}`} className="overflow-hidden border rounded-lg shadow-md m-2 bg-white hover:bg-silver-300 h-24 flex items-center gap-2 p-5">
            <li className="text-center">
                <img src={imgTeam} alt="icon equipo" className='h-10 w-10' />
            </li>
            <di>
                <h2 className="flex-1 text-silver-800 text-xs font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">{nombre}</h2>
                <div className="flex items-center gap-1">
                    <p className="text-3xl font-bold inline-block">{miembros?.length}</p>
                    <p className="inline-block text-xs text-silver-700 ">Users</p>
                </div>
                
            </di>
        </Link>
        
    </>

  )
}

export default PreviewEquipos