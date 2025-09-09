const Pet = require('../api/models/Pet');
const { deleteImage } = require('./cloudinaryImgHandler');

const defaultPhoto = '/assets/photo-default.png';

const updateDataPet = async (id, updateFields, reqUser, newPhotoUrl) => {
  const pet = await Pet.findById(id);
  if (!pet) throw new Error('Mascota no encontrada');

  if (
    reqUser.role.includes('owner') &&
    pet.owner.toString() !== reqUser._id.toString()
  ) {
    throw new Error('No tienes permisos');
  }

  if (newPhotoUrl && pet.photo && pet.photo !== defaultPhoto) {
    await deleteImage(pet.photo);
    pet.photo = newPhotoUrl;
  } else if (newPhotoUrl) {
    pet.photo = newPhotoUrl;
  }

  Object.keys(updateFields).forEach((key) => {
    if (
      key !== 'photo' &&
      key !== 'owner' &&
      updateFields[key] &&
      key !== undefined
    ) {
      pet[key] = updateFields[key];
    }
  });

  if (
    reqUser.role.includes('admin') ||
    (reqUser.role.includes('vet') && updateFields.owner)
  ) {
    pet.owner = updateFields.owner;
  }

  await pet.save();
  return pet;
};

module.exports = updateDataPet;
