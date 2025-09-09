const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet'
    },
    date: { type: Date, default: Date.now },
    medicalType: {
      type: String,
      required: true,
      enum: [
        'Urgencia',
        'Radiografía',
        'Cirugía',
        'Revisión rutinaria',
        'Desparasitación',
        'Vacunación'
      ]
    },
    title: { type: 'String', trim: true },
    description: { type: 'String', trim: true },
    notes: { type: 'String', trim: true },
    vet: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

const MedicalHistory = mongoose.model(
  'MedicalHistory',
  medicalHistorySchema,
  'medicalHistory'
); // model name , Schema name , collection name
module.exports = MedicalHistory;
