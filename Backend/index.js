require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const { connectCloudinary } = require('./src/config/cloudinary');
const petRoutes = require('./src/api/routes/pets');
const userRoutes = require('./src/api/routes/users');
const medicalHistoriesRoutes = require('./src/api/routes/medicalHistories');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
connectCloudinary();

app.use('/api/v1/pets', petRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/medicalHistories', medicalHistoriesRoutes);

app.use('/*any', (req, res, next) => {
  return res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Error del servidor' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
