import React, {useState, useEffect} from 'react';
import ReviewDetail from '../components/ReviewDetail';


const DetailReviewPage =({match}) => {
  const id = match.params.id
  
  const [reviewInfo,setReviewInfo] =useState({});


  useEffect(() => {
    const fetchData = async() => {
        const result = await fetch(`/api/reviews/review/${id}`)
        const body = await result.json();
        setReviewInfo(body.data)
    }
    fetchData()
  },[id])
  const review = reviewInfo;


  return(
  <React.Fragment>
  
    <ReviewDetail review={review}/>
  </React.Fragment>

  );
}
export default DetailReviewPage