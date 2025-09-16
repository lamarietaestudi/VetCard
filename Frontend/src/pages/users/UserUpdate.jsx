import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import LoadingSpinner from '../../components/LoadingSpinner';
import UserUpdateForm from '../../components/forms/users/UserUpdateForm';
import { useProfiles } from '../../hooks/useProfiles';
import useSnackbar from '../../hooks/useSnackbar';
import BackBtn from '../../components/buttons/BackBtn';

const UserUpdate = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { fetchById, update, remove } = useProfiles(token);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const loadUser = async () => {
    try {
      const data = await fetchById(id);
      if (!data || data.length === 0) {
        showSnackbar('Usuario no encontrado', 'warning');
        navigate('/dashboard/users');
        return;
      }
      setUser(data[0]);
    } catch (error) {
      showSnackbar(error.message || 'Error al cargar usuario', 'error');
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [id]);

  const handleUpdate = async (values) => {
    try {
      await update(id, values);
      await loadUser();
      showSnackbar('Usuario actualizado con éxito', 'success');
    } catch (error) {
      showSnackbar(error.message || 'Error al actualizar usuario', 'error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que quieres eliminar este usuario?')) return;
    try {
      await remove(id);
      showSnackbar('Usuario eliminado con éxito', 'success');
      navigate('/dashboard/users');
    } catch (error) {
      showSnackbar(error.message || 'Error al eliminar usuario', 'error');
    }
  };

  if (loadingUser) {
    return <LoadingSpinner />;
  }

  if (!user) return <Box>No se encontró el usuario</Box>;

  return (
    <Box>
      <BackBtn onClick={() => navigate('/dashboard/users')} />
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

export default UserUpdate;
