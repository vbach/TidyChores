/* eslint-disable max-len */
/* eslint-disable no-console */
const { Users } = require('../models');
const nodemailer = require('nodemailer');
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.forgotPassword = (req, res) => {
  if (req.body.email === '') {
    res.status(400).send('email required');
  }
  console.error(req.body.email);
  Users.findAll({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user === null) {
      console.error('email not in database');
      res.status(403).send('email not in db');
    } else {
      const token = jwt.sign(req.body.email, process.env.SECRET);
      Users.update(
        {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000
        },
        { where: { email: req.body.email } }
      );
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tidychores@gmail.com',
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: 'tidychores@gmail.com',
        to: `${req.body.email}`,
        subject: 'Tidy Chores Reset Password',
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to change your password:\n\n' +
          `http://localhost:3000/ResetPassword/${token}\n\n` +
          'Reset with expire within one hour. If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };

      console.log('sending mail');

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.status(200).json('recovery email sent');
        }
      });
    }
  });
};

exports.resetPassword = (req, res) => {};
