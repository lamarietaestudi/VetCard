import { Box, Snackbar, Alert, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMedicalHistories } from '../../hooks/useMedicalHistories';
import { useProfiles } from '../../hooks/useProfiles';
import { usePets } from '../../hooks/usePets';
import useSnackbar from '../../hooks/useSnackbar';
import MedicalHistoryCreateForm from '../../components/forms/medicalhistories/MedicarHistoryCreateForm';
import BackBtn from '../../components/buttons/BackBtn';

const MedicalHistoryCreate = () => {
  const token = localStorage.getItem('token');
  const { create } = useMedicalHistories(token);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { allPets, loadingPets } = usePets(token);
  const { allUsers, loadingVets } = useProfiles(token);
  const vets = allUsers.filter((user) =>
    Array.isArray(user.role) ? user.role.includes('vet') : user.role === 'vet'
  );

  const handleCreate = async (values) => {
    try {
      await create(values);
      showSnackbar('Historial guardado correctamente', 'success');
      navigate('/dashboard/medical-histories');
    } catch (error) {
      showSnackbar(error.message || 'Error al crear historial', 'error');
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
          <BackBtn onClick={() => navigate('/dashboard/medical-histories')} />

          <Typography
            variant='h6'
            sx={{
              flex: 1,
              textAlign: 'center'
            }}
          >
            Nuevo historial
          </Typography>
        </Box>
        <MedicalHistoryCreateForm
          onCreate={handleCreate}
          vets={vets}
          loadingVets={loadingVets}
          pets={allPets}
          loadingPets={loadingPets}
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

export default MedicalHistoryCreate;
