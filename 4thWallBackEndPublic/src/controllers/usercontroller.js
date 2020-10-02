import {User} from '../../db/db'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'


const BCRYPT_SALT_ROUNDS = 10;
process.env.SECRET_KEY = 10;

const findAllUsers = (req,res)=>{
  console.log("finding all users")
    User.findAll({

    }).then(users=>{
      if(!users){
        res.send("No users found!")
      }
      //check to make sure admin is asking for this request.
      console.log("User list here")
    })     
  }


const registerUser = (req,res) =>{
  console.log("Register is firing")
  const {email,password} = req.body;

  const today = new Date();

  //is there an email already in the DB?
  User.findOne({
    where:{
      email:req.body.email
    }
  }).then(user=>{
    //if no user, create one
    if(!user){
      console.log("Creating user...")
      bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
      .then(hashedPassword=>{
        const userData ={
          email:email,
          password:hashedPassword,
          created:today
        }
        User.create(userData)
        .then(user=>{
          console.log(`${user.email} has been created.`)
          //todo - send email welcoming to fourthwall?
          res.json({status:user.email+' has been registered'})
        }).catch(err=>{
          res.send('error: '+err.message)
        })
      })
    }else {
    //User found in DB
      res.json({error: "User already exists"})
    }
  }).catch(err=>{
    res.send('error: '+ err.message)
  })
}

const loginUser = (req,res) =>{
  //see if user is in DB
  User.findOne({
    where:{
      email:req.body.email
    }
  }).then(user=>{
    //if a user is returned
    if(user){
      if (bcrypt.compareSync(req.body.password,user.password)){
        let token=jwt.sign(user.dataValues,process.env.SECRET_KEY,{
          expiresIn:1440
        })
        res.send(token)
      }else{
        console.log("Wrong password")
        res.status(401).send({message:'There was a problem'})
      }
      //if no user
    }else{
      res.status(400).json("The username or password was incorrect")
    }
  }).catch(err=>{
    console.log(err,err.message)
    res.status(400).json("The was an error, please contact the administrator")
  })

}

const forgotPassword = (req,res)=>{
  const email = req.body.email
  if (email ===''){
    res.status(400).send("Email Required")
  }
  console.error(req.body.email);
  User.findOne({
    where:{
      email: email,
    },
  }).then((user) => {
    if(user ===null){
      console.error('Email not located');
      res.status(403).send('There was a problem.')
    } else{
      //creates token and sets in DB
      const token = crypto.randomBytes(20).toString('hex');
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now()+ 360000,
      });

      const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
          user:'4thwallTheaterReviews',
          pass:'zd911372!!'
        }
      });
        //setting up mail options, gmail username and password
      const mailOptions ={
        from: '4thwallTheaterviews@gmail.com',
        to: `${user.email}`,
        subject: 'Link to Reset your password',
        text: 'You are recieving this because you (or someone else) have requested the reset of the password for your account. \n\n'
        +`http://www.fourthwallreviews.com/reset/${token}\n\n`
        +'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      console.log('Sending mail');
      //send mail
      transporter.sendMail(mailOptions,(err, res) => {
        if(err){
          console.error('there was an error: ',err);
        }else {
          console.log('Here is the response: ', res);
          res.status(200).json('recovery email sent')
        }
      });
    }
  });
};

const resetPassword = (req,res,next) =>{
  console.log("Trying to reset password....")
  User.findOne({
    where:{
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires:{
      [Op.gte]:Date.now()
      },     
    },
  }).then(user => {
    if(user == null){
      console.log('passsword reset link is invalid or has expired');
      res.json('password reset link is invalid or has expired');
    }else {
      res.status(200).send({
        email:user.email,
        message: 'password reset link ok'
      });
    }
  });
};

const updatePassword = (req,res,next)=>{
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(user => {
    if (user != null) {
      console.log('user exists');
      bcrypt
      .hash(req.body.password, BCRYPT_SALT_ROUNDS)
      .then(hashedPassword => {
        user.update({
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        });
      })
      .then(() => {
        console.log('password updated'),
        res.status(200).send({message: 'password updated'})
      });
    }else {
      console.log('User not in DB')
      res.status(404).json('There was an error')
    }
  })
}

const sendEmail = (req,res,next)=>{
  const {email,comment} = req.body

  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'4thwalltheaterreviews',
      pass:'zd911372!!'
    }
  });
    //setting up mail options, gmail username and password
  const mailOptions ={
    from: '4thwallTheaterviews@gmail.com',
    to: `zdenardi@gmail.com`,
    subject: 'Theater Representative Submission',
    text: `You have a request for a Theater Representitive ` 
    +`Email: ${email}`+
    +` Comment: ${comment}` 
  };
  console.log('Sending mail');
  //send mail
  transporter.sendMail(mailOptions,(err, success) => {
    if(err){
      console.error('Here is the error, :',err.message)
      
    }else {
      console.log('Email sent');
      res.status(200).json('Submission email sent')
      
    }
  });
}



module.exports={
  registerUser,
  findAllUsers,
  loginUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  sendEmail
}