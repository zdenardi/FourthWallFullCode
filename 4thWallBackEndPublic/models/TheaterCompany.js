
module.exports = (sequelize,type)=>{
  return sequelize.define(
    'theatercompany',  {
      company_id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      companyName:{
        type:type.STRING,
        foriegnKey: true
      },
      companyDetails:{
        type:type.STRING,
        foriegnKey: false
      },
      user_id:{
        type:type.INTEGER,
        foriegnKey: true
      }
    },
    {
      timestamps: false
    },
  )
}

// var theaterCompany = (db.sequelize.define(
//   'theatercompany',
//   {
//     company_id:{
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     companyName:{
//       type:Sequelize.STRING,
//       foriegnKey: true
//     },
//     companyDetails:{
//       type:Sequelize.STRING,
//       foriegnKey: true
//     }
//   },
//   {
//     timestamps: false
//   },
//   {
//   }
// )
// )



// export default theaterCompany