import { Box, Snackbar, Alert, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePets } from '../../hooks/usePets';
import { useProfiles } from '../../hooks/useProfiles';
import useSnackbar from '../../hooks/useSnackbar';
import PetCreateForm from '../../components/forms/pets/PetCreateForm';
import BackBtn from '../../components/buttons/BackBtn';

const PetCreate = () => {
  const token = localStorage.getItem('token');
  const { create } = usePets(token);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { allUsers, loading } = useProfiles(token, 'owners');

  const handleCreate = async (values) => {
    try {
      await create(values);
      showSnackbar('Mascota guardada correctamente', 'success');
      navigate('/dashboard/pets');
    } catch (error) {
      showSnackbar(error.message || 'Error al crear mascota', 'error');
    }
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='flex-start'
      minHeight='80vh'
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          width: '100%',
          borderRadius: 3
        }}
      >
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          mb={2}
        >
          <BackBtn onClick={() => navigate('/dashboard/pets')} />

          <Typography
            variant='h6'
            sx={{
              flex: 1,
              textAlign: 'center'
            }}
          >
            Nueva mascota
          </Typography>
        </Box>
        <PetCreateForm
          onCreate={handleCreate}
          owners={allUsers}
          loadingOwners={loading}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity={snackbar.severity}
            sx={{ width: '100%' }}
            onClose={closeSnackbar}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default PetCreate;
