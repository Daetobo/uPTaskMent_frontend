import { Outlet,Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { CircularProgress } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();

    if (cargando) return <CircularProgress />

  return (
    <>
        { auth._id  ? (
            <div>
              <Header />
              <div className="md:flex md:min-h-screen">
                <Sidebar/>
                <main className="md:flex-1">
                  <Outlet/>
                </main>
              </div>
            </div>
            
        ) : <Navigate to="/login" />}
    </>
  )
}

export default RutaProtegida