import {Review,TheaterCompany,sequelize} from '../../db/db'
import Sequelize  from 'sequelize';
 



const SELECT_ALL_REVIEWS_WITH_COMPANY_ID = "SELECT reviews.review_id,reviews.role,reviews.profRating,reviews.worthWhileRating,reviews.rateofPay,reviews.comment,theatercompanies.companyName FROM reviews LEFT JOIN theatercompanies USING(company_id) WHERE company_id"


//get all reviews
const getAllReviews = async (req,res)=>{
  console.log("Getting reviews....")


  const totalReviews = await Review.count({})

  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize)||totalReviews
  const field = req.query.sort || "review_id"
  const order = req.query.order || "ASC"
  const offset = (page-1)*pageSize
  

  Review.findAll({
    subquery:false,
    offset:page != 0 ? offset : totalReviews,
    limit:pageSize,
    attributes:[
      'review_id',
      'user_id',
      'company_id',
      'date',
      'role',
      'profRating',
      'worthWhileRating',
      'rateofPay',
      'comment',
      'responseAns',
      'response',
      [sequelize.col('theatercompany.companyName'),'companyName']
    ],
    include:[{
      model:TheaterCompany,
      attributes:[],
    }],
    order:[
      [field,order]    
    ],
    raw:true    
  }).then(reviews=>{
    if(!reviews){
      res.json({error:"There are no reviews!"})
    }
    res.json({data:reviews,total:totalReviews})
  }).catch(err=>{
    console.log(err,err.message)
  })
}

//   sequelize.query(SELECT_ALL_REVIEWS_WITH_COMPANY_ID    
// ).then(reviews =>{
//       if(!reviews){
//         res.json({error:"There are no reviews!"})
//       }
//       res.send(reviews[0])
//     }).catch(err =>{
//       console.log(err,err.message)
//     })


//   }

//get review from id

const getReviewById = (req,res)=>{
  const id= req.params.id;
  Review.findOne({
    subquery:false,
    attributes:[
      'review_id',
      'user_id',
      'company_id',
      'date',
      'role',
      'profRating',
      'worthWhileRating',
      'rateofPay',
      'comment',
      'responseAns',
      'response',
      [sequelize.col('theatercompany.companyName'),'companyName']
    ],
    include:[{
      model:TheaterCompany,
      attributes:[],
    }],
    where:{
      review_id:id
    },
    raw:true
  }).then(review =>{
    res.send({data:review})
  }).catch(err=>{
    console.log(err)
    res.send(err)
  })
}

//Add new Review
const addReview = (req,res)=>{
  const {user_id,company_id,date,profRating,worthWhileRating,rateofPay,comment,responseAns} = req.body;
  let {role} = req.body
  console.log(responseAns)
  const repAnswer = (responseAns ? 1 : 0)
  console.log(repAnswer)
  role = parseInt(role)
  console.log(role)
  const roles = ["Actor","Designer","Director","Production"]
  role = roles[role]

  console.log("....Trying to add a review")
  const reviewData = {
    user_id: (user_id),
    company_id:(company_id),
    date: date,
    role: (role),
    profRating: (profRating),
    worthWhileRating: (worthWhileRating),
    rateofPay: (rateofPay),
    comment: (comment),
    responseAns:repAnswer
  }
  Review.create(reviewData)
  .then(review => {
    console.log("Review added!")
    res.send(review.dataValues)
  })
  .catch(err=>{
    res.status(401).send({message: 'There was a problem'})
    console.log(err.message)
  })
}


