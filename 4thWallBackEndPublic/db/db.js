const Sequelize = require("sequelize");
const DB_HOST=''
const DB_USER=''
const DB_PASSWORD=''
const DB_NAME=''
const UserModel = require("../models/User")
const TheaterCompanyModel = require("../models/TheaterCompany")
const ReviewModel = require("../models/Review")

const db = {}

const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,
{
  host:DB_HOST,
  dialect: 'mysql',
  operatorAliases:false,
  

  pool: {
    max:5,
    min:0,
    acquire: 3000,
    idle:10000
  },
});

const User = UserModel(sequelize,Sequelize)

const TheaterCompany=TheaterCompanyModel(sequelize,Sequelize)
const Review = ReviewModel(sequelize,Sequelize)

TheaterCompany.hasMany(Review,{
  foreignKey:'company_id'
})

Review.belongsTo(TheaterCompany,{
  foreignKey:'company_id'
})

TheaterCompany.hasOne(User,{
  as:'Rep',
  foreignKey:'user_id'
});


// sequelize.sync({force:false})
// .then(()=>{
//   console.log("Datebases created!")
// })

db.sequelize = sequelize
db.Sequalize = Sequelize

module.exports = {
  db,
  User,
  TheaterCompany,
  Review,
  sequelize
}