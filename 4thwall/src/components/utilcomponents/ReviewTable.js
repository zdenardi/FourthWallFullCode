import React,{useEffect,useState,useContext} from 'react'
import {Table, Container} from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../utils/AuthContext'
const ReviewTable = ({id,status}) =>{
  
  const [reviews,setReviews] = useState()
 
  useEffect(() => {
    const getReviews = () =>{
      const URL = status === "rep" ? `api/reviews/rep/${id}` : `/api/reviews/user/${id}`
     

      axios.get(URL,{
      })
      .then(({data})=>{
        console.log(data.data)
        setReviews(data.data)
      }).catch((err)=>{
        console.log(err)
        console.log(err.message)
      })    
    }
    
    getReviews()
  },[])
  if(!reviews){
    return(
      <Container>
        <p>No reviews just yet</p>
      </Container>
    )
  }



  return(
    <>
    
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Date Posted</th>
          </tr>
        </thead>
        <tbody>
        {reviews.map((review,key)=>
        
          <tr>
            <td>{review.companyName}</td>
            <td>{review.role}</td>
            <td>{moment(review.date).format("MM/DD/YYYY")}</td>
            {status ==="rep" ? 
            (<td><Link to={`/rep/${review.review_id}`}>See Review</Link></td>)
            :
            (
            <>  
            <td><Link to={`/review/edit/${review.review_id}`}>Edit</Link></td>
            <td><Link to={`/review/Delete/${review.review_id}`}>Delete</Link></td>
            </>
            )
            }
            
          </tr>
        )}        
        </tbody>
    </Table>
     
    
    </>
    
  )
}
export default ReviewTable