import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, Snackbar, Alert, Pagination } from '@mui/material';
import LoadingSpinner from '../../components/LoadingSpinner';
import MedicalHistoryCard from '../../components/cards/MedicalHistoryCard';
import { useMedicalHistories } from '../../hooks/useMedicalHistories';
import { medicalHistorySearchOptions } from '../../utils/constants';
import useSnackbar from '../../hooks/useSnackbar';
import Searchbar from '../../components/Searchbar';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import AddIcon from '@mui/icons-material/Add';

const MedicalHistoriesList = () => {
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const {
    histories,
    loading,
    error,
    page,
    setPage,
    totalPages,
    fetchHistories,
    fetchById,
    fetchByPetName,
    fetchByChipNumber,
    fetchByOwnerName,
    resetSearch
  } = useMedicalHistories(token);

  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    fetchHistories();
  }, [fetchHistories]);

  const historiesToShow = histories;
  const paginationToShow = totalPages > 1 && historiesToShow.length > 0;

  const handleSearch = async (field, value) => {
    try {
      let result = [];
      if (field === 'all') {
        result = await resetSearch();
        return;
      } else if (field === 'petName') {
        result = await fetchByPetName(value);
      } else if (field === 'chipNumber') {
        result = await fetchByChipNumber(value);
      } else if (field === 'ownerName') {
        result = await fetchByOwnerName(value);
      } else if (field === 'id') {
        result = await fetchById(value);
      }

      if (!result || result.length === 0) {
        showSnackbar('No hay coincidencias', 'warning');
      }
    } catch (error) {
      showSnackbar(error.message || 'Error en la búsqueda', 'error');
    }
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: { xs: 'flex-start', sm: 'space-between' },
          position: { xs: 'relative', sm: 'static' }
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Searchbar
            options={medicalHistorySearchOptions}
            onSearch={handleSearch}
          />
        </Box>
        <Box>
          {(userRole === 'admin' || userRole === 'vet') && (
            <PrimaryBtn
              variant='light'
              icon={<AddIcon />}
              onClick={() => navigate('/dashboard/medical-histories/new')}
              sx={{
                position: { xs: 'absolute', sm: 'static' },
                top: { xs: 0, sm: 'auto' },
                right: { xs: 0, sm: 'auto' },
                zIndex: 2,
                ml: 1
              }}
            >
              Nuevo historial
            </PrimaryBtn>
          )}
        </Box>
      </Box>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'stretch',
              width: '100%'
            }}
          >
            {historiesToShow.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  mb: 10,
                  color: 'text.primary'
                }}
              >
                No hay historiales médicos para mostrar.
              </Box>
            ) : (
              historiesToShow.map((history) => (
                <MedicalHistoryCard
                  key={history._id}
                  history={history}
                  onClick={() =>
                    navigate(`/dashboard/medical-histories/${history._id}`)
                  }
                />
              ))
            )}
          </Box>

          {paginationToShow && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color='primary'
              />
            </Box>
          )}
        </>
      )}
      <Snackbar
        open={snackbar.open || !!error}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={error ? 'error' : snackbar.severity}
          sx={{ width: '100%' }}
        >
          {error || snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MedicalHistoriesList;
