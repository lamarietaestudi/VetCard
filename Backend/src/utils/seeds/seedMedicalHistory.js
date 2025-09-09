require('dotenv').config();
const mongoose = require('mongoose');
const csv = require('csvtojson');
const MedicalHistory = require('../../api/models/MedicalHistory');
const { connectDB } = require('../../config/db');

const initMedicalHistorySeed = async () => {
  try {
    await connectDB();
    await MedicalHistory.deleteMany({});

    const medicalHistorysData = await csv().fromFile(
      'src/data/data-medicalHistory.csv'
    );

    const updatedMedicalHistory = medicalHistorysData.map((medicalHistory) => {
      delete medicalHistory._id;

      if (medicalHistory.date && medicalHistory.date.trim() !== '') {
        const [day, month, year] = medicalHistory.date.split('/');
        medicalHistory.date = new Date(`${year}-${month}-${day}`);
      } else {
        medicalHistory.date = null;
      }

      if (!medicalHistory.pet || medicalHistory.pet.trim() === '') {
        delete medicalHistory.pet;
      }

      if (!medicalHistory.vet || medicalHistory.vet.trim() === '') {
        delete medicalHistory.vet;
      }

      return medicalHistory;
    });

    await MedicalHistory.insertMany(updatedMedicalHistory);
    console.log('Datos cargados correctamente');
  } catch (error) {
    console.error('Error al cargar datos:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

initMedicalHistorySeed();
