import { useContext } from "react";
import ProyectosContext from "../context/EquipoProvider";

const useEquipos = () => {
    return useContext(ProyectosContext);
}

export default useEquipos;