import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '../hooks/useProfiles';
import useSnackbar from '../hooks/useSnackbar';
import { Box, Snackbar, Alert, Typography } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';
import UserUpdateForm from '../components/forms/users/UserUpdateForm';

const Profile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const { fetchById, update, remove } = useProfiles(token);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const loadUser = async () => {
    try {
      const data = await fetchById(userId);
      if (!data || data.length === 0) {
        showSnackbar('Cuenta no encontrada', 'warning');
        navigate('/login');
        return;
      }
      setUser(data[0]);
    } catch (error) {
      showSnackbar(error.message || 'Error al cargar la cuenta', 'error');
      navigate('/login');
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [userId]);

  const handleUpdate = async (values) => {
    try {
      await update(userId, values);
      await loadUser();
      showSnackbar('Cuenta actualizada con éxito', 'success');
    } catch (error) {
      showSnackbar(error.message || 'Error al actualizar la cuenta', 'error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que quieres eliminar tu cuenta?')) return;
    try {
      await remove(userId);
      localStorage.clear();
      showSnackbar('Cuenta eliminada con éxito', 'success');
      navigate('/');
    } catch (error) {
      showSnackbar(error.message || 'Error al eliminar la cuenta', 'error');
    }
  };

  if (loadingUser) {
    return <LoadingSpinner />;
  }

  if (!user) return <Box>No se encontró la cuenta</Box>;

  return (
    <Box>
      <Typography variant='h5' align='center' mb={2}>
        Mi cuenta
      </Typography>
      <UserUpdateForm
        user={user}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
