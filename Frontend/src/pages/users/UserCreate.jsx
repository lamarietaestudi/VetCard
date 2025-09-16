import { Box, Snackbar, Alert, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '../../hooks/useProfiles';
import useSnackbar from '../../hooks/useSnackbar';
import UserCreateForm from '../../components/forms/users/UserCreateForm';
import BackBtn from '../../components/buttons/BackBtn';

const UserCreate = () => {
  const token = localStorage.getItem('token');
  const { create } = useProfiles(token);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleCreate = async (values) => {
    try {
      await create(values);
      showSnackbar('Usuario creado correctamente', 'success');
      navigate('/dashboard/users');
    } catch (error) {
      showSnackbar(error.message || 'Error al crear usuario', 'error');
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
          <BackBtn onClick={() => navigate('/dashboard/users')} />

          <Typography
            variant='h6'
            sx={{
              flex: 1,
              textAlign: 'center'
            }}
          >
            Nuevo usuario
          </Typography>
        </Box>
        <UserCreateForm onCreate={handleCreate} />

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

export default UserCreate;
