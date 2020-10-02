const express = require("express")
const reviews = express.Router();
import  {getAllReviews,getReviewById,addReview,updateReview,deleteReview,getReviewsByCompanyName,getRepReviews,updateResponse} from '../src/controllers/reviewcontroller'
const cors = require('cors')
const SELECT_ALL_REVIEWS_WITH_COMPANY_JOIN = "SELECT reviews.review_id,reviews.role,reviews.profRating,reviews.worthWhileRating,reviews.rateofPay,reviews.comment,theatercompanies.companyName FROM reviews LEFT JOIN theatercompanies USING(company_id) ORDER BY date DESC"
const getReviewbyCompanyID=(id,res)=>{
  connection.query(`SELECT reviews.review_id,reviews.user_id,reviews.company_id,reviews.date,reviews.role,reviews.profRating,reviews.worthWhileRating,reviews.rateofPay,reviews.comment,theatercompanies.companyName FROM reviews LEFT JOIN theatercompanies USING(company_id) WHERE reviews.review_id = ${id}`,(err,results,fields) => {
    if(!err){
          res.send({data:results});
       
    }else{
      console.log(err.message)
    }
  })
}
const SELECT_ALL_REVIEWS_WITH_COMPANY_ID = "SELECT reviews.review_id,reviews.role,reviews.profRating,reviews.worthWhileRating,reviews.rateofPay,reviews.comment,theatercompanies.companyName FROM reviews LEFT JOIN theatercompanies USING(company_id) WHERE company_id"



var connection = require('../src/connection').connection

const Review = require("../models/Review")
reviews.use(cors());

//Get All Reviews

reviews.get('/' ,getAllReviews)
//add review
reviews.post('/',addReview);
//get review by ID
reviews.get('/review/:id',getReviewById)
//add/edit response
reviews.put('/test', updateResponse)
//get reviews for rep
reviews.get('/rep/:id',getRepReviews)

// edit review
reviews.put('/review/:id',updateReview)

//delete review
reviews.delete('/review/:id',deleteReview)

reviews.get('/user/:id',(req,res)=>{
  console.log("Finding all reviews for user...")
  const user_id=req.params.id;
  connection.query(`SELECT reviews.review_id,reviews.user_id,reviews.role,reviews.date,reviews.profRating,reviews.worthWhileRating,reviews.rateofPay,reviews.comment,theatercompanies.companyName FROM reviews LEFT JOIN theatercompanies USING(company_id) WHERE reviews.user_id=${user_id}`,(err,results)=>{
    if(!err){
      res.send({data:results})
    }else{
      console.log(err)
      res.send(err)
    }
  })
})






reviews.get('/companies/:id', getReviewsByCompanyName)


// reviews.post('/add', (req,res) =>{
//   //get all review props from body
  
//   const {user_id,company_id,date,profRating,worthWhileRating,rateofPay,comment} = req.body;
//   let {role} = req.body
  
//   role = parseInt(role)
//   console.log(role)
  

//   const roles = ["Actor","Designer","Director","Production"]
//   role = roles[role]


//   console.log("Trying to add review ")
 
//    //make reviewData object with above critera
//     const reviewData = {
//     user_id: (user_id),
//     company_id:(company_id),
//     date: date,
//     role: (role),
//     profRating: (profRating),
//     worthWhileRating: (worthWhileRating),
//     rateofPay: (rateofPay),
//     comment: (comment) 
//   }
//   console.log("LOGGING REVIEWDATA")
//   console.log(reviewData)
//   //create review
//   Review.create(reviewData)
//   .then(review => {
//     console.log("Review added!")
//     res.send(review.dataValues)
//   })
//   .catch(err=>{
//     res.status(401).send({message: 'There was a problem'})
//     console.log(err.message)
//   })
// })

//Get Reviews with user ID matching



// reviews.post('/update', (req,res) =>{
  
//   //get all review props from body


//   const {review_id,user_id,company_id,date,profRating,worthWhileRating,rateofPay,comment} = req.body;
//   let {role} = req.body
//   console.log("Trying to update review")
  
//   role = parseInt(role)
  

//   if (isNaN(role)){
//     console.log(isNaN(role))
//     console.log("Role is not an int")
//     return
//   }
//   const roles = ["Actor","Designer","Director","Production"]
//   role = roles[role]



//   console.log(req.body)
//   console.log("Trying to update review "+review_id)
//   //save for later
//    //make reviewData object with above critera
//     const reviewData = {
//       company_id:(company_id),
//       date: date,
//       role: (role),
//       profRating: (profRating),
//       worthWhileRating: (worthWhileRating),
//       rateofPay: (rateofPay),
//       comment: (comment),    
//     }
//   console.log(reviewData)
//   //find review
//   Review.findOne({
//     where:{review_id:review_id}
//   }).then((review)=>{
//     review.update(reviewData)
//     console.log("Review Update!")
//     res.send("Review updated!")
//     console.log(reviewData)
//   }).catch(err=>{
//     console.log("There was an error")
//     res.send('error:'+err)
//   })
// });

// reviews.post('/delete', (req,res) =>{
//   console.log(res.body)
//   //get all review props from body
//   const {user_id,review_id} = req.body;
//   console.log(req.body)
//   console.log("Trying to delete "+review_id)
//   //save for later
//    //make reviewData object with above critera
//     const reviewData = {
//       user_id:(user_id),
//       review_id:(review_id)
        
//     }
//   console.log(reviewData)
//   //create review
//   Review.findOne({
//     where:{review_id:review_id,
//           user_id:user_id}
//   }).then((review)=>{
//     review.destroy(reviewData)
//     console.log("Review Deleted!")
//     res.send("Review Delete")
//     console.log(reviewData)
//   }).catch(err=>{
//     console.log("There was an error")
//     res.send('error:'+err)
//   })
// });


//   Review.find({where:{review_id:review_id}})
//   .on('success',update({
//   })
//   .then(review => {
//     console.log("Review Updated!")
//     res.send(review.dataValues)
//   })
//   .catch(err=>{
//     res.send('error:'+err)
//   })
// })



// reviews.get('/',(req,res) =>{
//   Review.findAll({raw: true })
//   console.log("Getting Reviews")
//   .then(reviews => {
//     if(reviews){
//       res.send(reviews)
//     }else{
//       res.status(400).json({error:"No Reviews to load"})
//     }
//   })
// })

    



  module.exports=reviews