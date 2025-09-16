import { useState } from 'react';
import {
  Box,
  Snackbar,
  Alert,
  Pagination,
  Select,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '../../hooks/useProfiles';
import {
  userSearchOptions,
  userRoles,
  specialtyOptions
} from '../../utils/constants';
import Searchbar from '../../components/Searchbar';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import useSnackbar from '../../hooks/useSnackbar';
import LoadingSpinner from '../../components/LoadingSpinner';
import UserCard from '../../components/cards/UserCard';

const UsersList = () => {
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const {
    users,
    loading,
    error,
    page,
    setPage,
    totalPages,
    fetchById,
    fetchByName,
    fetchByEmail,
    fetchByRole,
    fetchBySpecialty,
    resetSearch
  } = useProfiles(token);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const visibilitySearchOptions = () => {
    if (userRole === 'admin') return userSearchOptions;
    if (userRole === 'vet') {
      return userSearchOptions.filter(
        (opt) => opt.value === 'name' || opt.value === 'all'
      );
    }
    if (userRole === 'owner') {
      return userSearchOptions.filter(
        (opt) =>
          opt.value === 'name' ||
          opt.value === 'specialty' ||
          opt.value === 'all'
      );
    }
    return [];
  };

  const handleSearch = async (field, value) => {
    try {
      let result = [];
      if (field === 'all') {
        await resetSearch();
        return;
      } else if (field === 'name') {
        result = await fetchByName(value);
      } else if (field === 'email') {
        result = await fetchByEmail(value);
      } else if (field === 'role') {
        result = await fetchByRole(value);
      } else if (field === 'specialty') {
        result = await fetchBySpecialty(value);
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

  const usersToShow = users;
  const paginationToShow = totalPages > 1 && usersToShow.length > 0;
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: { xs: 'flex-start', sm: 'space-between' },
          mb: 3,
          position: { xs: 'relative', sm: 'static' }
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Searchbar
            options={visibilitySearchOptions()}
            onSearch={handleSearch}
            extraInput={({ field, value, setValue }) => {
              if (field === 'role') {
                return (
                  <Select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size='small'
                    displayEmpty
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value='' disabled>
                      Selecciona un rol
                    </MenuItem>
                    {userRoles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                );
              }
              if (field === 'specialty') {
                return (
                  <Select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size='small'
                    displayEmpty
                    sx={{ minWidth: 160 }}
                  >
                    <MenuItem value='' disabled>
                      Selecciona una especialidad
                    </MenuItem>
                    {specialtyOptions.map((spec) => (
                      <MenuItem key={spec} value={spec}>
                        {spec}
                      </MenuItem>
                    ))}
                  </Select>
                );
              }
              return null;
            }}
          />
        </Box>
        <Box>
          {userRole === 'admin' && (
            <PrimaryBtn
              sx={{
                minWidth: 140,
                position: { xs: 'absolute', sm: 'static' },
                top: { xs: 0, sm: 'auto' },
                right: { xs: 0, sm: 'auto' },
                zIndex: 2,
                ml: 1,
                px: '16px'
              }}
              onClick={() => navigate('/dashboard/users/new')}
            >
              Nuevo usuario
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
            {usersToShow.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  mb: 10,
                  color: 'text.primary'
                }}
              >
                No hay usuarios para mostrar.
              </Box>
            ) : (
              usersToShow.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onClick={() => navigate(`/dashboard/users/${user._id}`)}
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

export default UsersList;
