import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import LoadingSpinner from '../../components/LoadingSpinner';
import MedicalHistoryUpdateForm from '../../components/forms/medicalhistories/MedicalHistoryUpdateForm';
import { useMedicalHistories } from '../../hooks/useMedicalHistories';
import { usePets } from '../../hooks/usePets';
import { useProfiles } from '../../hooks/useProfiles';
import useSnackbar from '../../hooks/useSnackbar';
import BackBtn from '../../components/buttons/BackBtn';

const MedicalHistoryUpdate = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const { fetchById, update, remove } = useMedicalHistories(token);
  const { allPets, loading: loadingPets } = usePets(token);
  const { allUsers, loading: loadingVets } = useProfiles(token);

  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const [medicalHistory, setMedicalHistory] = useState(null);
  const [loadingMedicalHistory, setLoadingMedicalHistory] = useState(true);

  const loadHistory = async () => {
    try {
      const data = await fetchById(id);
      if (!data || data.length === 0) {
        showSnackbar('Historial no encontrado', 'warning');
        navigate('/dashboard/medical-histories');
        return;
      }
      setMedicalHistory(data[0]);
    } catch (error) {
      showSnackbar(error.message || 'Error al cargar historial', 'error');
    } finally {
      setLoadingMedicalHistory(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [id]);

  const handleUpdate = async (values) => {
    try {
      await update(id, values);
      await loadHistory();
      showSnackbar('Historial actualizado con éxito', 'success');
    } catch (error) {
      showSnackbar(error.message || 'Error al actualizar historial', 'error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que quieres eliminar este historial?')) return;
    try {
      await remove(id);
      showSnackbar('Historial eliminado con éxito', 'success');
      navigate('/dashboard/medical-histories');
    } catch (error) {
      showSnackbar(error.message || 'Error al eliminar historial', 'error');
    }
  };

  if (loadingMedicalHistory || loadingPets || loadingVets) {
    return <LoadingSpinner />;
  }

  if (!medicalHistory) return <Box>No se encontró el historial</Box>;

  return (
    <Box>
      <BackBtn onClick={() => navigate('/dashboard/medical-histories')} />
      <MedicalHistoryUpdateForm
        history={medicalHistory}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        pets={allPets}
        loadingPets={loadingPets}
        vets={allUsers}
        loadingVets={loadingVets}
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

export default MedicalHistoryUpdate;
