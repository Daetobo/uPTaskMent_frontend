import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Header = () => {

    const { auth } = useAuth()

  return (
    <header className="px-4 md:h-16 bg-white border-b fixed top-0 left-0 right-0 z-50 ">

        <div className="md:flex md:justify-between md:h-full md:items-center">

            <h2 className="text-2xl text-midnight-500 font-black text-center mb-5 p-2  md:mb-0">UpTaskMent</h2>

            <div className="flex flex-col md:flex-row items-center gap-4 h-full">

                {auth._id ? (
                    <>
                        <button
                            type="button"
                            className="font-bold"
                            // onClick={handleBuscador}
                        >
                            Buscar Equipo
                        </button>

                        <Link
                            to="/equipos"
                            className="font-bold"
                        >
                            Equipos
                        </Link>
                    </>
                ):
                    <Link
                        className="bg-midnight-500 px-5 py-5 text-white font-semibold text-lg max-h-16 hover:bg-midnight-600"
                        to='registrar'
                    >
                        Obtener UpTaskMent gratis
                    </Link>
                }


                {
                    auth._id ? (
                        <button
                            type="button"
                            className=" text-white bg-midnight-500 rounded-md p-2 font-bold text-sm "
                            // onClick={handleCerrarSesion}
                        >
                            Cerrar Sesión
                        </button>
                    ):
                    <Link
                        to="login"
                        className="text-lg tracking-wide font-sans"
                    >Iniciar sesión</Link>
                }

            </div>

        </div>

    </header>
  )
}

export default Header