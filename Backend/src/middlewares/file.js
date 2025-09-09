const multer = require('multer');

const allowedTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif'
];

const fileFilter = (req, file, callback) => {
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error('Formato de archivo no permitido'), false);
  }
};

const upload = multer({ storage: multer.memoryStorage(), fileFilter });

module.exports = upload;
