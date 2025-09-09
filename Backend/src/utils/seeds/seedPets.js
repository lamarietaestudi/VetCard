require('dotenv').config();
const mongoose = require('mongoose');
const csv = require('csvtojson');
const Pet = require('../../api/models/Pet');
const { connectDB } = require('../../config/db');

const defaultPhoto = '/assets/photo-default.png';

const initPetsSeed = async () => {
  try {
    await connectDB();
    await Pet.deleteMany({});

    const petsData = await csv().fromFile('src/data/data-pets.csv');

    const updatedPets = petsData.map((pet) => {
      delete pet._id;
      if (!pet.photo || pet.photo.trim() === '') {
        pet.photo = defaultPhoto;
      }

      if (pet.birthDate && pet.birthDate.trim() !== '') {
        const [day, month, year] = pet.birthDate.split('/');
        pet.birthDate = new Date(`${year}-${month}-${day}`);
      } else {
        pet.birthDate = null;
      }

      if (!pet.owner || pet.owner.trim() === '') {
        delete pet.owner;
      }

      return pet;
    });

    await Pet.insertMany(updatedPets);
    console.log('Datos cargados correctamente');
  } catch (error) {
    console.error('Error al cargar datos:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

initPetsSeed();
