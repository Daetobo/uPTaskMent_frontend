import { Link } from "react-router-dom";

const PreviewEquipos = ({equipo}) => {

    const { nombre, _id } = equipo;

  return (
    <>
        <Link to={`${_id}`} className="overflow-hidden border rounded-lg shadow-md m-2 lg:m-4 p-4 bg-silver-400 hover:bg-silver-500 h-24">
            <li className="block text-center">
                <div className="p-4 ">
                    <h2 className="text-sm font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">{nombre}</h2>
                </div>
            </li>
            
        </Link>
        
    </>

  )
}

export default PreviewEquipos