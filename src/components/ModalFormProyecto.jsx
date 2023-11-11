import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useEquipos from '../hooks/useEquipos';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alerta from './Alerta';

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

const ModalFormProyecto = () => {

    const [nombre, setNombre] = useState('');
    const { modalFormProyecto, handleModalFormProyecto,mostrarAlerta, alerta, submitProyecto } = useEquipos();

    const params = useParams();

    const handleSubmit = async e => {
        e.preventDefault();

        if (nombre === '') {
            mostrarAlerta({
                msg:'La actividad es obligatoria',
                error: true
            })
            setTimeout(() => {
              mostrarAlerta({})
            }, 3000);
            return
        }

        await submitProyecto({nombre,equipo: params.id});
        setNombre('')

        setTimeout(() => {
          handleModalFormProyecto()
        }, 1000);
        

    }

    const handleCloseModal = () => {
        handleModalFormProyecto();
      setNombre('')
    }

    const { msg } = alerta;

  return (
    <div>
        { msg && <Alerta alerta={alerta} /> }
      <Modal
        open={modalFormProyecto}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2"> {/* Cambiado component="h2" a component="div" */}
            Crear Actividad
          </Typography>
          <Typography id="modal-modal-description" component="div"sx={{ mt: 0 }}>
            
            <form 
                onSubmit={handleSubmit}
                className='mt-2'
            >
                
              <div className="">
                <input 
                  type="text"
                  placeholder="Introduzca el título de la Actividad..."
                  className="w-full mt-2 p-3 border rounded bg-gray-50"
                  id="equipo"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>
              <input 
                    type="submit"
                    value="Añadir Actividad"
                    className="bg-midnight-600 w-full py-3 mb-5 text-white font-bold rounded hover:cursor-pointer hover:bg-midnight-800 transition-colors my-5"
                />
                
            </form>
            
          </Typography>
        </Box>
      </Modal>
      
    </div>
  )
}

export default ModalFormProyecto;
