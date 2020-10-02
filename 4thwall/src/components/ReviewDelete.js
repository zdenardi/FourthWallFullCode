import React,{useState,useContext} from 'react';
import {Redirect} from 'react-router-dom'
import LinkButton from './utilcomponents/LinkButton'
import {deleteReview} from './UserFunctions'
import jwt_decode from 'jwt-decode'
import {MessageContext} from '../utils/MessageContext';
import {AuthContext} from '../utils/AuthContext';
import {Card,
        Button,
        Container,
        Row,
        Col,
        Spinner} from 'react-bootstrap'



const ReviewDetail= ({review}) => {
 
  let{review_id}=review
  const [isDeleted,setIsDeleted]=useState(false)
  const [message,setMessage]=useContext(MessageContext)
  const [state,setState]=useContext(AuthContext)

  
  

  const handleClick=()=>{
    const review={
      review_id:review_id,
      user_id:state.id
        }
    deleteReview(review).then(res=>{
    })
    setMessage(message => ({ ...message, alert: 'Review Deleted!',type:"danger" }))

    setIsDeleted(true)
  }
  
  
  if(isDeleted===true ){
    return(
    <Redirect to="/profile"></Redirect>
    )
  }
  if(!review.user_id)
  return(
    <>
    <Container className="justify-content-center">
     <Spinner animation="grow"/>
    </Container>
    </>
  )
  return(
    
    <React.Fragment>
    {(!state.loggedIn ? <Redirect to = "/login"/> :null)}
    {state.id != review.user_id && <Redirect to="/profile"/>}
   
    <Container className="text-center pb-2 pt-2">
      <h1>Delete a review</h1>
    </Container>
        <Card className="card mx-auto mt-2" style={{width: 400}}>
          <Card.Header>
          <Row>
            <Container className="text-center">
              <h5>{review.companyName}</h5>
              <h6 class="text-center">Pay: {review.rateofPay}</h6>
            </Container>        
          </Row>
          </Card.Header>
              <Card.Body>
                <Card.Title>
                  <h5 className="text-center">Role: {review.role}</h5>
                </Card.Title>
                  <Card.Text>
                    <p>{review.comment}</p>
                  </Card.Text>
                  <Container className="d-flex justify-content-center">
                    <Button 
                    variant="danger"
                    class="m-2"
                    onClick={handleClick}>Delete</Button>
                  </Container>
                  <Container className="d-flex justify-content-center">
                    <LinkButton to="/profile" class="btn btn-primary m-2">Back To List</LinkButton>
                  </Container>
              </Card.Body>
            <Card.Footer>
              <Row>
                <Col className="text-left">
                  <p> Professional Rating:{review.profRating}/5</p>
                </Col>
                <Col className="text-right">
                  <p> WorthWhile Rating:{review.worthWhileRating}/5</p>
                </Col>
              </Row>
            </Card.Footer>
        </Card>
    </React.Fragment>
  );
}

export default ReviewDetail;