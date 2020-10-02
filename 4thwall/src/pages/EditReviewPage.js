import React, {useState, useEffect,useContext} from 'react';
import {Redirect} from 'react-router-dom'
import ReviewEdit from '../components/ReviewEdit';
import {AuthContext} from '../utils/AuthContext';
import {Spinner} from 'react-bootstrap'



const EditReviewPage =({match}) => {
  const id = match.params.id
  const [reviewInfo,setReviewInfo] =useState({});
  const [companiesInfo,setCompaniesInfo]=useState([]);
  const [isLoaded,setIsLoaded]=useState(false)
  const [state,setState]=useContext(AuthContext)

  
  useEffect(() => {
    const fetchData = async() => {
      const result = await fetch(`/api/reviews/review/${id}`)
      const body = await result.json();
      setReviewInfo(body.data)

      const companies = await fetch('/api/companies');
      const bodyCompanies = await companies.json();
      
      setCompaniesInfo(bodyCompanies.data)
    }
    if(isLoaded===false){ 
      fetchData();
      setIsLoaded(true)
    }
  },[isLoaded])
  const companies = companiesInfo
 
 const review = reviewInfo



    return(
      
    <React.Fragment>
        {(!state.loggedIn ? <Redirect to = "/login"/> :null)}
        {!isLoaded ? <Spinner animation="grow"/>
        :
        <ReviewEdit review = {review} companies= {companies}/>
        }

      
    </React.Fragment>

    );
  }

export default EditReviewPage