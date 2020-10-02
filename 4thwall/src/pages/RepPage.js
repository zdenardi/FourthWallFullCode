import React, {useState, useEffect,useContext} from 'react';
import {Redirect} from 'react-router-dom'
import AddRep from '../components/AddRepResponse';
import {AuthContext} from '../utils/AuthContext';
import {Spinner} from 'react-bootstrap'



const RepPage =({match}) => {
  const id = match.params.id
  const [reviewInfo,setReviewInfo] =useState({});
  const [isLoaded,setIsLoaded]=useState(false)
  const [state,setState]=useContext(AuthContext)

  
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
    return(
      
    <React.Fragment>
        {(!state.loggedIn ? <Redirect to = "/login"/> :null)}
        {!isLoaded ? <Spinner animation="grow"/>
        :
        <AddRep review = {review}/>
        }      
    </React.Fragment>

    );
  }

export default RepPage