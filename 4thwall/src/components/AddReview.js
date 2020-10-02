import React,{useState,useContext,useEffect} from 'react'
import useForm from 'react-hook-form'
import moment from 'moment';
import {Redirect} from 'react-router-dom'
import {AuthContext} from '../utils/AuthContext';
import {MessageContext} from '../utils/MessageContext';
import {addReview} from './UserFunctions'
import {Container,Form,OverlayTrigger,
  Tooltip,Badge,Button,Alert,Spinner} from 'react-bootstrap'
import Select from 'react-select'

  const AddReview = ({setReviewInfo,companies,theaterId}) => {

    const {register, handleSubmit} = useForm();
    let m = moment();
    const MYSQLDate = m.format('YYYY-MM-DD HH:mm:ss');
    const [company_id, setcompanyid] = useState(theaterId)
    const date = MYSQLDate
    const [role, setrole] = useState("")
    const [profRating, setprofRating] = useState('')
    const [worthWhileRating, setworthWhileRating] = useState(null)
    const [rateofPay, setrateOfPay] = useState(null)
    const [comment, setComment] = useState(null)
    const [isAdded, setIsAdded]= useState(false);
    const [review, setReview]=useState({})
    const [state,setState]=useContext(AuthContext)
    const [message,setMessage] = useContext(MessageContext)
    const [responseAns,setResponseAns] = useState(false)
    const [errors,setErrors]=useState(false);

function worthWhileToolTip(props){
  return <Tooltip {...props}>Was this job worth it to you artistically/financially</Tooltip>
}


function responseAnsToolTip(props){
  return <Tooltip {...props}>A Representative of the Theater would be answer publically about this review. They would not be able ot see your email or be able to personally contact you in anyway.</Tooltip>
}
    
 const reviewHandler=() => {
   
    const review ={
      user_id:state.id,
      company_id:company_id,
      date:date,
      role:role,
      profRating:profRating,
      worthWhileRating:worthWhileRating,
      rateofPay:rateofPay,
      comment:comment,
      responseAns: responseAns
    }
    addReview(review).then(res => {
      if(res ==="There was a problem"){ 
        setErrors("Hmm...you want to try that again?")
     }else{
      setMessage(message => ({ ...message, alert: 'Review Added!',type:"success" }))
      setReview(res.data)
      setIsAdded(true)
    }
      
      
    })  

  }

    let givenCompany =  (companies.find(company=>company.company_id == theaterId)) 
  
  
  
   

                     
  if (isAdded !== false){
    
    return(
      <Redirect to ={`/review/${review.review_id}`}></Redirect>
    )
  }else if(
    state.status === "rep"){
      setMessage(message => ({ ...message, alert: `You are unable to create reviews as a Representative`,type:"warning" }))    
    return(
      <Redirect to = "/login"/>
    )
  }else{  
  return(
     
      <React.Fragment>
      {(!state.loggedIn ? <Redirect to = "/login"/> :null)}
        <Container className="text-center">
          <Form onSubmit={handleSubmit(reviewHandler)} className="form-horizontal">
              <fieldset>
                {/* <!-- Form Name --> */}
                
                <legend>Add Review</legend>

              {/* <!-- Select Basic --> */}
                {!theaterId && 
                
              <div className="form-group">
                <label className="col-md-4 control-label">Company</label>
                <div className="col-md-4 mx-auto">
                
                <Select options={(companies ? companies : [])
                  .map((company,key)=>({
                    value:company.company_id,
                    label:company.companyName,
                    key:key,
                    })
                  )}
                  onChange={(event) => setcompanyid(event.value)}
                  defaultValue={(givenCompany ? {value:0,label:"yes"} : {
                    value:0,label:"Select a company"
                   })}
                 
                />
                  
                </div>
              </div>
              }        
              {/* <!-- Select Role --> */}
              <div className="form-group">
                  <label className="col-md-4 control-label">Role</label>
                  <div className="col-md-4 mx-auto">
                    <select id="roleSelect" name="RoleSelect" className="form-control" value={role} ref={register({required:true})} onChange={(event) => setrole(event.target.value)}>
                      <option value = "">How did you work for them?</option>
                      <option value={0}>Actor</option>
                      <option value={1}>Designer</option>
                      <option value={2}>Director</option>
                      <option value={3}>Production</option>
                    </select>
                  </div>
                </div>
              
            
              
              {/* <!-- Professional Rating */}
              <div className="form-group">
                <label className="col-md-4 control-label" for="ratingProfessional">Professionalism</label>
                <div className="col-md-4 mx-auto">
                  <label className="checkbox-inline px-2" for="ratingProfessional-0">
                    <input type="radio" name="ratingProfessional" id="ratingProfessional-0" value="1" onChange={(event) => setprofRating(event.target.value)} ref={register({required:true})} />
                    1
                  </label>
                  <label className="checkbox-inline px-2" for="ratingProfessional-1">
                    <input type="radio" name="ratingProfessional" id="ratingProfessional-1" value="2" onChange={(event) => setprofRating(event.target.value)} ref={register({required:true})} />
                    2
                  </label>
                  <label className="checkbox-inline px-2" for="ratingProfessional-2">
                    <input type="radio" name="ratingProfessional" id="ratingProfessional-2" value="3" onChange={(event) => setprofRating(event.target.value)} ref={register({required:true})} />
                    3
                  </label>
                  <label className="checkbox-inline px-2" for="ratingProfessional-3">
                    <input type="radio" name="ratingProfessional" id="ratingProfessional-3" value="4" onChange={(event) => setprofRating(event.target.value)} ref={register({required:true})} />
                    4
                  </label>
                  <label className="checkbox-inline px-2" for="ratingProfessional-4">
                    <input type="radio" name="ratingProfessional" id="ratingProfessional-4" value="5" onChange={(event) => setprofRating(event.target.value)} ref={register({required:true})} />
                    5
                  </label>
                </div>
              </div>
              
              {/* <!-- WorthWhile --> */}
              <div className="form-group">
                
                <OverlayTrigger
                  placement="center"
                  delay={{ show: 250, hide: 400 }}
                  overlay={worthWhileToolTip}
                >
                <label className="col-md-4 control-label" for="ratingWorth">Worthwhile?
                <Badge className="p3" pill variant="info">?</Badge>
                </label>
                </OverlayTrigger>
                <div className="col-md-4 mx-auto">
                  <label className="checkbox-inline px-2" for="ratingWorth-0">
                    <input type="radio" name="ratingWorth" id="ratingWorth-0" value="1" onChange={(event) => setworthWhileRating(event.target.value)} ref={register}/>
                    1
                  </label>
                  <label className="checkbox-inline px-2" for="ratingWorth-1">
                    <input type="radio" name="ratingWorth" id="ratingWorth-1" value="2" onChange={(event) => setworthWhileRating(event.target.value)}ref={register}/>
                    2
                  </label>
                  <label className="checkbox-inline px-2" for="ratingWorth-2">
                    <input type="radio" name="ratingWorth" id="ratingWorth-2" value="3" onChange={(event) => setworthWhileRating(event.target.value)}ref={register}/>
                    3
                  </label>
                  <label className="checkbox-inline px-2" for="ratingWorth-3">
                    <input type="radio" name="ratingWorth" id="ratingWorth-3" value="4" onChange={(event) => setworthWhileRating(event.target.value)} ref={register}/>
                    4
                  </label>
                  <label className="checkbox-inline px-2" for="ratingWorth-4">
                    <input type="radio" name="ratingWorth" id="ratingWorth-4" value="5" onChange={(event) => setworthWhileRating(event.target.value)} ref={register}/>
                    5
                  </label>
                </div>
              </div>
              
              {/* <!-- Rate of Pay--> */}
              <div className="form-group">
                <label className="col-md-4 control-label" for="inputPay">Rate of Pay</label>  
                <div className="col-md-4 mx-auto">
                <input id="inputpay" name="inputPay" type="text" placeholder="Example: $200 stipend" className = "form-control input-md" value={rateofPay}onChange={(event)=>setrateOfPay(event.target.value)} ref={register}/>
        
                <span className="help-block">Not required </span>  
                </div>
              </div>
              
              {/* <!-- Comments --> */}
              <div className="form-group">
                <label className="col-md-4 control-label" for="commentsText">Comments:</label>
                <div className="col-md-4 mx-auto">                     
                  <textarea className="form-control" name="comment" value={comment} onChange={(event)=>setComment(event.target.value)} ref={register({required:true})}> </textarea>
                </div>
              </div>
              


              {/* ResponseAns */}
              <Form.Check
                type="checkbox"
                id="responseAns"
                label="Are you okay with a Representative from this theater publically respond to this review?"
                onChange={(event) => setResponseAns(!responseAns)}
                />
                <OverlayTrigger
                  placement="center"
                  delay={{ show: 250, hide: 400 }}
                  overlay={responseAnsToolTip}
                >
                <Badge className="p3" pill variant="info">?</Badge>
                </OverlayTrigger>             
              <Alert variant="light">I made FourthWall to help Chicago Theater Artists share their experiences with all the local houses in Chicago without any worry about being blacklisted by anyone or any company. You have total anonymity. With that comes responsibility and I ask you to not to negatively “call out” a single individual by name or title.<br/> 

              For Example – If you had a problem with an Artistic Director at a company, instead of saying “The Artistic Director made me feel…” instead say “There were people in this company who made me feel…”.
              </Alert>
              <Form.Check
                required
                type="checkbox"
                id="agreementCheck"
                label="By checking this box, you agree to follow the rules of FourthWall described above"
                />



              {/* <!-- Button --> */}
              <div className="form-group">
                <label className="col-md-4 control-label" for="btnSubmit"></label>
                <div className="col-md-4 mx-auto">
                <Button className="primary"type = "submit">Submit</Button>
                  {/* <button onClick={()=>addReview()}>Submit</button> */}
                </div>
                {errors &&
                  <Alert variant="danger">Hmm...there was a problem....Please refresh and try again</Alert>}
            </div>     
          </fieldset>
        </Form>      
      </Container>
    </React.Fragment>
     
 
  )
  }
}

export default AddReview