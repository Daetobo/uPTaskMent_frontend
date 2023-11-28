import { useState } from "react";
import useEquipos from "../hooks/useEquipos";
import { formatName } from "../../utils/format";
import {
  TrashIcon
} from "@heroicons/react/24/solid";


const Miembro = ({usuario}) => {

  const { obtenerMiembro } = useEquipos();
  const {nombre, _id} = usuario;

  const iniciales = formatName(nombre)

  return (

    <div
      className="h-10 w-10 bg-black border rounded-full flex justify-center hover:cursor-pointer"
    >
      <button
        className="uppercase text-center font-semibold text-white"
        onClick={() => obtenerMiembro(_id)}
      >
        {iniciales}
      </button>
  </div>
  )
}

export default Miembro