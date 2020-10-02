import React from 'react';
import reviews from './data/reviews-content'
import {Link} from 'react-router-dom'

const ListReview =() => (
  <React.Fragment>
  <h1>Reviews</h1>
  {reviews.map((review,key) => (
    <h3>{review.companyName}</h3>
    )
  )}


  </React.Fragment>

)
export default ListReview