import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Alerta = ({ alerta }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (alerta.msg) {
        setOpen(true)
    }
  }, [alerta]);

  const handleClose = () => {
    setOpen(false);
    
  };

  return (
    <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Centra la alerta
        >
      <Alert
        onClose={handleClose}
        // variant="filled"
        severity={alerta.error ? 'error' : 'success'}
      >
        {alerta.msg}
      </Alert>
    </Snackbar>
  );
}

export default Alerta;
