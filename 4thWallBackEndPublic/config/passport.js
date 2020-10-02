import jwtSecret from './jwtConfig'
import bcyrpt from bcyrpt;

const BCRYPT_SALT_ROUNDS = 12;
const connection = require('./connection').connection;

const passport = require('passport');
  localStrategy = require('passport-local').Strategy,
  User=(connection.query("SELECT FROM users WHERE email = 'zdenardi@gmail.com'"))
