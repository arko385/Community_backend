// src/utils/sendEmail.js

const nodemailer = require('nodemailer');
require('dotenv').config();

const sendOTP = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.EMAIL_PASSWORD, 
        },
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP for Login/Signup',
        text: `Your OTP is ${otp}`
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
