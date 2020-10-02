import axios from 'axios';
import qs from 'querystring'


export const registerUser = newUser =>{
  
  
  const reqBody = {
    email: `${newUser.email}`,
    password: `${newUser.password}`
  }
  const config ={
    headers:{
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return axios
  .post('/users/register',qs.stringify(reqBody),config)
  .then(res => {
    console.log(res)
    console.log("Registered")
  })

}

export const loginUser = user => {
  const reqBody = {
    email: `${user.email}`,
    password: `${user.password}`
    }
    const config ={
      headers:{
        'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return axios
  .post('users/login' ,qs.stringify(reqBody),config)
  .then(res =>{
    console.log(res)
    if(res.data.message){
      return (res)
    }else {
    localStorage.setItem('userToken', res.data)
    return (res)}
  })
  .catch(err=> {
    console.log(err)    
    return("There was a problem")
    })
}
export const addReview = review =>{
  console.log(review);
  const reqBody = {
    review_id:review.review_id,
    user_id: review.user_id,
    company_id:review.company_id, 
    date: review.date,
    role: review.role,
    profRating: review.profRating, 
    worthWhileRating: review.worthWhileRating, 
    rateofPay: review.rateofPay,  
    comment:review.comment,
    responseAns:review.responseAns
  }
  const config ={
    headers:{
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return axios
  .post('/api/reviews/',qs.stringify(reqBody),config)
  .then(res => {
    console.log("Trying to add review... ")
    return(res)
  })
  .catch(err=> {
    console.log(err)    
    return("There was a problem")
    })

}
  
export const editReview = review =>{
  //check to see if role is a number, find in array and get value and pass it.
  console.log(review)
  if (isNaN(review.role)){
    const ROLES=["Actor","Designer","Director","Production"]
    const givenRoleValue=ROLES.indexOf(review.role)
    review.role=givenRoleValue
  }

  const reqBody = {
    review_id:review.review_id,
    company_id:review.company_id, 
    date: review.date,
    role: review.role,
    profRating: review.profRating, 
    worthWhileRating: review.worthWhileRating, 
    rateofPay: review.rateofPay,  
    comment:review.comment,
    responseAns:review.responseAns
  }
  const config ={
    headers:{
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return axios.put(`/api/reviews/review/${review.company_id}`,qs.stringify(reqBody),config)
  .then(res => {
    console.log(res)
    return(res.data)
  });
}

export const deleteReview = review =>{
  console.log(review);
  const reqBody = {
    user_id: review.user_id,
    review_id: review.review_id
  }
  const config ={
    headers:{
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return axios
  .delete(`/api/reviews/review/${review.review_id}`,qs.stringify(reqBody),config)
  .then(res => {
    console.log(res)
    console.log("Review Delete")
    return(res.data)
  })

}

//adding Rep Response

export const addRepResponse = review =>{
  const reqBody = {
    response:review.response,
    review_id:review.review_id,
  }
  const config ={
    headers:{
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return axios
  .put(`/api/reviews/test`,qs.stringify(reqBody),config)
  .then(res => {
    console.log(res)
    return(res)
  });
}

export const submitSubmission = submission =>{

  console.log("Here is the submission: ", submission)
  const reqBody={
    email: submission.email,
    comment:submission.comment
  }
  const config = {
    headers:{
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return axios
  .post(`/users/rep`, qs.stringify(reqBody),config)
  .then(res=>{
    console.log(res)
    return(res)
  }).catch(err=>{
    console.log(err)
    return("There was a problem")
  })
}
