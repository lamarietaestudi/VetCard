const express = require('express');
const medicalHistoriesRoutes = express.Router();
const {
  getAllMedicalHistories,
  getMedicalHistoriesByPetName,
  getMedicalHistoriesByChipNumber,
  getMedicalHistoryById,
  getMedicalHistoryByOwnerName,
  createMedicalHistory,
  updateMedicalHistory,
  deleteMedicalHistory
} = require('../controllers/medicalHistories');
const { isAuth } = require('../../middlewares/auth');

medicalHistoriesRoutes.get('/', isAuth, getAllMedicalHistories);
medicalHistoriesRoutes.get('/id/:id', isAuth, getMedicalHistoryById);
medicalHistoriesRoutes.get('/:petName', isAuth, getMedicalHistoriesByPetName);
medicalHistoriesRoutes.get(
  '/pet/:chipNumber',
  isAuth,
  getMedicalHistoriesByChipNumber
);
medicalHistoriesRoutes.get(
  '/owner/:ownerName',
  isAuth,
  getMedicalHistoryByOwnerName
);
medicalHistoriesRoutes.post('/', isAuth, createMedicalHistory);
medicalHistoriesRoutes.put('/:id', isAuth, updateMedicalHistory);
medicalHistoriesRoutes.delete('/:id', isAuth, deleteMedicalHistory);

module.exports = medicalHistoriesRoutes;
