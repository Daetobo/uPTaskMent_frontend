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
    const [modalFormProyecto,setModalFormProyecto] = useState(false);
    const [modalFormSprint,setModalFormSprint] = useState(false);
    const [sprint, setSprint] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [idSprintPopover, setIdSprintPopover] = useState('');
    const [openModalEliminarTarea, setOpenModalEliminarTarea] = useState(false);
    const [tarea,setTarea] = useState({});
    const [openDrawer, setOpenDrawer] = useState(false);

    const navigate = useNavigate();

    // ----------------------- SECTION EQUIPOS --------------------
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

    // ------------------------- SECTION EQUIPO --------------------

    const handleModalEquipo = () => {
        setEquipo({})
        setModalFormEquipo(!modalFormEquipo);
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

    //   ------------- SECTION PROYECTOS ----------------------

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

    // ------------------------ SECTION SPRINT -----------------------

    const handleModalFormSprint = () =>{
        setModalFormSprint(!modalFormSprint);
        setSprint({});
        setTimeout(() => {
            setAlerta({});
        }, 2000);
        
    }
    
    const submitSprint = async (sprint) => {       
        if (sprint?.id) {
            await editarSprint(sprint)
        }else{
            await crearSprint(sprint)
        }
    }

    const crearSprint = async (sprint) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
           const {data}  = await clienteAxios.post('/sprints',sprint,config)
           const equipoActualizado = {...equipo}
           equipoActualizado.sprints = [...equipoActualizado.sprints,data]
           setEquipo(equipoActualizado)
           setAlerta({
                msg: 'Esprint creado correctamente',
                error:false
           })

        } catch (error) {
            setAlerta({
                mensaje:error.response.data.msg,
                error:true
            })
        }
    }

    const editarSprint = async (sprint) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await clienteAxios.put(`/sprints/${sprint.id}`,sprint,config)
            const equipoActualizado = { ...equipo };
            equipoActualizado.sprints = equipoActualizado.sprints.map(stateSprint => (
                    stateSprint._id === sprint.id ? data : stateSprint
            ))
            setEquipo(equipoActualizado);
            setAlerta({
                    msg: 'Esprint Editado correctamente',
                    error:false
            })
        } catch (error) {
            setAlerta({
                mensaje:error.response.data.msg,
                error:true
            })
        }
    }

    const handleModalEditarSprint = (sprint) => {
        setSprint(sprint);
        setModalFormSprint(!modalFormSprint)
    }

    const eliminarSprint = async (id) =>{
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await clienteAxios.delete(`/sprints/${id}`,config)
            const equipoActualizado = {...equipo};
            equipoActualizado.sprints = equipoActualizado.sprints.filter((item)=>(item._id !== id));
            setEquipo(equipoActualizado)
            setAlerta({
                msg:'Sprint Eliminado Correctamente',
                error:false
            })
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })
        }

    }

    // ------------------------ SECTION TAREAS -----------------------

    const crearTarea = async (tarea) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            const {data}  = await clienteAxios.post('/tareas',tarea,config)
            const equipoActualizado = {...equipo}
            const sprintIndex = equipoActualizado.sprints.findIndex(sprint => tarea.sprint === sprint._id)
            if (sprintIndex !== -1) {
                equipoActualizado.sprints[sprintIndex].tareas = [...equipoActualizado.sprints[sprintIndex].tareas,data]
                console.log(equipoActualizado.sprints[sprintIndex].tareas)
            }
            setEquipo(equipoActualizado)
        } catch (error) {
            console.log(error)
        }
    
    }

    const handleClickPopover = (event,id) => {
        setAnchorEl(event.currentTarget);
        setIdSprintPopover(id)
    };
    
    const handleClosePopover = () => {
    setAnchorEl(null);
    };

    const handleModalEliminarTarea = (tarea) => {
        setOpenModalEliminarTarea(!openModalEliminarTarea);
        setTarea(tarea)
    };

    const eliminarTarea = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token} `
            }
        }

        try {

            const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`,config)
            setAlerta({
                msg:data.msg,
                error:false
            })

            const equipoActualizado = {...equipo}
            const sprintIndex = equipoActualizado.sprints.findIndex(sprint => tarea.sprint === sprint._id);
            equipoActualizado.sprints[sprintIndex].tareas = equipoActualizado.sprints[sprintIndex].tareas.filter(task => task._id !== tarea._id);
            setEquipo(equipoActualizado);

            handleModalEliminarTarea();
            setTarea({});
            
            setTimeout(() => {
                setAlerta({});
            }, 2000);
        } catch (error) {
            console.log(error)
        }
       
    }

    const handleDrawerOpen = () => {
        setOpenDrawer(!openDrawer);
    };
    

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
                handleModalFormProyecto,
                handleModalFormSprint,
                modalFormSprint,
                submitSprint,
                sprint,
                handleModalEditarSprint,
                eliminarSprint,
                crearTarea,
                handleClickPopover,
                handleClosePopover,
                anchorEl,
                idSprintPopover,
                handleModalEliminarTarea,
                openModalEliminarTarea,
                eliminarTarea,
                tarea,
                openDrawer,
                handleDrawerOpen,
                setOpenDrawer
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