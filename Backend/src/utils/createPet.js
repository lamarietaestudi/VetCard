const Pet = require('../api/models/Pet');
const { uploadImage } = require('./cloudinaryImgHandler');

const defaultPhoto = '/assets/photo-default.png';

const createPet = async ({
  name,
  specie,
  gender,
  breed,
  weight,
  birthDate,
  chipNumber,
  photo,
  owner,
  reqUser
}) => {
  if (!name || !specie || !gender || !breed || !chipNumber) {
    throw new Error('Todos los campos obligatorios deben ser completados');
  }

  const existingPet = await Pet.findOne({ chipNumber });
  if (existingPet) {
    throw new Error(
      'Ya existe una mascota registrada con ese número de microchip'
    );
  }

  const formattedBirthDate = new Date(birthDate);
  if (isNaN(formattedBirthDate.getTime())) {
    throw new Error('La fecha proporcionada no es válida');
  }

  let photoUrl = photo || defaultPhoto;

  const ownerId = reqUser.role.includes('owner') ? reqUser._id : owner;

  const newPet = new Pet({
    name,
    specie,
    gender,
    breed,
    weight,
    birthDate: formattedBirthDate,
    chipNumber,
    photo: photoUrl,
    owner: ownerId
  });

  const petSaved = await newPet.save();
  return petSaved;
};

module.exports = createPet;
