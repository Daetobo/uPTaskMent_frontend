import { useEffect } from "react";
import useEquipos from "../hooks/useEquipos";
import ModalFormMiembroEquipo from "../components/ModalFormMiembroEquipo";
import {
    Card,
    List,
    ListItemPrefix,
    ListItem,
    ListItemSuffix,
    Chip
  } from "@material-tailwind/react";
import {
    PlusIcon,
    AdjustmentsHorizontalIcon
  } from "@heroicons/react/24/solid";
import Miembro from "./Miembro";

const Sidebar = () => {

  const { equipo,handleModalMiembroEquipo,totalMiembrosEquipo, setTotalMiembrosEquipo} = useEquipos();
  useEffect(() => {
    setTotalMiembrosEquipo(equipo.miembros?.length)
  }, []);

  return (
      <Card className="md:max-h-screen fixed top-16 left-0 bottom-0 z-10 md:w-72">
            <div className="flex items-center justify-between border-b-2 px-3 text-lg font-bold">
                <ListItem className="hover:bg-slate-100">
                    Users
                    <ListItemSuffix>
                        <Chip value={totalMiembrosEquipo} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                    </ListItemSuffix>
                </ListItem>
    
                <div className="flex gap-3">
                    <ListItemPrefix>
                        <AdjustmentsHorizontalIcon className="h-5 w-5 hover:cursor-pointer hover:text-midnight-800"/>
                    </ListItemPrefix>
                    <button
                        onClick={handleModalMiembroEquipo}
                    >
                        <ListItemPrefix>
                            <PlusIcon className="h-5 w-5 hover:cursor-pointer hover:text-midnight-800"/>
                        </ListItemPrefix>
                    </button>
                </div>
            </div>

            <List className="overflow-y-auto">
                {equipo.miembros?.length ? 
                    equipo.miembros.map(usuario => (
                        <Miembro
                            key={usuario._id}
                            usuario={usuario}
                        />
                    ))
                    : <p className="text-sm text-center mt-48 p-3">Aún no hay miembros en tu equipo</p>
                }
            </List>
            <ModalFormMiembroEquipo />
      </Card>
  )
}

export default Sidebar;