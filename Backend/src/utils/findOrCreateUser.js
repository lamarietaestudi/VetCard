const User = require('../api/models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const findOrCreateUser = async (userData) => {
  const { email, password, role } = userData;
  if (!email || !password || (!role && email !== ADMIN_EMAIL)) {
    throw new Error('Todos los campos son obligatorios');
  }

  let user = await User.findOne({ email });

  if (user) {
    //LOGIN
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      throw new Error('Contraseña incorrecta');
    }
    const roles = Array.isArray(user.role) ? user.role : [user.role];
    if (roles.includes('admin')) {
      const token = generateToken(user._id, 'admin');
      return { message: 'Login realizado con éxito', user, token };
    }
    if (!roles.includes(role)) {
      throw new Error('El rol seleccionado no coincide con el de tu cuenta');
    }
    const token = generateToken(user._id, role);
    return { message: 'Login realizado con éxito', user, token };
  }

  //REGISTRO
  const roles = Array.isArray(role) ? role : [role];
  const newUser = new User({
    ...userData,
    role: roles
  });

  user = await newUser.save();
  const token = generateToken(user._id, role);
  return { message: 'Registro y acceso correctos', user, token };
};

module.exports = findOrCreateUser;