const updateReview =(req,res)=>{
  const {review_id,user_id,company_id,date,profRating,worthWhileRating,rateofPay,comment,responseAns} = req.body;
  let {role} = req.body
  console.log("Trying to update review")
  
  role = parseInt(role)
  

  if (isNaN(role)){
    console.log(isNaN(role))
    console.log("Role is not an int")
    return
  }
  const roles = ["Actor","Designer","Director","Production"]
  role = roles[role]



  console.log(req.body)
  console.log("Trying to update review "+review_id)
  //save for later
   //make reviewData object with above critera
    const reviewData = {
      company_id:(company_id),
      date: date,
      role: (role),
      profRating: (profRating),
      worthWhileRating: (worthWhileRating),
      rateofPay: (rateofPay),
      comment: (comment),
      responseAns:(responseAns) 
    }
  console.log(reviewData)
  //find review
  Review.findOne({
    where:{review_id:review_id}
  }).then((review)=>{
    review.update(reviewData)
    console.log("Review Update!")
    res.send("Review updated!")
    console.log(reviewData)
  }).catch(err=>{
    console.log("There was an error")
    res.send('error:'+err)
  })
}

const updateResponse = (req,res)=>{
  const {response,review_id} = req.body
  console.log(response)
  console.log("Trying to add response to review")

  const reviewData = {
    response:(response)
  }
    Review.findOne({
      where:{
        review_id:review_id
      }
      }).then((review)=>{
        review.update(reviewData)
        console.log("Response Added", response)
        res.status(200).send(response)
        
      }).catch(err=>{
        console.log("There was an error")
        console.log(err.message, err)
        res.send('error'+err)
      })
}

const deleteReview=(req,res)=>{
  console.log("...Trying to delete Reviews")
  const review_id= req.params.id;
  // const {review_id,user_id,company_id,date,profRating,worthWhileRating,rateofPay,comment} = req.body;
  //get all review props from body
  console.log("Trying to delete review "+review_id)
  //save for later
   //make reviewData object with above critera
    Review.findOne({
    where:{review_id:review_id
  }}).then((review)=>{
    review.destroy()
    console.log("Review Deleted!")
    res.send("Review Delete")
  }).catch(err=>{
    console.log("There was an error")
    res.send('error:'+err)
  })
}


const getReviewsByCompanyName = async (req,res)=>{
  console.log("Getting reviews for company...")
  const totalReviews = await Review.count({})

  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize)||totalReviews
  const field = req.query.sort || "review_id"
  const order = req.query.order || "ASC"
  const offset = (page-1)*pageSize

  Review.findAll({
    where:{
      'company_id':req.params.id
    },
    subquery:false,
    offset:page != 0 ? offset : totalReviews,
    limit:pageSize,
    attributes:[
      'review_id',
      'user_id',
      'company_id',
      'date',
      'role',
      'profRating',
      'worthWhileRating',
      'rateofPay',
      'comment',
      'responseAns',
      'response',
      [sequelize.col('theatercompany.companyName'),'companyName']
    ],
    include:[{
      model:TheaterCompany,
      attributes:[],
    }],
    order:[
      [field,order]    
    ],
    raw:true    
  }).then(reviews=>{
    if(!reviews){
      res.json({error:"There are no reviews!"})
    }
    res.json({data:reviews,total:totalReviews})
  }).catch(err=>{
    console.log(err,err.message)
  })
  

}
// 
const getRepReviews = async (req,res) =>{
  const id= req.params.id;

  console.log("testing for companies")
  Review.findAll({
    where:{
          responseAns:1
    },
    subquery:false,
    
    attributes:[
      'review_id',
      'user_id',
      'company_id',
      'date',
      'role',
      'profRating',
      'worthWhileRating',
      'rateofPay',
      'comment',
      'responseAns',
      'response',
      [sequelize.col('theatercompany.companyName'),'companyName']
    ],
    include:[{
      model:TheaterCompany,
      attributes:[],
      where:{
        user_id:id
      }
    }],

  }).then(reviews=>{
    if(!reviews){
      res.json({error:"There are no reviews!"})
    }
    res.json({data:reviews})
  }).catch(err=>{
    console.log(err,err.message)
  })
  

}



module.exports={
  getAllReviews,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
  getReviewsByCompanyName,
  getRepReviews,
  updateResponse
}