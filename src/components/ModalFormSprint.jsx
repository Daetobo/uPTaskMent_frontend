import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useEquipos from '../hooks/useEquipos';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alerta from './Alerta';
import { formatDate } from '../../utils/format';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const ModalFormEquipo = () => {

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');

    const { modalFormSprint, handleModalFormSprint,mostrarAlerta, alerta, submitSprint, sprint } = useEquipos();

    const params = useParams()
    const fechaI = formatDate(sprint?.fechaInicio)
    const fechaF = formatDate(sprint?.fechaFinal)

    useEffect(() => {
      if (sprint?._id) {
        setId(sprint._id)
        setNombre(sprint.nombre);
        setFechaInicio(fechaI);
        setFechaFinal(fechaF);
        return;
      }
      setId('');
      setNombre('');
      setFechaInicio('');
      setFechaFinal('');

    }, [sprint]);

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre,fechaInicio,fechaFinal].includes('')) {
            mostrarAlerta({
                msg:'Todos los campos son obligatorios',
                error: true
            })
            setTimeout(() => {
              mostrarAlerta({})
            }, 3000);
            return
        }
        if (id) {
          await submitSprint({id,nombre,fechaInicio,fechaFinal,equipo:params.id});
        }else{
          await submitSprint({nombre,fechaInicio,fechaFinal,equipo:params.id});
        }
        

        setId('');
        setNombre('');
        setFechaInicio('');
        setFechaFinal('');

        setTimeout(() => {
          handleModalFormSprint()
        }, 1000);
        

    }

    const handleCloseModal = () => {
      handleModalFormSprint();
      setNombre('');
      setFechaInicio('');
      setFechaFinal('');
    }

    const { msg } = alerta;

  return (
    <div>
        { msg && <Alerta alerta={alerta} /> }
      <Modal
        open={modalFormSprint}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2"> {/* Cambiado component="h2" a component="div" */}
            {id ? 'Editar Sprint':'Crear Sprint'}
          </Typography>
          <Typography id="modal-modal-description" component="div"sx={{ mt: 0 }}>
            
            <form 
                onSubmit={handleSubmit}
                className='mt-2'
            >
                <div className="mt-3">

                    <label 
                        className='text-xs font-semibold text-silver-800'
                        htmlFor='sprint'
                    >
                        Nombre Sprint
                    </label>
                    <input 
                        type="text"
                        placeholder="Nombre del Sprint"
                        className="w-full mt-2 p-3 border rounded bg-gray-50 text-silver-800 focus:border-midnight-400 focus:outline-none focus:border-2"
                        id="sprint"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
              <div className="mt-3">
                    <label 
                            className='text-xs font-semibold text-silver-800'
                            htmlFor='fecha-inicio'
                        >
                            Fecha de Inicio
                    </label>
                    <input 
                        type="date"
                        className="w-full mt-2 p-3 border rounded bg-gray-50 text-silver-800 focus:border-midnight-400 focus:outline-none focus:border-2"
                        id="fecha-inicio"
                        value={fechaInicio}
                        onChange={e => setFechaInicio(e.target.value)}
                    />
              </div>
              <div className="mt-3">
                    <label 
                        className='text-xs font-semibold text-silver-800 '
                        htmlFor='fecha-final'
                    >
                        Fecha de Finalización
                    </label>
                    <input 
                        type="date"
                        className="w-full mt-2 p-3 border rounded text-silver-800 bg-gray-50 focus:border-midnight-400 focus:outline-none focus:border-2"
                        id="fecha-final"
                        value={fechaFinal}
                        onChange={e => setFechaFinal(e.target.value)}
                    />
              </div>
              <input 
                    type="submit"
                    value={id ? 'Editar Sprint' : 'Crear Sprint'}
                    className="bg-midnight-600 w-full py-3 mb-5 text-white font-bold rounded hover:cursor-pointer hover:bg-midnight-800 transition-colors my-5"
                />
                
            </form>
            
          </Typography>
        </Box>
      </Modal>
      
    </div>
  )
}

export default ModalFormEquipo;