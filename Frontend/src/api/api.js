const API_URL = import.meta.env.VITE_API_URL;

//? ---------- USERS ----------

export const getAllProfiles = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProfileById = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProfileByEmail = async (email, token) => {
  try {
    const response = await fetch(`${API_URL}/users/email/${email}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProfileByName = async (name, token) => {
  try {
    const response = await fetch(`${API_URL}/users/name/${name}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getVetBySpecialty = async (specialty, token) => {
  try {
    const response = await fetch(`${API_URL}/users/specialty/${specialty}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getOnlyVetUsers = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/vets`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getOnlyOwnerUsers = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/owners`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const postProfile = async (data) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (id, user, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteProfile = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

//? ---------- PETS ----------

export const getAllPets = async (token) => {
  try {
    const response = await fetch(`${API_URL}/pets`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPetByName = async (name, token) => {
  try {
    const response = await fetch(`${API_URL}/pets/name/${name}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPetByChipNumber = async (chipNumber, token) => {
  try {
    const response = await fetch(`${API_URL}/pets/chip/${chipNumber}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPetById = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/pets/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const postNewPet = async (formData, token) => {
  try {
    const response = await fetch(`${API_URL}/pets`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updatePet = async (id, formData, token) => {
  try {
    const response = await fetch(`${API_URL}/pets/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deletePet = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/pets/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

//? ---------- MEDICAL HISTORIES ----------

export const getAllMedicalHistories = async (token) => {
  try {
    const response = await fetch(`${API_URL}/medicalHistories`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMedicalHistoryById = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/medicalHistories/id/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMedicalHistoriesByPetName = async (petName, token) => {
  try {
    const response = await fetch(`${API_URL}/medicalHistories/${petName}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMedicalHistoriesByChipNumber = async (chipNumber, token) => {
  try {
    const response = await fetch(
      `${API_URL}/medicalHistories/pet/${chipNumber}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMedicalHistoryByOwnerName = async (ownerName, token) => {
  try {
    const response = await fetch(
      `${API_URL}/medicalHistories/owner/${ownerName}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createMedicalHistory = async (history, token) => {
  try {
    const response = await fetch(`${API_URL}/medicalHistories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(history)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateMedicalHistory = async (id, history, token) => {
  try {
    const response = await fetch(`${API_URL}/medicalHistories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(history)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteMedicalHistory = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/medicalHistories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};
