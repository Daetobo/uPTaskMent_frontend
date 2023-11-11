import { useState } from 'react';
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

const ModalFormEquipo = () => {

    const [nombre, setNombre] = useState('');

    const { modalFormEquipo, handleModalEquipo,mostrarAlerta, alerta, submitEquipo } = useEquipos();

    const handleSubmit = async e => {
        e.preventDefault();

        if (nombre === '') {
            mostrarAlerta({
                msg:'El nombre es obligatorio',
                error: true
            })
            setTimeout(() => {
              mostrarAlerta({})
            }, 3000);
            return
        }

        await submitEquipo({nombre});
        setNombre('')

        setTimeout(() => {
          handleModalEquipo()
        }, 1000);
        

    }

    const handleCloseModal = () => {
      handleModalEquipo();
      setNombre('')
    }

    const { msg } = alerta;

  return (
    <div>
        { msg && <Alerta alerta={alerta} /> }
      <Modal
        open={modalFormEquipo}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2"> {/* Cambiado component="h2" a component="div" */}
            Crear equipo
          </Typography>
          <Typography id="modal-modal-description" component="div"sx={{ mt: 0 }}>
            
            <form 
                onSubmit={handleSubmit}
                className='mt-2'
            >
                
              <div className="">
                <input 
                  type="text"
                  placeholder="Nombre del equipo"
                  className="w-full mt-2 p-3 border rounded bg-gray-50"
                  id="equipo"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>
              <input 
                    type="submit"
                    value="Crear equipo"
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
