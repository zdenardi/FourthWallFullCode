import React,{useState} from 'react';
import useForm from 'react-hook-form'
import {registerUser} from './UserFunctions'
import {Redirect} from 'react-router-dom'



const Register= ({}) => {
   const {register, handleSubmit} = useForm();
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const [isRegistered, setIsRegistered] = useState(false)

   const userLogin=() => {
      const newUser ={
         email: email,
         password: password
      }
      registerUser(newUser).then(res => {
         setIsRegistered(true)
         
      })

      console.log("Button Pressed")
   };


   if (isRegistered === true){
      return(
         <Redirect to ="/login"></Redirect>
      )
   }else {
      return(<React.Fragment>

         <div class="container">
               <div class="col-md-6 mx-auto text-center">
                  <div class="header-title">
                     <h1 class="wv-heading--title">
                        Create Account!
                     </h1>
                     <p class="wv-heading--subtitle">
                        We promise to keep your anonymity. Your email will only be used to verify you're not a bot. All reviews are posted anonymously. 
                     </p>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-4 mx-auto">
                     <div class="myform form ">
                        <form onSubmit={handleSubmit(userLogin)} method="post" name="register">
                           <div class="form-group">
                              <input type="email" name="emailField"  class="form-control my-input" id="emailField" value={email} onChange={(event) => setEmail(event.target.value)}  ref={register({required:true})} placeholder="Email"/>
                           </div>
                           <div class="form-group">
                              <input type="password" name="passwordField"  class="form-control my-input" id="passwordField" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}  ref={register({required:true})}/>
                           </div>
                           
                           <div class="text-center ">
                              <button type="submit" class=" btn btn-block send-button btn-primary">Create Your Free Account</button>
                           </div>
                           
                           <p class="small mt-3">By signing up, you are indicating that you have read and agree to the <a href="#" class="ps-hero__content__link">Terms of Use</a> and <a href="#">Privacy Policy</a>.
                           </p>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment>
         );
   }


   
}

export default Register;