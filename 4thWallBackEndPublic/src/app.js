var express =require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors')
var app = express();
var http = require('http')
const https = require('https');
const fs = require('fs');

import path from 'path';
//init passport




app.use(cors());
app.use(passport.initialize());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//to parse
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'build')))




var connection = require('./connection').connection
var Users = require('../routes/Users');
app.use('/users',Users)
var Reviews = require('../routes/Reviews')
app.use('/api/reviews',Reviews)
var Companies = require('../routes/Companies')
app.use('/api/companies',Companies)
//**TODO- ADD REVIEW ROUTES LIKE USER ROUTES/
var ReviewsTest = require('../routes/ReviewsSeq')
app.use('/test/',ReviewsTest)



const getReviewbyId=(id,res)=>{
  connection.query(`SELECT reviews.review_id,reviews.user_id,reviews.company_id,reviews.date,reviews.role,reviews.profRating,reviews.worthWhileRating,reviews.rateofPay,reviews.comment,theatercompanies.companyName FROM reviews LEFT JOIN theatercompanies USING(company_id) WHERE reviews.review_id = ${id}`,(err,results,fields) => {
    if(!err){
          res.send({data:results});
       
    }else{
      console.log(err.message)
    }
  })
}
const helpfulUp=(id,res) =>{
  connection.query({
    sql:`UPDATE reviews SET helpfulcount = helpfulcount + 1 WHERE id = "${id}"`
  },(err,results,fields) =>{
    if(!err){
      getReviewbyId(id,res)
    }else{
      res.send(err.message)
    }

  })

}
const helpfulDown=(id,res) =>{
  connection.query({
    sql:`UPDATE reviews SET helpfulcount = helpfulcount - 1 WHERE id = "${id}"`
  },(err,results,fields) =>{
    if(!err){
      getReviewbyId(id,res)
    }else{
      res.send(err.message)
    }

  })

}

const SELECT_ALL_REVIEWS_WITH_COMPANY_JOIN = "SELECT reviews.review_id,reviews.role,reviews.profRating,reviews.worthWhileRating,reviews.rateofPay,reviews.comment,theatercompanies.companyName FROM reviews LEFT JOIN theatercompanies USING(company_id)"
const SELECT_ALL_REVIEWS_QUERY = 'SELECT * FROM reviews;'
const SELECT_ALL_THEATERCOMPANIES_QUERY = 'SELECT * FROM theatercompanies;'

// const DELETE_REVIEW_QUERY = `DELETE FROM 'reviews' WHERE id = ${id};`
// const UPDATE_REVIEW_QUERY = `UPDATE 'reviews' SET companyName = '${companyName}',date = '${date}',role='${role}',proRating='${prorating},worthWhileRating='${worthwhilerating}',rateofPay='${rateofpay}',comment='${comment}' where id = ${id};`


app.get('/api/reviews/:id', (req,res) => {
  console.log(req.params)
  const id = req.params.id;
  const tbl = "reviews";
  
  
  getReviewbyId(id,res)
  
});

//Helpful post
app.post('/api/reviews/:id/helpful',(req,res) =>{
  const reviewId = req.params.id;
  helpfulUp(reviewId,res)
})

//Add Comment
app.post('/api/reviews/:id/add-comment',(req,res) =>{
  const review = reviews[req.params.id];
  const {comment} = req.body;
  review.comments.push({comment});
  res.status(200).send(review)
})
//add Review


// app.post('/api/review/add', (req,res) =>{
//   const {user_id,company_id,date,role,profRating,worthWhileRating,rateofPay,comment} = req.body;
//   const sql = "INSERT INTO reviews(user_id,company_id,date,role,profRating,worthWhileRating,rateofPay,comment)VALUES"+`('${user_id}','${company_id}','${date}','${role}','${profRating}','${worthWhileRating}','${rateofPay}','${comment}');`;

//     connection.query(sql,(err,results) => {
//       console.log("Trying to add review....")
//       const test = results.toString()
//       console.log("Here are the results "+{test})
//       if(!err){
//         res.send("Added!" + results);
      
//       }else{
//         {console.log("Error")}
//       }
      
//       }
//     )
//   }
// );

app.get('api/review/delete/:id', (req,res) =>{
const review = [req.params.id]
})


app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname + '/build/index.html'));
})

// https.createServer({
//   key: fs.readFileSync(path.join(__dirname,'./') + './key.pem', "utf8"),
//   cert: fs.readFileSync(path.join(__dirname,'./') + './cert.pem', "utf8"),
//   passphrase: 'zd911372!'
// }, app).listen(8001,() => console.log("Listening on 8001"))

// http.createServer((req,res)=>{
//   res.writeHead(301, {"Location": "https://"+req.headers['host']+req.url});
//   res.end();
// }).listen(8000)
  


module.exports = app;