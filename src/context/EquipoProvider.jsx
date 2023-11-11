import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const ProyectosContext = createContext();

const EquipoProvider = ({children}) =>{

    const [equipos, setEquipos] = useState([]);
    const [equipo, setEquipo] = useState({});
    const [alerta, setAlerta] = useState({});
    const [modalFormEquipo, setModalFormEquipo] = useState(false);
    const [totalEquipos, setTotalEquipos] = useState(0);
    const [cargando, setCargando] = useState(false);
    const [modalFormMiembroEquipo, setModalFormMiembroEquipo] = useState(false);
    const [resultadoMiembroEquipo, setResultadoMiembroEquipo] = useState([])
    const [emailMiembroEquipo, setEmailMiembroEquipo] = useState('');
    const [idEquipo,setIdEquipo] = useState(false);
    const [totalMiembrosEquipo, setTotalMiembrosEquipo] = useState(0);
    const [modalFormProyecto,setModalFormProyecto] = useState(false)
    console.log(equipo)
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerEquipos = async () =>{
            try {
                const token = localStorage.getItem('token');
                if(!token) return;
                const config = {
                    headers:{
                        'Content-Type':'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const { data } = await clienteAxios('/equipos',config);
                setEquipos(data);

            } catch (error) {
                console.log(error);
            }
        }
        
        return () => obtenerEquipos();

    }, []);

    useEffect(() => {
        setTotalEquipos(equipos.length)
    }, [equipos]);

    const mostrarAlerta = alerta => {
        setAlerta(alerta)
    }

    const handleModalEquipo = () => {
        setModalFormEquipo(!modalFormEquipo);
        setEquipo({})
        
    }

    const submitEquipo = async (equipo) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return;
            const config = {
                headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/equipos',equipo,config)
            const nuevoEquipo = [...equipos,data];
            setEquipos(nuevoEquipo)

            setAlerta({
                msg: 'Equipo creado con éxito',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    const obtenerEquipo = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
                }
            }

            const url = `/equipos/${id}`
            const { data } = await clienteAxios(url,config)
            setEquipo(data)
            setIdEquipo(true)

        } catch (error) {
            console.log(error)
        } finally{
            setCargando(false)
        }
    }

    const handleModalMiembroEquipo = () => {
        setModalFormMiembroEquipo(!modalFormMiembroEquipo)
        setEmailMiembroEquipo('');
    }

    const submitMiembroEquipo = async email => {

        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        
        try {
            const url = `/equipos/agregar-miembro/${equipo._id}`
            const { data } = await clienteAxios.post(url,email,config)

            setAlerta({
                msg:data.msg,
                error:false
            })
            
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }
    }

    const handleInputChange = async e => {
        const token = localStorage.getItem('token');
        if (!token) return;
  
        const texto = e.target.value;
  
        const config = {
          headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
  
        try {
          const url = '/equipos/miembros';
          if (texto.trim() !== '') { // Verificar si el texto no está vacío ni solo espacios en blanco
            const { data } = await clienteAxios.post(url,{texto},config)
            setResultadoMiembroEquipo(data);
          }else {
            setResultadoMiembroEquipo([]);// Limpiar los resultados si el input está vacío
          }
          setEmailMiembroEquipo(texto);
        } catch (error) {
          console.log(error)
        }
      }

      const editarEquipo = async (equipo) => {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const url = `/equipos/${equipo.id}`;
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await clienteAxios.put(url,equipo,config);
            const equiposActualizados = equipos.map(equipoState => (
            equipoState._id === data._id ? data : equipoState
        ))
        setEquipos(equiposActualizados)
        } catch (error) {
            console.log(error)
        }
        
      }

      const eliminarEquipo = async id =>{
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const url = `/equipos/${id}`;
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.delete(url,config);
            const equipoActualizado = equipos.filter(equipoState => equipoState._id !== id)
            setEquipos(equipoActualizado)

            navigate('/equipos')

            setAlerta({
                msg:data.msg,
                error:false
            })
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })
        }
        
      }

      const obtenerMiembro = (id) => {
        console.log(id)
      }

    //   ------------- Proyectos ----------------------

      const submitProyecto = async (proyecto) =>{
        const token = localStorage.getItem("token");
        const config = {
          headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        
        try {
            const {data} = await clienteAxios.post('/proyectos',proyecto,config)
            const nuevoProyecto = {_id: data._id,nombre: data.nombre}
            const equipoActualizado = {...equipo}
            equipoActualizado.proyectos = [...equipoActualizado.proyectos,nuevoProyecto]
            setEquipo(equipoActualizado)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalFormProyecto = () =>{
        setModalFormProyecto(!modalFormProyecto)
    }

    return (
        <ProyectosContext.Provider
            value={{
                equipos,
                mostrarAlerta,
                alerta,
                handleModalEquipo,
                modalFormEquipo,
                submitEquipo,
                totalEquipos,
                obtenerEquipo,
                equipo,
                cargando,
                modalFormMiembroEquipo,
                handleModalMiembroEquipo,
                submitMiembroEquipo,
                handleInputChange,
                resultadoMiembroEquipo,
                setResultadoMiembroEquipo,
                setEmailMiembroEquipo,
                emailMiembroEquipo,
                idEquipo,
                totalMiembrosEquipo,
                setTotalMiembrosEquipo,
                editarEquipo,
                obtenerMiembro,
                eliminarEquipo,
                submitProyecto,
                modalFormProyecto,
                handleModalFormProyecto
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    EquipoProvider
};

export default ProyectosContext;