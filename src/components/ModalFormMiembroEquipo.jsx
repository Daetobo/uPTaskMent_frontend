import { useNavigate, useParams } from 'react-router-dom';
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
  maxHeight: '30vh',
  bgcolor: 'background.paper',
  border: '2px',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const ModalFormEquipo = () => {

    const navigate = useNavigate();
    const params = useParams();

    const { modalFormMiembroEquipo, handleModalMiembroEquipo,mostrarAlerta, alerta,submitMiembroEquipo, handleInputChange,resultadoMiembroEquipo,setResultadoMiembroEquipo,emailMiembroEquipo,setEmailMiembroEquipo} = useEquipos();

    const { id } = params;

    const handleSubmit = async e => {
        e.preventDefault();

        if (emailMiembroEquipo === '') {
            mostrarAlerta({
                msg:'El email es obligatorio',
                error: true
            })
            return
        }

        await submitMiembroEquipo({emailMiembroEquipo});
        setEmailMiembroEquipo('')
        setTimeout(() => {
          handleModalMiembroEquipo()
          window.location = `/equipos/${id}`
        }, 2000);
    }

    

    const handleSelectUser = usuario => {
      // Manejar la selección del usuario y agregarlo al equipo
      setEmailMiembroEquipo(usuario.email); // Agregar el email del usuario al campo de entrada
      setResultadoMiembroEquipo([]); // Limpiar los resultados
    }

    const { msg } = alerta;

  return (
    <div>
        { msg && <Alerta alerta={alerta} /> }
      <Modal
        open={modalFormMiembroEquipo}
        onClose={handleModalMiembroEquipo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=''
      >
      
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2"> {/* Cambiado component="h2" a component="div" */}
            Agregar Miembro
          </Typography>
          <Typography id="modal-modal-description" component="div"sx={{ mt: 0 }}>
            
            <form 
                onSubmit={handleSubmit}
                className='mt-2'
            >
              
              <div className="md:flex justify-between items-center gap-2">
                <input 
                    type="email"
                    placeholder="Nombre del equipo"
                    className="px-2 py-2 border-2 border-silver-200 rounded bg-gray-50 w-full md:flex-1 placeholder-silver-800"
                    id="equipo"
                    value={emailMiembroEquipo}
                    onChange={handleInputChange}
                    autoComplete='off'
                />
                <input 
                    type="submit"
                    value="Agregar"
                    className=" w-full md:w-1/4 text-center bg-midnight-600 py-2 px-2 text-white font-semibold rounded hover:cursor-pointer hover:bg-midnight-800 transition-colors my-5"
                />
              </div>
                
            </form>
            
            <div className='w-80 border rounded-md shadow-xl max-h-40 overflow-y-auto bg-white'>
              <ul className=''>
                {resultadoMiembroEquipo.map(usuario => (
                  <li 
                    key={usuario._id} 
                    onClick={() => handleSelectUser(usuario)}
                    className='hover:cursor-pointer px-3 py-3 rounded-md m-2 hover:bg-silver-400'  
                  >
                    <span className='text-silver-900 text-sm block'>{usuario.nombre}</span>
                    <span className='text-silver-900 text-xs block'>{usuario.email}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalFormEquipo;
