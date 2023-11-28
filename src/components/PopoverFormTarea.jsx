import { useState } from 'react';
import useEquipos from '../hooks/useEquipos';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const PopoverFormTarea = ({sprint}) => {
    
    const [nombre,setNombre] = useState('');
    const [nota,setNota] = useState('');
    const [prioridad,setPrioridad] = useState('--- Seleccionar ---');
    const [tiempo,setTiempo] = useState('');
    const [fechaInicio,setFechaInicio] = useState('');
    const [fechaFinal,setFechaFinal] = useState('');

    const { anchorEl, handleClosePopover, crearTarea, idSprintPopover } = useEquipos();
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const ESTADOS = [
        '--- Seleccionar ---',
        'Baja',
        'Media',
        'Alta'
    ]

    const handleSubmit = async e => {
        e.preventDefault()

        if ([nombre,tiempo].includes('')) {
            return
        }
        
        await crearTarea({nombre,nota,prioridad, tiempo, fechaInicio,fechaFinal,sprint:idSprintPopover})

        setNombre('');
        setNota('');
        setPrioridad('--- Seleccionar ---');
        setTiempo('');
        setFechaInicio('');
        setFechaFinal('');
    }

    const handleFechaInicioChange = (date) =>{
        setFechaInicio(date)
    }

    const handleFechaFinalChange = (date) =>{
        setFechaFinal(date)
    }

    const onClosePopover = () => {
        handleClosePopover()
        setNombre('');
        setNota('');
        setPrioridad('--- Seleccionar ---');
        setTiempo('');
        setFechaInicio('');
        setFechaFinal('');
    }

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClosePopover}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        PaperProps={{
        style: {
        //   width: '1088px', // Establece el ancho según tus necesidades
          padding: '16px', // Agrega espacio de relleno según tus necesidades
        },
      }}
      >
        <form 
            onSubmit={handleSubmit}
        >
            <div className='mb-3'>
                <TextField
                    label="Nombre Tarea" 
                    variant='outlined'
                    fullWidth
                    required
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className='flex gap-2'>
                <div className='w-1/2'>
                    <TextField
                        label="Notas de la Tarea"
                        variant="outlined"
                        multiline
                        fullWidth
                        rows={4}
                        value={nota}
                        onChange={e => setNota(e.target.value)}
                    />
                </div>
                <div>
                    <div className='mb-1'>
                        <TextField
                            select
                            label="Prioridad"
                            defaultValue={ESTADOS[0]}
                            fullWidth
                            value={prioridad}
                            onChange={e => setPrioridad(e.target.value)}
                        >   
                            {ESTADOS.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className=''>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker 
                                    label="Fecha Inicio" 
                                    value={fechaInicio}
                                    onChange={handleFechaInicioChange}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>

                <div>
                    <div className='mb-1'>
                        <TextField
                            label="Tiempo en Minutos"
                            variant="outlined"
                            fullWidth
                            type='number'
                            required
                            value={tiempo}
                            onChange={e => setTiempo(e.target.value)}
                        />
                    </div>
                    <div className=''>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker 
                                    label="Fecha Final" 
                                    value={fechaFinal}
                                    onChange={handleFechaFinalChange}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>

            </div>
            <input
                type="submit" 
                value="Crear Tarea" 
                className='bg-midnight-500 text-white px-4 py-2 rounded font-semibold mt-3 hover:cursor-pointer hover:bg-midnight-600'
            />
        </form>
      </Popover>
    </div>
  )
}

export default PopoverFormTarea