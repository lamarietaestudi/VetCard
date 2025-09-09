const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: ''
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: { type: String, trim: true },
    address: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },
    postalCode: { type: Number, trim: true, default: '' },

    password: {
      type: String,
      required: true
    },
    role: {
      type: [String],
      enum: ['admin', 'owner', 'vet'],
      required: true
    },
    licenseNumber: {
      type: String,
      default: ''
    },
    specialties: { type: [String], default: [] }
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  if (this.phoneNumber) {
    let cleaned = this.phoneNumber.replace(/\D/g, '');
    if (cleaned.startsWith('34') && cleaned.length === 11) {
      this.phoneNumber = '+34' + cleaned.slice(2);
    } else if (cleaned.length === 9) {
      this.phoneNumber = '+34' + cleaned;
    } else if (this.phoneNumber.startsWith('+34')) {
      this.phoneNumber = this.phoneNumber.replace(/\D/g, '');
      this.phoneNumber = '+34' + this.phoneNumber.slice(2);
    } else {
      this.phoneNumber = '+' + cleaned;
    }
  }
  next();
});

const User = mongoose.model('User', userSchema, 'users'); // model name , Schema name , collection name
module.exports = User;
