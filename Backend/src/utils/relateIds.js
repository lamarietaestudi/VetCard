require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../api/models/User');
const Pet = require('../api/models/Pet');
const MedicalHistory = require('../api/models/MedicalHistory');
const { connectDB } = require('../config/db');
const fs = require('fs'); // File system module to manage files

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const relateIds = async () => {
  try {
    await connectDB();

    const users = await User.find();
    const vets = users.filter((user) => user.role.includes('vet'));
    const owners = users.filter((user) => user.role.includes('owner'));
    const pets = await Pet.find();
    const medicalHistories = await MedicalHistory.find();

    // Relate pets with an owner randomly
    for (const pet of pets) {
      if (owners.length > 0) {
        pet.owner = getRandom(owners)._id;
      }
      await pet.save();
    }

    // Relate medical history with a pet and a vet randomly
    for (const medicalHistory of medicalHistories) {
      if (pets.length > 0) {
        medicalHistory.pet = getRandom(pets)._id;
      }
      if (vets.length > 0) {
        medicalHistory.vet = getRandom(vets)._id;
      }
      await medicalHistory.save();
    }

    console.log('Ids relacionados con éxito');
  } catch (error) {
    console.error('Error relacionando Ids', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

relateIds();
