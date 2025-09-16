import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import LoadingSpinner from '../../components/LoadingSpinner';
import PetUpdateForm from '../../components/forms/pets/PetUpdateForm';
import { usePets } from '../../hooks/usePets';
import { useProfiles } from '../../hooks/useProfiles';
import useSnackbar from '../../hooks/useSnackbar';
import BackBtn from '../../components/buttons/BackBtn';

const PetUpdate = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { fetchById, update, remove } = usePets(token);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const { allUsers, loading: loadingOwners } = useProfiles(token, 'owners');
  const [pet, setPet] = useState(null);
  const [loadingPet, setLoadingPet] = useState(true);

  const loadPet = async () => {
    try {
      const data = await fetchById(id);
      if (!data || data.length === 0) {
        showSnackbar('Mascota no encontrada', 'warning');
        navigate('/dashboard/pets');
        return;
      }
      setPet(data[0]);
    } catch (error) {
      showSnackbar(error.message || 'Error al cargar mascota', 'error');
    } finally {
      setLoadingPet(false);
    }
  };

  useEffect(() => {
    loadPet();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await update(id, formData);
      await loadPet();
      showSnackbar('Mascota actualizada con éxito', 'success');
    } catch (error) {
      showSnackbar(error.message || 'Error al actualizar usuario', 'error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que quieres eliminar esta mascota?')) return;
    try {
      await remove(id);
      showSnackbar('Mascota eliminada con éxito', 'success');
      navigate('/dashboard/pets');
    } catch (error) {
      showSnackbar(error.message || 'Error al eliminar mascota', 'error');
    }
  };

  if (loadingPet || loadingOwners) {
    return <LoadingSpinner />;
  }

  if (!pet) return <Box>No se encontró la mascota</Box>;

  return (
    <Box>
      <BackBtn onClick={() => navigate('/dashboard/pets')} />
      <PetUpdateForm
        pet={pet}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        owners={allUsers}
        loadingOwners={loadingOwners}
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

export default PetUpdate;
