import useEquipos from '../hooks/useEquipos';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    position: 'relative',
    marginTop: '64px', // Ajusta esta altura según la altura de tu Header
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  borderBottom: '1px solid #yourColor', // Ajusta el ancho y el color según tus necesidades
  margin: '0px 0px 0px', // Ajusta la posición vertical
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const DrawerEditarTarea = () => {
  const theme = useTheme();
  const { openDrawer, handleDrawerOpen } = useEquipos();

  return (
    <StyledDrawer
      variant="persistent"
      anchor="right"
      open={openDrawer}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerOpen}>
          {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <Typography variant="h6" align="center" sx={{ mt: 2, mb: 2, ml:2, fontWeight:'bold'}}>
          Editar Tarea
        </Typography>
      </DrawerHeader>
      <Box>
        <StyledDivider />
        <form >
          <TextField
            label="Nombre de la tarea"
            variant="outlined"
            fullWidth
            margin="normal"

          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Guardar Cambios
          </Button>
        </form>
      </Box>
      {/* Contenido del Drawer */}
    </StyledDrawer>
  );
};

export default DrawerEditarTarea;
