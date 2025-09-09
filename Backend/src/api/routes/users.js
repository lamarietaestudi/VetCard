const express = require('express');
const userRoutes = express.Router();
const {
  getAllProfiles,
  getProfileByEmail,
  getProfileById,
  getProfileByName,
  getVetBySpecialty,
  getOnlyVetUsers,
  getOnlyOwnerUsers,
  postProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/users');
const { isAuth, isAdmin } = require('../../middlewares/auth');

userRoutes.get('/vets', isAuth, getOnlyVetUsers);
userRoutes.get('/owners', isAuth, getOnlyOwnerUsers);
userRoutes.get('/specialty/:specialty', isAuth, getVetBySpecialty);
userRoutes.get('/email/:email', isAuth, getProfileByEmail);
userRoutes.get('/name/:name', isAuth, getProfileByName);
userRoutes.get('/:id', isAuth, getProfileById);
userRoutes.get('/', isAuth, getAllProfiles);
userRoutes.post('/', postProfile);
userRoutes.put('/:id', isAuth, updateProfile);
userRoutes.delete('/:id', isAuth, deleteProfile);

module.exports = userRoutes;
