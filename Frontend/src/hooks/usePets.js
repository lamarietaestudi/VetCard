import { useState, useEffect, useCallback } from 'react';
import {
  getAllPets,
  getPetByName,
  getPetByChipNumber,
  getPetById,
  postNewPet,
  updatePet,
  deletePet
} from '../api/api';
import { objectToFormData } from '../utils/formData';

const pageSize = 9;

export const usePets = (token) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const fetchPets = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllPets(token);
      setPets(data);
    } catch (error) {
      setError(error.message || 'Error al cargar mascotas');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const fetchByName = useCallback(
    async (name) => {
      setLoading(true);
      setError('');
      try {
        const data = await getPetByName(name, token);
        const petsArray = Array.isArray(data) ? data : [data];
        setPets(petsArray);
        return petsArray;
      } catch (error) {
        setError(error.message || 'Error al buscar por nombre');
        setPets([]);
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
        const data = await getPetByChipNumber(chipNumber, token);
        const petsArray = Array.isArray(data) ? data : [data];
        setPets(petsArray);
        return petsArray;
      } catch (error) {
        setError(error.message || 'Error al buscar por chip');
        setPets([]);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const fetchById = useCallback(
    async (id) => {
      setLoading(true);
      setError('');
      try {
        const data = await getPetById(id, token);
        setPets(data ? [data] : []);
        return data ? [data] : [];
      } catch (error) {
        setError(error.message || 'Error al buscar por ID');
        setPets([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const create = async (values) => {
    setLoading(true);
    setError('');
    try {
      const formData = objectToFormData(values);
      const data = await postNewPet(formData, token);
      await fetchPets();
      return data;
    } catch (error) {
      setError(error.message || 'Error al crear mascota');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, values) => {
    setLoading(true);
    setError('');
    try {
      const formData = objectToFormData(values);
      const data = await updatePet(id, formData, token);
      const updated = data.petUpdated || data;
      setPets((prev) => prev.map((p) => (p._id === id ? updated : p)));
      return updated;
    } catch (error) {
      setError(error.message || 'Error al actualizar mascota');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    setError('');
    try {
      const data = await deletePet(id, token);
      await fetchPets();
      return data;
    } catch (error) {
      setError(error.message || 'Error al borrar mascota');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = async () => {
    await fetchPets();
  };

  const paginatedPets = pets.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(pets.length / pageSize);

  return {
    pets: paginatedPets,
    allPets: pets,
    loading,
    error,
    page,
    setPage,
    totalPages,
    fetchPets,
    fetchByName,
    fetchByChipNumber,
    fetchById,
    resetSearch,
    create,
    update,
    remove
  };
};
