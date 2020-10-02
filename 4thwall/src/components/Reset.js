import React,{useState,useContext} from 'react';
import useForm from 'react-hook-form'
import axios from 'axios'
import {MessageContext} from '../utils/MessageContext'
import { Container } from 'react-bootstrap';
import  Fade  from 'react-bootstrap/Fade';



const Reset= () => {
   const {register, handleSubmit} = useForm();
   const [email, setEmail] = useState("");
   const [errors,setErrors] = useState("");
   const [resetSent,setResetSent]= useState(false);
   const [msgFromServer,setMsgFromServer]=useState('');
   const [message,setMessage]= useContext(MessageContext)
   const [isSubmit, setIsSubmit] = useState(false)
   

   const passwordReset = e =>{
      if(email === ''){
         setErrors(true)
         setMessage(message => ({ ...message, alert: 'Please enter your email!',type:"danger" }))
      }else{
         setIsSubmit(true)
         axios
         .post('/users/forgotPassword',{
            email: email,
         })
         .then(res => {
            
            if(res.data ==='email not in db'){
               setErrors(true)
               setMsgFromServer('')
            } else if (res.data ==='recovery email sent'){
               
               setErrors(false)
               
            }
         })
         .catch(error=>{
            setMessage({ ...message, alert: 'Uhoh...we had a problem. Please contact the Administrator',type:"danger" })
         })
      }
   }
  
   return(
      <React.Fragment>
         <div class="container">
            <div class="col-md-6 mx-auto text-center">
               <div class="header-title">
                  <h1 class="wv-heading--title">
                     Password Reset
                  </h1>
               </div>
            </div>
            <div class="row">
               <div class="col-md-4 mx-auto">
                  <div class="myform form ">
                     <form onSubmit={handleSubmit(passwordReset)} method="post" name="reset">
                        <div class="form-group">
                           <input type="email" name="emailField"  class="form-control my-input" id="emailField" value={email} onChange={(event) => setEmail(event.target.value)}  placeholder="Input your email" ref={register({required:true})}/>
                        </div>
                        
                        <div class="text-center ">
                           <button  type="submit" class=" btn btn-block send-button btn-primary">Reset Password</button>
                        </div>
                     </form>                  
                  </div>
               </div>
            </div>
            {isSubmit && 
               <Fade in ={isSubmit}>
                  <Container className="col-md-6 mx-auto text-center">
                     <p> If your email is the database, you will revieve and email shortly. Please check your inbox and follow instructions there.</p>
                  </Container>
               </Fade>
            }
                 
               
            
            
         </div>
      </React.Fragment>
   )
}
export default Reset;