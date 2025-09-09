const express = require('express');
const petRoutes = express.Router();
const {
  getAllPets,
  getPetByName,
  getPetByChipNumber,
  getPetById,
  postNewPet,
  updatePet,
  deletePet
} = require('../controllers/pets');
const { isAuth } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');

petRoutes.get('/', isAuth, getAllPets);
petRoutes.get('/name/:name', isAuth, getPetByName);
petRoutes.get('/chip/:chipNumber', isAuth, getPetByChipNumber);
petRoutes.get('/:id', isAuth, getPetById);
petRoutes.post('/', isAuth, upload.single('photo'), postNewPet);
petRoutes.put('/:id', isAuth, upload.single('photo'), updatePet);
petRoutes.delete('/:id', isAuth, deletePet);

module.exports = petRoutes;
