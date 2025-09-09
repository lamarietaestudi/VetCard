const User = require('../models/User');
const findOrCreateUser = require('../../utils/findOrCreateUser');
const hasRole = require('../../utils/hasRole');

// GET
const getAllProfiles = async (req, res, next) => {
  try {
    if (!hasRole(req.user, 'admin')) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar todos los usuarios' });
  }
};

const getProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!hasRole(req.user, 'admin') && req.user._id.toString() !== id) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error de búsqueda por Id' });
  }
};

const getProfileByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    let userFilter = { name: { $regex: name, $options: 'i' } };

    if (hasRole(req.user, 'admin')) {
    } else if (hasRole(req.user, 'vet')) {
      userFilter.role = { $in: ['owner'] };
    } else if (hasRole(req.user, 'owner')) {
      userFilter.role = { $in: ['vet'] };
    } else {
      return res.status(403).json({ message: 'No tienes permisos' });
    }

    const users = await User.find(userFilter);
    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error de búsqueda por nombre' });
  }
};

const getProfileByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    if (!hasRole(req.user, 'admin') && req.user.email !== email) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error de búsqueda por email' });
  }
};

const getVetBySpecialty = async (req, res, next) => {
  try {
    const { specialty } = req.params;
    const vets = await User.find({
      role: { $in: ['vet'] },
      specialties: specialty
    });
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: 'Error de búsqueda por especialidad' });
  }
};

const getOnlyVetUsers = async (req, res, next) => {
  try {
    if (
      !hasRole(req.user, 'admin') &&
      !hasRole(req.user, 'owner') &&
      !hasRole(req.user, 'vet')
    ) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }
    const vets = await User.find({ role: { $in: ['vet'] } });
    return res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar veterinarios' });
  }
};

const getOnlyOwnerUsers = async (req, res, next) => {
  try {
    if (!hasRole(req.user, 'admin') && !hasRole(req.user, 'vet')) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }
    const owners = await User.find({ role: { $in: ['owner'] } });
    return res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar propietarios' });
  }
};

// POST
const postProfile = async (req, res, next) => {
  try {
    const result = await findOrCreateUser(req.body);

    return res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Error en nuevo usuario o registro' });
  }
};

// PUT
const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!hasRole(req.user, 'admin') && req.user._id.toString() !== id) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }

    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    if (req.body.role) {
      const currentRoles = Array.isArray(userToUpdate.role)
        ? userToUpdate.role
        : [userToUpdate.role];
      const newRoles = Array.isArray(req.body.role)
        ? req.body.role
        : [req.body.role];
      req.body.role = Array.from(new Set([...currentRoles, ...newRoles]));
    }

    if (req.body.specialties) {
      const currentSpecialties = Array.isArray(userToUpdate.specialties)
        ? userToUpdate.specialties
        : [];
      const newSpecialties = Array.isArray(req.body.specialties)
        ? req.body.specialties
        : [req.body.specialties];
      req.body.specialties = Array.from(
        new Set([...currentSpecialties, ...newSpecialties])
      );
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar usuario' });
  }
};

// DELETE
const deleteProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!hasRole(req.user, 'admin') && req.user._id.toString() !== id) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};

module.exports = {
  getAllProfiles,
  getProfileByEmail,
  getProfileById,
  getProfileByName,
  getVetBySpecialty,
  getOnlyVetUsers,
  getOnlyOwnerUsers,
  postProfile,
  updateProfile,
  deleteProfile
};
