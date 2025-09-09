const MedicalHistory = require('../models/MedicalHistory');
const Pet = require('../models/Pet');
const User = require('../models/User');
const addDate = require('../../utils/addDate');
const hasRole = require('../../utils/hasRole');

// GET

const getAllMedicalHistories = async (req, res, next) => {
  try {
    let medicalHistories;
    if (hasRole(req.user, 'admin') || hasRole(req.user, 'vet')) {
      medicalHistories = await MedicalHistory.find().populate('pet vet');
    } else if (hasRole(req.user, 'owner')) {
      const pets = await Pet.find({ owner: req.user._id });
      const petIds = pets.map((pet) => pet._id);
      medicalHistories = await MedicalHistory.find({
        pet: { $in: petIds }
      }).populate('pet vet');
    } else {
      return res.status(403).json({ message: 'No tienes permisos' });
    }

    return res.status(200).json(medicalHistories);
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar historiales médicos' });
  }
};

const getMedicalHistoriesByPetName = async (req, res, next) => {
  try {
    const { petName } = req.params;

    const pets = await Pet.find({
      name: { $regex: petName, $options: 'i' }
    });
    if (!pets.length)
      return res.status(404).json({ message: 'Mascota no encontrada' });

    let petIds;
    if (hasRole(req.user, 'admin') || hasRole(req.user, 'vet')) {
      petIds = pets.map((pet) => pet._id);
    } else if (hasRole(req.user, 'owner')) {
      petIds = pets
        .filter((pet) => pet.owner.toString() === req.user._id.toString())
        .map((pet) => pet._id);
      if (!petIds.length)
        return res.status(403).json({ message: 'No tienes permisos' });
    } else {
      return res.status(403).json({ message: 'No tienes permisos' });
    }

    const medicalHistories = await MedicalHistory.find({
      pet: { $in: petIds }
    }).populate('pet vet');

    return res.status(200).json(medicalHistories);
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar historial médico' });
  }
};

const getMedicalHistoriesByChipNumber = async (req, res, next) => {
  try {
    const { chipNumber } = req.params;
    const pet = await Pet.findOne({ chipNumber });
    if (!pet) return res.status(404).json({ message: 'Mascota no encontrada' });

    if (
      !(hasRole(req.user, 'admin') || hasRole(req.user, 'vet')) &&
      !(
        hasRole(req.user, 'owner') &&
        pet.owner.toString() === req.user._id.toString()
      )
    ) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }

    const medicalHistories = await MedicalHistory.find({
      pet: pet._id
    }).populate('pet vet');
    return res.status(200).json(medicalHistories);
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar historial médico' });
  }
};

const getMedicalHistoryById = async (req, res, next) => {
  try {
    const history = await MedicalHistory.findById(req.params.id).populate(
      'pet vet'
    );
    if (!history) return res.status(404).json({ message: 'No encontrado' });
    return res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar historial médico' });
  }
};

const getMedicalHistoryByOwnerName = async (req, res, next) => {
  try {
    const { ownerName } = req.params;

    if (!hasRole(req.user, 'admin') && !hasRole(req.user, 'vet')) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }

    const owner = await User.findOne({
      name: { $regex: ownerName, $options: 'i' },
      role: { $in: ['owner'] }
    });

    if (!owner) {
      return res.status(404).json({ message: 'Propietario/a no encontrado/a' });
    }
    const pets = await Pet.find({ owner: owner._id });
    if (!pets.length) {
      return res.status(404).json({
        message: 'No se encontraron mascotas para este/a propietario/a'
      });
    }
    const petIds = pets.map((pet) => pet._id);
    const medicalHistories = await MedicalHistory.find({
      pet: { $in: petIds }
    }).populate('pet vet');

    return res.status(200).json(medicalHistories);
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar historial médico' });
  }
};

// POST
const createMedicalHistory = async (req, res, next) => {
  try {
    const { pet: petId, vet: vetId } = req.body;

    if (!hasRole(req.user, 'admin') && !hasRole(req.user, 'vet')) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }

    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ mesage: 'Mascota no encontrada' });

    const vet = await User.findOne({ _id: vetId, role: { $in: ['vet'] } });
    if (!vet)
      return res.status(404).json({ message: 'Veterinario no encontrado' });

    req.body.date = addDate(req.body.date);

    const newHistory = new MedicalHistory({
      ...req.body,
      pet: petId,
      vet: vetId
    });
    await newHistory.save();
    return res.status(201).json({
      message: 'Historial médico creado correctamente',
      newHistory
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear historial médico' });
  }
};

// PUT
const updateMedicalHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const medicalHistory = await MedicalHistory.findById(id);
    if (!medicalHistory)
      return res
        .status(404)
        .json({ message: 'No se ha encontrado el historial médico' });

    if (!hasRole(req.user, 'admin') && !hasRole(req.user, 'vet')) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }

    if (req.body.vet && req.body.vet !== medicalHistory.vet.toString()) {
      const vet = await User.findOne({
        _id: req.body.vet,
        role: { $in: ['vet'] }
      });
      if (!vet)
        return res.status(404).json({ message: 'Veterinario no encontrado' });
      medicalHistory.vet = req.body.vet;
    }

    const updatableFields = [
      'medicalType',
      'title',
      'description',
      'notes',
      'date'
    ];
    updatableFields.forEach((key) => {
      if (
        req.body[key] !== undefined &&
        req.body[key] !== null &&
        req.body[key] !== ''
      ) {
        if (key === 'date') {
          medicalHistory.date = addDate(req.body.date);
        } else {
          medicalHistory[key] = req.body[key];
        }
      }
    });

    await medicalHistory.save();
    return res.status(200).json({
      message: 'Historial médico actualizado correctamente',
      medicalHistory
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al editar historial médico' });
  }
};

// DELETE
const deleteMedicalHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!hasRole(req.user, 'admin') && !hasRole(req.user, 'vet')) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }
    const medicalHistory = await MedicalHistory.findById(id);
    if (!medicalHistory)
      return res
        .status(404)
        .json({ message: 'No se ha encontrado el historial médico' });

    const pet = await Pet.findById(medicalHistory.pet);
    if (!pet) return res.status(404).json({ message: 'Mascota no encontrada' });

    await MedicalHistory.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Historial médico eliminado correctamente',
      medicalHistory
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al borrar historial médico' });
  }
};

module.exports = {
  getAllMedicalHistories,
  getMedicalHistoriesByPetName,
  getMedicalHistoriesByChipNumber,
  getMedicalHistoryById,
  getMedicalHistoryByOwnerName,
  createMedicalHistory,
  updateMedicalHistory,
  deleteMedicalHistory
};
