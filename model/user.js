const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 32
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 32
  },
  email: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 32,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('users', UserSchema);