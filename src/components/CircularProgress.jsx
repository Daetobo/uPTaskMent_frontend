import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',  // Centra horizontalmente
        alignItems: 'center',      // Centra verticalmente
        minHeight: '100vh',       // Altura de la ventana completa
      }}
    >
      <CircularProgress />
    </Box>
  );
}