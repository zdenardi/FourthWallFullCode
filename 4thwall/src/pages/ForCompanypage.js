import React,{useEffect,useState,useContext} from 'react';
import useForm from 'react-hook-form'
import {Container,Row,Col,Form,Alert,Button} from 'react-bootstrap'
import {Link,Redirect} from 'react-router-dom'
import {MessageContext} from '../utils/MessageContext';
import {submitSubmission} from '../components/UserFunctions'
const ForCompany =() => {

const {register, handleSubmit} = useForm()
const [email,setEmail]=useState();
const [comment,setComment]=useState();
const [errors,setErrors]=useState();
const [message,setMessage] = useContext(MessageContext)
const [isSent,setIsSent] = useState(false)


const repEmailHandler = () =>{
  const submission ={
    email: email,
    comment:comment
  }

  

  submitSubmission(submission).then(res => {
    console.log(res)
    if(res ==="There was a problem"){ 
      setErrors("Hmm...you want to try that again?")
   }else{
    setMessage(message => ({ ...message, alert: 'Submission Sent!',type:"success" }))
    console.log("Hitting this")
    setIsSent(true)
  }
    
    
  })  
}

if(isSent !== false){
  return(
    <Redirect to ={`/`}></Redirect>

  )
}

return(
  <React.Fragment>
  <Container className="p-5">
    <Row>
      <Col sm={12} md={6} ClassName="pb-5">
        <Form 
        onSubmit={handleSubmit(repEmailHandler)}>
          <Form.Group controlId="repEmailForm">
            <Form.Label> <h3>Theater Representative Application</h3></Form.Label>
            <Form.Control
            required 
            type="email" 
            placeholder="Your email"
            value={email}
            onChange={
              (event)=> setEmail(event.target.value)
            }/>
          </Form.Group>
          <Form.Group>
            <Form.Control
            required 
            type="textarea" 
            placeholder="The company you will be representing"
            value={comment}
            onChange={
              (event)=>setComment(event.target.value)
            }
            />
          </Form.Group>
            <Form.Group>
              <Form.Check required
              type="checkbox" 
              label="I have read the rules and information about the Theater Representative"/>
            </Form.Group>
            <div className="form-group">
                <label className="col-md-4 control-label" for="btnSubmit"></label>
                <div className="col-md-4 mx-auto">
                <Button className="primary"type = "submit">Submit</Button>
                  {/* <button onClick={()=>addReview()}>Submit</button> */}
                </div>
                {errors &&
                  <Alert variant="danger">Hmm...there was a problem....Please refresh and try again</Alert>}
            </div>
        </Form>
      </Col>
      <Col sm={6}>
        <p>We've heard from Theater Companies around Chicago that they want the ability to address concerns that are 
        presented in the reviews posted at FourthWall. </p>
        <br/>
        <p> To be considered for this program you must have/agree to the following</p> 
        <ul>
          <li>Understand that you will only be able to reply to the review publically without contacting the reviewer</li>
          <li>Must have an email address that has the theater that you are representing in it. (For Example: info@Fourthwall.com)</li>
          <li>Understand that reviewers can choose whether or not you can respond to their review. </li> 
        </ul>
        
        <p>If you are a Theater and want to try out the Representative Program, please fill out the form and I will get back to you.</p>
      </Col>
    </Row>
    
  </Container>
  


  </React.Fragment>

)}
export default ForCompany