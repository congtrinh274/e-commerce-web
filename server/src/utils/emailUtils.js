const nodemailer = require('nodemailer');
require('dotenv').config();

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Account Verification',
    html: `Click the following link to verify your account: <a href="http://localhost:8888/api/users/verify/${verificationToken}">Verify</a>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
