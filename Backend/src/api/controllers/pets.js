const Pet = require('../models/Pet');
const MedicalHistory = require('../models/MedicalHistory');
const {
  uploadImage,
  deleteImage
} = require('../../utils/cloudinaryImgHandler');
const createPet = require('../../utils/createPet');
const updateDataPet = require('../../utils/updateDataPet');
const defaultPhoto = '/assets/photo-default.png';
const hasRole = require('../../utils/hasRole');

// GET
const getAllPets = async (req, res, next) => {
  try {
    let pets;
    if (hasRole(req.user, 'admin') || hasRole(req.user, 'vet')) {
      pets = await Pet.find().populate('medicalHistories');
    } else if (hasRole(req.user, 'owner')) {
      pets = await Pet.find({ owner: req.user._id }).populate(
        'medicalHistories'
      );
    } else {
      return res.status(403).json({
        message: 'No tienes permisos'
      });
    }
    return res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar todas las mascotas' });
  }
};

const getPetByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const searchName = { name: { $regex: name, $options: 'i' } };
    let pets;
    if (hasRole(req.user, 'admin') || hasRole(req.user, 'vet')) {
      pets = await Pet.find(searchName).populate('medicalHistories');
    } else if (hasRole(req.user, 'owner')) {
      pets = await Pet.find({ ...searchName, owner: req.user._id }).populate(
        'medicalHistories'
      );
    } else {
      return res.status(403).json({
        message: 'No tienes permisos'
      });
    }
    if (!pets.length) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    return res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar una mascota por nombre' });
  }
};

const getPetByChipNumber = async (req, res, next) => {
  try {
    const { chipNumber } = req.params;
    let pets;
    if (hasRole(req.user, 'admin') || hasRole(req.user, 'vet')) {
      pets = await Pet.findOne({ chipNumber }).populate('medicalHistories');
    } else if (hasRole(req.user, 'owner')) {
      pets = await Pet.findOne({ chipNumber, owner: req.user._id }).populate(
        'medicalHistories'
      );
    } else {
      return res.status(403).json({
        message: 'No tienes permisos'
      });
    }
    if (!pets) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    return res.status(200).json(pets);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al cargar una mascota por número de microchip' });
  }
};

const getPetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let pet;
    if (hasRole(req.user, 'admin') || hasRole(req.user, 'vet')) {
      pet = await Pet.findById(id).populate('medicalHistories');
    } else if (hasRole(req.user, 'owner')) {
      pet = await Pet.findOne({ _id: id, owner: req.user._id }).populate(
        'medicalHistories'
      );
    } else {
      return res.status(403).json({ message: 'No tienes permisos' });
    }
    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    return res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar mascota por ID' });
  }
};

// POST
const postNewPet = async (req, res, next) => {
  try {
    if (
      !hasRole(req.user, 'admin') &&
      !hasRole(req.user, 'owner') &&
      !hasRole(req.user, 'vet')
    ) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }
    let photoUrl = '/assets/photo-default.png';
    if (req.file) {
      photoUrl = await uploadImage(req.file.buffer);
    }
    const petData = { ...req.body, photo: photoUrl, reqUser: req.user };
    if (!petData.owner) {
      delete petData.owner;
    }

    const petSaved = await createPet(petData);
    return res
      .status(201)
      .json({ message: 'Mascota creada correctamente', petSaved });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Error al crear una nueva mascota' });
  }
};

// PUT
const updatePet = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (
      !hasRole(req.user, 'admin') &&
      !hasRole(req.user, 'vet') &&
      !hasRole(req.user, 'owner')
    ) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }

    let newPhotoUrl;
    if (req.file) {
      newPhotoUrl = await uploadImage(req.file.buffer);
    }

    const updateFields = { ...req.body };
    if ('owner' in updateFields) {
      if (typeof updateFields.owner === 'object' && updateFields.owner._id) {
        updateFields.owner = updateFields.owner._id;
      }
    }

    const petUpdated = await updateDataPet(
      id,
      updateFields,
      req.user,
      newPhotoUrl
    );

    return res.status(201).json({
      message: 'Los datos de la mascota se han modificado correctamente',
      petUpdated
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Error al modificar datos de una mascota'
    });
  }
};

// DELETE
const deletePet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    if (
      !hasRole(req.user, 'admin') &&
      !hasRole(req.user, 'vet') &&
      !(
        hasRole(req.user, 'owner') &&
        pet.owner.toString() === req.user._id.toString()
      )
    ) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }

    if (pet.photo && pet.photo !== defaultPhoto) {
      await deleteImage(pet.photo);
    }

    await MedicalHistory.deleteMany({ pet: id });

    await Pet.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: 'Mascota eliminada correctamente', pet });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Error al borrar los datos de una mascota'
    });
  }
};

module.exports = {
  getAllPets,
  getPetByName,
  getPetByChipNumber,
  getPetById,
  postNewPet,
  updatePet,
  deletePet
};
