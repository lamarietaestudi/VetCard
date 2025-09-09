require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const csv = require('csvtojson');
const User = require('../../api/models/User');
const { connectDB } = require('../../config/db');

const initUsersSeed = async () => {
  try {
    await connectDB();
    await User.deleteMany({});

    const usersData = await csv().fromFile('src/data/data-users.csv');

    const updatedUsers = usersData.map((user) => {
      delete user._id;
      if (user.role !== 'vet') {
        delete user.licenseNumber;
        delete user.specialties;
      }
      user.password = bcrypt.hashSync(user.password, 10);
      return user;
    });

    await User.insertMany(updatedUsers);
    console.log('Datos cargados correctamente');
  } catch (error) {
    console.error('Error al cargar datos', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

initUsersSeed();
