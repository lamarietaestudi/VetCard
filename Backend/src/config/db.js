const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Conectado con éxito a la base de datos');
  } catch (error) {
    console.log({
      message: 'Error al conectar con la base de datos',
      error: error.message
    });
    throw error;
  }
};

module.exports = { connectDB };
