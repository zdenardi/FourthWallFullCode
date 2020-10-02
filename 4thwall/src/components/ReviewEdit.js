import React,{useState,useContext,useEffect} from 'react'
import useForm from 'react-hook-form'
import moment from 'moment';
import {AuthContext} from '../utils/AuthContext'
import {editReview} from './UserFunctions'
import LinkButton from "./utilcomponents/LinkButton"
import {Container,Row,Form,Col,Spinner,Button,Tooltip,OverlayTrigger,Badge} from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import {MessageContext} from '../utils/MessageContext'
const token = localStorage.getItem('userToken')

  const ReviewEdit = ({review,companies}) => {
    const {register,handleSubmit} = useForm();
    const [state,setState]= useContext(AuthContext)
    const [message,setMessage]=useContext(MessageContext)
    const [edited,setEdited]=useState(false)
    let m = moment();
    const MYSQLDate = m.format('YYYY-MM-DD HH:mm:ss');
    const numbers = [1, 2, 3, 4, 5];
    const ROLES=["Actor","Designer","Director","Production"]
    const givenRoleValue=ROLES.indexOf(review.role)
    const [resBol,setResBol] = useState(false)


    const profNumbers = numbers.map((number) =>{
      if(number === review.profRating){
        return(
          <Form.Check 
          inline 
          label={number}
          name="profRating"
          type="radio" 
          value={number}
          onChange={(event) => (review['profRating']=event.target.value)}
          ref={register({required:true})}
          defaultChecked
              
        />

        )
      }
      
      return(
      <Form.Check 
        inline 
        label={number}
        name="profRating"
        type="radio" 
        value={number}
        onChange={(event) => (review['profRating']=event.target.value)}
        ref={register({required:true})}
            
      />
      )
    });
    const worthWhileNumbers = numbers.map((number) =>{
      if(number === review.worthWhileRating){
        return(
          <Form.Check 
          inline 
          label={number}
          name="worthWhileRating"
          type="radio" 
          value={number}
          onChange={(event) => (review['worthWhileRating']=event.target.value)}
          ref={register({required:true})}
          defaultChecked
        />

        )
      }
      
      return(
      <Form.Check 
        inline 
        label={number}
        name="worthWhileRating"
        type="radio" 
        value={number}
        onChange={(event) => (review['worthWhileRating']=event.target.value)}
        ref={register({required:true})}
            
      />
      )
    });
    const checkRespondable = () =>{
      if (parseInt(review.responseAns) != 1 ){
        return(
          <Form.Check
                type="checkbox"
                id="responseAns"
                label="Are you okay with a Representative from this theater publically respond to this review?"
                onChange={(event)=>(review['responseAns']='1')}

                />
        )
      }else{
        return(
        <Form.Check
          type="checkbox"
          defaultChecked
          id="responseAns"
          label="Are you okay with a Representative from this theater publically respond to this review?"
          onChange={(event)=>(review['responseAns']='0')}

          />)
      }
    }

    function responseAnsToolTip(props){
      return <Tooltip {...props}>A Representative of the Theater would be answer publically about this review. They would not be able ot see your email or be able to personally contact you in anyway.</Tooltip>
    }
 




    const reviewHandler=() => { 
   
      editReview(review).then(res => {
        setMessage(message => ({ ...message, alert: 'Review Edited!',type:"success" }))
        setEdited(true)
        
        })  
      } 

  if (edited === true){
    return(
    <Redirect to ={`/review/${review.review_id}`}></Redirect>
    )}


  if(!review.user_id){
    return (
      <>
     <Container className="justify-content-center">
      <Spinner animation="grow"/>
    </Container>
      </>
    )
  }
  return(
      <React.Fragment>
      {state.id != review.user_id && <Redirect to="/profile"/>}

      
      
        <Container className="text-center">
          <Form  onSubmit={handleSubmit(reviewHandler)} className="form-horizontal">
            <Form.Group controlId="formEditReview">
              {/* <!-- Form Name --> */}
              <legend>Edit Review</legend>
              {/* <!-- Select Basic --> */}
              <Form.Group>
                <Form.Label className="col-md-4 control-label">Company</Form.Label>
                  <Col className="col-md-4 mx-auto">
                    <Form.Control 
                      as="select"
                      id="CompanySelect" 
                      name="CompanySelect"  
                      onChange={(event) => (review['company_id']=event.target.value)} 
                      ref={register({required:true})}>
                      <option value={review.company_id}>{review.companyName}</option>
                      {companies.map((company,key)=>
                      <option key={key}value={company.company_id}>{company.companyName}</option> 
                    )}
                    
                  </Form.Control>
                </Col>
                </Form.Group>            
              {/* <!-- Select Basic --> */}
              <Form.Group>
                  <Form.Label className="col-md-4 control-label" for="roleSelect" >Role</Form.Label>
                  <Col className="col-md-4 mx-auto">
                    <Form.Control as="select" 
                                  id="roleSelect" 
                                  name="Role" 
                                  className="form-control" 
                                  defaultValue={ROLES[givenRoleValue]} 
                                  ref={register({required:true})} 
                                  onChange = {(event) => (review['role']=event.target.value)}>
                      <option value = {givenRoleValue}>{review.role}</option>
                      <option value={0}>Actor</option>
                      <option value={1}>Designer</option>
                      <option value={2}>Director</option>
                      <option value={3}>Production</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
              
            
              
              {/* <!-- Professional Rating */}
              <Form.Group>
              
                <Form.Label className="col-md-4 control-label" for="ratingProfessional">Professionalism</Form.Label>
                        <div>
                        {profNumbers}
                        </div>               
                </Form.Group>
                  
              
              {/* <!-- WorthWhile --> */}
              <Form.Group>
              <Form.Label className="col-md-4 control-label" for="ratingProfessional">WorthWhile</Form.Label>
                        <div>
                        {worthWhileNumbers}
                        </div>               
              </Form.Group>
              
              
              {/* <!-- Rate of Pay--> */}
              <Form.Group>
                <Form.Label className="col-md-4 control-label" for="inputPay">Rate of Pay</Form.Label>  
                  <Col className="col-md-4 mx-auto">
                <Form.Control 
                      id="inputpay" 
                      name="RateOfPay"
                      as="textarea"  
                      className = "form-control input-md" 
                      onChange={(event)=>(review['rateofPay']=event.target.value)}
                      ref={register}
                      defaultValue={review.rateofPay} 
                      />
        
                  <span className="help-block">Not required </span>  
                </Col>
              </Form.Group>
              
              {/* <!-- Comments --> */}
              <Form.Group>
                <Form.Label className="col-md-4 control-label" for="input">Comments:</Form.Label>  
                  <Col className="col-md-4 mx-auto">
                <Form.Control 
                      id="inputComment"
                      defaultValue={review.comment} 
                      name="Comment"
                      as="textarea" 
                      className = "form-control input-md" 
                      onChange={(event)=>(review['comment']=event.target.value)}
                      ref={register}
                      />
                </Col>
              </Form.Group>
              
               
          </Form.Group>
              <Form.Group>
              <div>
                {checkRespondable()}
              </div>      
              <OverlayTrigger
                  placement="center"
                  delay={{ show: 250, hide: 400 }}
                  overlay={responseAnsToolTip}
                >
                  <Badge className="p3" pill variant="info">?</Badge>
                </OverlayTrigger>    

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


export default ReviewEdit