import { useState, useEffect, useCallback } from 'react';
import {
  getAllMedicalHistories,
  getMedicalHistoryById,
  getMedicalHistoriesByPetName,
  getMedicalHistoriesByChipNumber,
  getMedicalHistoryByOwnerName,
  createMedicalHistory,
  updateMedicalHistory,
  deleteMedicalHistory
} from '../api/api';

const pageSize = 15;

export const useMedicalHistories = (token) => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const fetchHistories = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllMedicalHistories(token);
      setHistories(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(error.message || 'Error al cargar historiales médicos');
      setHistories([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchHistories();
  }, [fetchHistories]);

  const fetchById = useCallback(
    async (id) => {
      setLoading(true);
      setError('');
      try {
        const data = await getMedicalHistoryById(id, token);
        setHistories(data ? [data] : []);
        return data ? [data] : [];
      } catch (error) {
        setError(error.message || 'Error al buscar historial');
        setHistories([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const fetchByPetName = useCallback(
    async (petName) => {
      setLoading(true);
      setError('');
      try {
        const data = await getMedicalHistoriesByPetName(petName, token);
        setHistories(Array.isArray(data) ? data : []);
        return Array.isArray(data) ? data : [];
      } catch (error) {
        setError(error.message || 'Error al buscar por mascota');
        setHistories([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const fetchByChipNumber = useCallback(
    async (chipNumber) => {
      setLoading(true);
      setError('');
      try {
        const data = await getMedicalHistoriesByChipNumber(chipNumber, token);
        setHistories(Array.isArray(data) ? data : []);
        return Array.isArray(data) ? data : [];
      } catch (error) {
        setError(error.message || 'Error al buscar por chip');
        setHistories([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const fetchByOwnerName = useCallback(
    async (ownerName) => {
      setLoading(true);
      setError('');
      try {
        const data = await getMedicalHistoryByOwnerName(ownerName, token);
        setHistories(Array.isArray(data) ? data : []);
        return Array.isArray(data) ? data : [];
      } catch (error) {
        setError(error.message || 'Error al buscar por propietario');
        setHistories([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const resetSearch = async () => {
    await fetchHistories();
  };

  const create = async (history) => {
    setLoading(true);
    setError('');
    try {
      const data = await createMedicalHistory(history, token);
      await fetchHistories();
      return data;
    } catch (error) {
      setError(error.message || 'Error al crear historial');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, history) => {
    setLoading(true);
    setError('');
    try {
      const data = await updateMedicalHistory(id, history, token);
      await fetchHistories();
      return data;
    } catch (error) {
      setError(error.message || 'Error al actualizar historial');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    setError('');
    try {
      const data = await deleteMedicalHistory(id, token);
      await fetchHistories();
      return data;
    } catch (error) {
      setError(error.message || 'Error al borrar historial');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const paginatedHistories = histories.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const totalPages = Math.ceil(histories.length / pageSize);

  return {
    histories: paginatedHistories,
    loading,
    error,
    page,
    setPage,
    totalPages,
    allHistories: histories,
    fetchHistories,
    fetchById,
    fetchByPetName,
    fetchByChipNumber,
    fetchByOwnerName,
    resetSearch,
    create,
    update,
    remove
  };
};
