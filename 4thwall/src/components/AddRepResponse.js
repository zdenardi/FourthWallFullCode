import React,{useState,useContext,useEffect} from 'react'
import useForm from 'react-hook-form'
import moment from 'moment';
import {AuthContext} from '../utils/AuthContext'
import {addRepResponse} from './UserFunctions'
import LinkButton from "./utilcomponents/LinkButton"
import {Container,Row,Form,Col,Spinner,Button,Card} from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import {MessageContext} from '../utils/MessageContext'
import ReviewDetail from './ReviewDetail'
const token = localStorage.getItem('userToken')

  const AddRepResponse = ({review,companies}) => {          
    const {register,handleSubmit} = useForm();
    const [state,setState]= useContext(AuthContext)
    const [message,setMessage]=useContext(MessageContext)
    const [edited,setEdited]=useState(false)
    let m = moment();
    const MYSQLDate = m.format('YYYY-MM-DD HH:mm:ss');
    const numbers = [1, 2, 3, 4, 5];
    const ROLES=["Actor","Designer","Director","Production"]
    const givenRoleValue=ROLES.indexOf(review.role)


    const reviewHandler=() => { 
      
      //need to make this editResponse
      addRepResponse(review).then(res => {
        console.log("Here is the res : ",res)
        setMessage(message => ({ ...message, alert: 'Response Added!',type:"success" }))
        setEdited(true)
        
        })  
      } 

  if (edited === true){
    return(
    <Redirect to ={`/`}></Redirect>
    )}


  
  return(
      <React.Fragment>
      {/* Need to make this if company.user_id =! user_id */}
      {/* {state.id != review.user_id && <Redirect to="/profile"/>} */}
      {/* Review Details */}
      <Container className="text-center p-5">
       <ReviewDetail review={review}/>
      </Container>
      <Container>
        <Card className="card mx-auto mt-2" style={{width: 400}}>
        <Card.Header>
        <Row>
          <Container className="text-center">
            <h6>Your Current Response</h6>          
            </Container>        
        </Row>
        </Card.Header>
        <Card.Body>
          <p>{review.response ? review.response : "You currently have not responded to this review"}</p>
        </Card.Body>
        </Card>
      </Container>
      
      {/* Add Response Form */}      
        <Container className="text-center p-5">
          <Form onSubmit={handleSubmit(reviewHandler)} className="form-horizontal">
            <Form.Group controlId="formEditReview">
              {/* <!-- Comments --> */}
              <Form.Group>
                <Form.Label className="col-md-4 control-label" for="input">Add your response to the review here:</Form.Label>  
                  <Col className="col-md-4 mx-auto">
                <Form.Control 
                      id="inputComment"
                      name="Comment"
                      as="textarea" 
                      className = "form-control input-md" 
                      onChange={(event)=>(review['response']=event.target.value)}
                      ref={register}
                      />
                </Col>
              </Form.Group>
              
               
          </Form.Group>
          <Col className="col-md-4 mx-auto">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                </Col>
                <LinkButton to="/profile" class="btn btn-primary m-2">Back To List</LinkButton>    
        </Form>
          
           </Container>
    </React.Fragment>
  
  )
}


export default AddRepResponse