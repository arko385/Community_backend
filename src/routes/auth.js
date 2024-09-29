// src/routes/auth.js
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import User from '../models/User.js';  // Import Mongoose User model

dotenv.config();  // Load environment variables

const router = express.Router();

// Nodemailer transporter setup (use your SMTP details)
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',  // E.g., Gmail or any other service
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

// Helper function to send OTP via email
const sendOtp = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`
  };
console.log(email);

  return transporter.sendMail(mailOptions);
};

// Generate a random 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

// Signup Route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if user exists and password matches
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate OTP and store it
    const otp = generateOtp();
    user.otp = otp;  // Save OTP to user model (or in a separate store)
    await user.save();

    // Send OTP via email
    await sendOtp(email, otp);

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error });
  }
});

// OTP Verification Route
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    // Check if user exists and OTP matches
    const user = await User.findOne({ email, otp });
    if (user) {
      user.otp = null;  // Clear OTP after successful verification
      await user.save();
      return res.status(200).json({ message: 'OTP verified successfully' });
    }

    res.status(401).json({ message: 'Invalid OTP' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
