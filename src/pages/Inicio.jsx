import { Link } from "react-router-dom";
import taskInicio from "../images/tarea.png";
import Header from "../components/Header";

const Index = () => {

  return (
      <>
        <Header />
        <section className="min-h-screen bg-gradient-to-l from-midnight-300 via-midnight-500 to-midnight-800 flex items-center">
        
            <div className="mt-10 md:flex gap-20 items-center mx-24 md:max-lg:mt-10 xl:mt-0">
              <div className="text-left md:w-10/12 w-full">
                <h1 className="text-4xl font-bold text-white mb-5 tracking-wide">UpTaskMent impulsa Equipos, Proyectos y Productividad</h1>
                <p className="text-lg font-semibold text-white tracking-widest">Optimiza tu gestión de equipos, asigna tareas en proyectos específicos y colabora de manera eficiente. Con UpTaskMent, tienes el control total de la capacidad de tu equipo. Descubre una forma más inteligente de alcanzar el éxito.</p>
                
                <Link
                className="px-5 py-2 inline-block mt-9 border border-white text-white font-semibold rounded-lg hover:bg-midnight-900 hover:text-white hover:font-bold w-full md:w-auto text-center"
                to='registrar'
                >
                Regístrate ¡gratis!
                </Link>
              </div>

              <div className="text-center md:w-1/2 w-96 mt-10 md:mt-0">
                <img src={taskInicio} className="w-96" />
              </div>
              
            </div>
            
        </section>
      </>

  )
}

export default Index