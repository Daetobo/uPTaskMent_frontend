import { useState } from "react";
import useEquipos from "../hooks/useEquipos";
import {
  ListItem,
  ListItemPrefix
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  TrashIcon
} from "@heroicons/react/24/solid";


const Miembro = ({usuario}) => {

  const { obtenerMiembro } = useEquipos();
  const {nombre, _id} = usuario;

  const [showTrashIcon, setShowTrashIcon] = useState(false);

  return (

    <ListItem
      className="hover:bg-slate-100 gap-2 flex justify-between relative"
      onMouseEnter={() => setShowTrashIcon(true)}
      onMouseLeave={() => setShowTrashIcon(false)}
    >
      <div className="flex justify-between">
        <ListItemPrefix>
          <UserCircleIcon className="h-8 w-8" />
        </ListItemPrefix>
        <button
          className="text-left text-silver-950 capitalize block w-44 overflow-hidden whitespace-nowrap overflow-ellipsis"
          onClick={() => obtenerMiembro(_id)}
        >
          {nombre}
        </button>
      </div>

      {showTrashIcon && (
        <div className="">
          <TrashIcon className="h-5 w-5 text-midnight-500" />
        </div>
      )}
</ListItem>
  )
}

export default Miembro