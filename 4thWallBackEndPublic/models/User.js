

module.exports = (sequelize,type )=> {
  return sequelize.define(
  'user',
    {
      user_id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email:{
        type: type.STRING
      },
      password:{
        type: type.STRING
      },
      created:{
        type: type.DATE,
        defaultValue: type.NOW
      },
      resetPasswordToken:{
        type: type.STRING,
        defaultValue: null,
      },
      resetPasswordExpires:{
        type: type.DATE,
        defaultValue: null
      },
      status:{
        type: type.STRING,
        defaultValue: null,
      },
    },
    {
      timestamps: false
    }
  )
}