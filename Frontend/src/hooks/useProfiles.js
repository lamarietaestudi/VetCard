import { useState, useEffect, useCallback } from 'react';
import {
  getAllProfiles,
  getOnlyVetUsers,
  getOnlyOwnerUsers,
  getProfileById,
  getProfileByName,
  getProfileByEmail,
  getVetBySpecialty,
  postProfile,
  updateProfile,
  deleteProfile
} from '../api/api';

const pageSize = 15;

export const useProfiles = (token) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const role = localStorage.getItem('role');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let data = [];
      if (role === 'admin') {
        data = await getAllProfiles(token);
      } else if (role === 'vet') {
        data = await getOnlyOwnerUsers(token);
      } else if (role === 'owner') {
        data = await getOnlyVetUsers(token);
      }
      setUsers(data);
    } catch (error) {
      setError(error.message || 'Error al cargar mascotas');
    } finally {
      setLoading(false);
    }
  }, [token, role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const fetchById = useCallback(
    async (id) => {
      setLoading(true);
      setError('');
      try {
        const data = await getProfileById(id, token);
        setUsers(data ? [data] : []);
        return data ? [data] : [];
      } catch (error) {
        setError(error.message || 'Error al buscar por ID');
        setUsers([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const fetchByName = useCallback(
    async (name) => {
      setLoading(true);
      setError('');
      try {
        const data = await getProfileByName(name, token);
        setUsers(data);
        return data;
      } catch (error) {
        setError(error.message || 'Error al buscar por nombre');
        setUsers([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const fetchByEmail = useCallback(
    async (email) => {
      setLoading(true);
      setError('');
      try {
        const data = await getProfileByEmail(email, token);
        setUsers(Array.isArray(data) ? data : [data]);
        return Array.isArray(data) ? data : [data];
      } catch (error) {
        setError(error.message || 'Error al buscar por email');
        setUsers([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const fetchByRole = useCallback(
    async (roleValue) => {
      setLoading(true);
      setError('');
      try {
        const data = await getAllProfiles(token);
        const filtered = data.filter((user) =>
          Array.isArray(user.role)
            ? user.role.includes(roleValue)
            : user.role === roleValue
        );
        setUsers(filtered);
        return filtered;
      } catch (error) {
        setError(error.message || 'Error al buscar por rol');
        setUsers([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const fetchBySpecialty = useCallback(
    async (specialty) => {
      setLoading(true);
      setError('');
      try {
        const data = await getVetBySpecialty(specialty, token);
        setUsers(data);
        return data;
      } catch (error) {
        setError(error.message || 'Error al buscar por especialidad');
        setUsers([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const resetSearch = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let data = [];
      if (role === 'admin') {
        data = await getAllProfiles(token);
      } else if (role === 'vet') {
        data = await getOnlyOwnerUsers(token);
      } else if (role === 'owner') {
        data = await getOnlyVetUsers(token);
      }
      setUsers(data);
    } catch (error) {
      setError(error.message || 'Error al cargar usuarios');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const create = async (profile) => {
    setLoading(true);
    setError('');
    try {
      const data = await postProfile(profile, token);
      await fetchUsers();
      return data;
    } catch (error) {
      setError(error.message || 'Error al crear usuario');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, profile) => {
    setLoading(true);
    setError('');
    try {
      const data = await updateProfile(id, profile, token);
      await fetchUsers();
      return data;
    } catch (error) {
      setError(error.message || 'Error al actualizar usuario');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    setError('');
    try {
      const data = await deleteProfile(id, token);
      await fetchUsers();
      return data;
    } catch (error) {
      setError(error.message || 'Error al borrar usuario');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const paginatedUsers = users.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(users.length / pageSize);

  return {
    users: paginatedUsers,
    allUsers: users,
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
    resetSearch,
    create,
    update,
    remove
  };
};
