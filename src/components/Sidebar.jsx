import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useEquipos from "../hooks/useEquipos";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    InboxIcon,
    PowerIcon,
    PlusIcon,
    UserCircleIcon
  } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Sidebar = () => {

  const { auth } = useAuth();
  const { handleModalEquipo,totalEquipos, } = useEquipos();

   return (
    <aside className="md:w-1/4 lg:w-1/5 xl:w-1/6 w-full container">
      <Card className="md:w-1/4 lg:w-1/5 xl:w-1/6 w-full md:min-h-screen fixed top-16 left-0 bottom-0 z-10">
            <div className="mt-2 p-5">
                <Typography variant="h5" color="blue-gray" className="mt-2 mb-1">
                    Bienvenido: {auth.nombre}
                </Typography>
                <List>
                    <ListItem className="hover:bg-slate-100">
                        <ListItemPrefix>
                            <PlusIcon className="h-5 w-5"/>
                        </ListItemPrefix>
                        <button 
                            onClick={handleModalEquipo}
                        >
                            Nuevo Equipo
                        </button>
                    </ListItem>
                    <ListItem className="hover:bg-slate-100">
                        <ListItemPrefix>
                            <UserCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Perfil
                    </ListItem>
                </List>

            </div>

            <List>
                <ListItem className="hover:bg-slate-100">
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Dashboard
                </ListItem>

                <Link
                    to='/equipos'
                >
                    <ListItem className="hover:bg-slate-100">
                        <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" />
                        </ListItemPrefix>
                            Equipos
                        <ListItemSuffix>
                        <Chip value={totalEquipos} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                        </ListItemSuffix>
                    </ListItem>
                </Link>

                <ListItem className="hover:bg-slate-100">
                    <ListItemPrefix>
                    <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
      </Card>
    </aside>
  )
}

export default Sidebar

  
  export function DefaultSidebar() {
    
  }