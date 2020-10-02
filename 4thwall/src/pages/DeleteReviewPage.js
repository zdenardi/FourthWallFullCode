import React, {useState, useEffect,useContext} from 'react';
import ReviewDelete from '../components/ReviewDelete';
import {Redirect} from 'react-router-dom'
import {MessageContext} from '../utils/MessageContext';



const EditReviewPage =({match}) => {
  const id = match.params.id
  const [reviewInfo,setReviewInfo] =useState({});
  const [isLoaded,setIsLoaded]=useState(false)
  const [message,setMessage]=useContext(MessageContext)
 
  
  useEffect(() => {
    const fetchData = async() => {
      const result = await fetch(`/api/reviews/review/${id}`)
      const body = await result.json();
      setReviewInfo(body.data)     
    }
    if(isLoaded===false){ 
      fetchData();
      setIsLoaded(true)
    }
  },[isLoaded])
 
 const review = reviewInfo


  if(!review){
    setMessage(message => ({ ...message, alert: 'Error:Review does not exist',type:"danger" }))
    return(
      
    <Redirect to="/profile"></Redirect>
    )
  }

  return(
    
  <React.Fragment>
  
    <ReviewDelete review ={review}/>
  </React.Fragment>

  );
}
export default EditReviewPage