// src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  otp: {
    type: Number,
    default: null
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
