const cloudinary = require('cloudinary').v2;

const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    });
    console.log('Conectado a Cloudinary');
  } catch (error) {
    console.log({
      message: 'Error conectando a Cloudinary',
      error: error.message
    });
    throw error;
  }
};

module.exports = { connectCloudinary, cloudinary };
