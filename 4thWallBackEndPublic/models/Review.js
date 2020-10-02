import theaterCompany from './TheaterCompany'

module.exports=(sequelize,type)=>{
  return sequelize.define(
    'review',{
        review_id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        user_id:{
          type: type.INTEGER,
          foriegnKey: true,
        },
        company_id:{
          type: type.INTEGER,
          foriegnKey: true,
        },
        date:{
            type:type.DATE,
            defaultValue: type.NOW
        },
        role:{
          type: type.STRING
        },
        profRating:{
          type: type.INTEGER,
          validate:{
            isInt: function(profRating){
              if(isNaN(profRating)){
                throw new Error('Prof Rating is not an Int')
              } else{
                //.....
              }
            },
            greaterThanFive: function(profRating) {
              if(profRating > 5){
                throw new Error('Prof Rating is more than 5')
              }else{
                //...keep going
              }
            }
          }
        },
        worthWhileRating:{
          type: type.INTEGER,
          validate:{
            isInt: function(worthWhileRating){
              if(isNaN(worthWhileRating)){
                throw new Error('Worth While Rating is not an int')
              }else{
                //....
              }
          },
            greaterThanFive: function(worthWhileRating){
            if(worthWhileRating > 5){
              throw new Error('Worth While rating is more than 5')
            }else{
              //....
              }
            }
          }    
        },
        rateofPay:{
          type: type.STRING
        },
        comment:{
          type: type.STRING
        },
        responseAns:{
          type: type.TINYINT
        },
        response:{
          type: type.STRING
        }
      },
      {
        timestamps: false
      }
    )
  }


