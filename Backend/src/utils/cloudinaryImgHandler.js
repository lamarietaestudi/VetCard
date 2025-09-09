const { cloudinary } = require('../config/cloudinary');

const uploadImage = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: 'VetCard/pets' }, (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      })
      .end(fileBuffer);
  });
};

const deleteImage = async (urlImage) => {
  try {
    const urlParts = urlImage.split('/');
    const folderIndex = urlParts.findIndex((part) => part === 'VetCard');
    const cloudinaryId = urlParts.slice(folderIndex).join('/').split('.')[0];

    if (cloudinaryId) {
      await cloudinary.uploader.destroy(cloudinaryId);
      return;
    }
  } catch (error) {
    console.error('Error al borrar la imagen', error);
  }
};

module.exports = { uploadImage, deleteImage };
