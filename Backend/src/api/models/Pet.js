const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    specie: {
      type: String,
      required: true,
      enum: ['perro', 'gato', 'ave', 'roedor', 'reptil', 'otro'],
      trim: true
    },
    gender: {
      type: String,
      enum: ['macho', 'hembra', 'desconocido'],
      required: true
    },
    breed: {
      type: String,
      trim: true,
      default: 'desconocida',
      required: true
    },
    weight: {
      type: String
    },
    birthDate: {
      type: Date
    },
    chipNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    photo: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      trim: true
    }
  },
  { timestamps: true }
);

petSchema.virtual('medicalHistories', {
  ref: 'MedicalHistory',
  localField: '_id',
  foreignField: 'pet'
});

petSchema.set('toObject', { virtuals: true });
petSchema.set('toJSON', { virtuals: true });

const Pet = mongoose.model('Pet', petSchema, 'pets'); // model name , Schema name , collection name
module.exports = Pet;
