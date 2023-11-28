import { Outlet,Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useEquipos from "../hooks/useEquipos";
import { CircularProgress } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DrawerEditarTarea from "../components/DrawerEditarTarea";

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();
    const { openDrawer } = useEquipos();

    if (cargando) return <CircularProgress />

  return (
    <>
        { auth._id  ? (
            <div>
              <Header />
              <div className="md:flex md:min-h-screen">
                <Sidebar/>
                <main className="md:flex-1 bg-silver-100">
                  <Outlet/>
                </main>
                {
                  openDrawer && (
                    <DrawerEditarTarea />
                  )  
                }
              </div>
            </div>
            
        ) : <Navigate to="/login" />}
    </>
  )
}

export default RutaProtegida