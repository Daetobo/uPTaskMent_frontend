import * as React from 'react';
import useEquipos from '../hooks/useEquipos';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  
  const {handleModalEliminarTarea, eliminarTarea,openModalEliminarTarea} = useEquipos();

  const handleClickCancelar = (event) => {
    event.stopPropagation();
    handleModalEliminarTarea();
  }

  const handleClickEliminar = (event) => {
    event.stopPropagation();
    eliminarTarea();
  }

  return (
    <React.Fragment>
      <Dialog
        open={openModalEliminarTarea}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleModalEliminarTarea}
        aria-describedby="alert-dialog-slide-description"
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)', // Fondo completamente transparente
          },
        }}
        PaperProps={{
          style: {
            boxShadow: 'none', // Eliminar la sombra difuminada
          },
        }}
      >
        <DialogTitle>{"Eliminar Tarea"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Una tarea eliminada no se podrá recuperar
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClickCancelar}
            style={{
              backgroundColor: 'rgb(55, 65, 81, 1)',
              color:'rgb(255, 255, 255)',
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleClickEliminar}
            style={{
              backgroundColor: 'rgba(239, 68, 68, 1)',
              color:'rgb(255, 255, 255)',
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}