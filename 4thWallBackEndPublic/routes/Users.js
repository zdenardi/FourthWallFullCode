import {User} from "../db/db"
import {registerUser,findAllUsers,
  loginUser,forgotPassword,resetPassword,updatePassword,sendEmail} from "../src/controllers/usercontroller"
const express = require("express")
const users = express.Router();
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer')
users.use(cors());
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const BCRYPT_SALT_ROUNDS = 10;
process.env.SECRET_KEY='secret'

users.get('/',findAllUsers),
users.post('/register',registerUser),
users.post('/login',loginUser)
users.post('/forgotPassword',forgotPassword)
users.get('/reset',resetPassword)
users.put('/updatePasswordViaEmail',updatePassword)
users.post('/rep',sendEmail)

// users.get('/reset',(req,res,next) =>{
//   console.log("Trying to reset password....")
//   User.findOne({
//     where:{
//       resetPasswordToken: req.query.resetPasswordToken,
//       resetPasswordExpires:{
//       [Op.gte]:Date.now()
//       },     
//     },
//   }).then(user => {
//     if(user == null){
//       console.log('passsword reset link is invalid or has expired');
//       res.json('password reset link is invalid or has expired');
//     }else {
//       res.status(200).send({
//         email:user.email,
//         message: 'password reset link ok'
//       });
//     }
//   });
// });

// users.put('/updatePasswordViaEmail', (req,res,next) => {
//   User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   }).then(user => {
//     if (user != null) {
//       console.log('user exists');
//       bcrypt
//       .hash(req.body.password, BCRYPT_SALT_ROUNDS)
//       .then(hashedPassword => {
//         user.update({
//           password: hashedPassword,
//           resetPasswordToken: null,
//           resetPasswordExpires: null,
//         });
//       })
//       .then(() => {
//         console.log('password updated'),
//         res.status(200).send({message: 'password updated'})
//       });
//     }else {
//       console.log('User not in DB')
//       res.status(404).json('There was an error')
//     }
//   })
// })

  module.exports=users