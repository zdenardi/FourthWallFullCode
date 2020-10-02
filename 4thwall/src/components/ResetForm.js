import React,{useEffect,useState} from 'react';
import useForm from 'react-hook-form'
import {Container} from 'react-bootstrap'
import axios from 'axios'
import LinkButton from '../components/utilcomponents/LinkButton'



const ResetForm= ({match}) => {
   const {register, handleSubmit} = useForm();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isUpdate,setIsUpdate] = useState(null);
   const [isLoading,setIsLoading] = useState(false);
   const [error,setError] = useState(false);
   const [token, setToken] = useState(match.params.token);


   useEffect (() => {
      async function resetPassword() {
         axios.get('/users/reset', {
            params:{
               resetPasswordToken: token
            },
         })
         .then(res => {
            if (res.data.message === 'password reset link ok'){
               setEmail(res.data.email);
               setIsUpdate(false);
               setIsLoading(false);
               setError(false);
            } else {
               setIsUpdate(false);
               setIsLoading(false);
               setError(true);
            }
         }).catch(err =>{
            console.log(error.data);
         });
      }
      resetPassword();
   },[]);



   const resetPassword= e => {

      axios
         .put('/users/updatePasswordViaEmail', {
            email: email,
            password: password
         })
         .then (res => {
            console.log(res.data);
            if (res.data.message === 'password updated'){
               setIsUpdate(true);
               setError(false);
            }else {
               setIsUpdate(false);
               setError(true);
            }
            
         }).catch(err => {
            console.log(err.data)
         })
   };



//Rendering
      if(error){
         return(
            <Container>
               <h4>Problems resetting password. Please send another reset link</h4>
            </Container>
         )
      } else if (isLoading){
         return(
            <Container>
               <p> Loading User Data...</p>
            </Container>
            )
      } else {
         return(<React.Fragment>

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
                           <form onSubmit={handleSubmit(resetPassword)} method="post" name="register">
                              <div class="form-group">
                                 <input type="password" 
                                       name="passwordField"  
                                       class="form-control my-input" 
                                       id="passwordField" 
                                       placeholder="New Password" 
                                       value={password} 
                                       onChange={(event) => setPassword(event.target.value)}  ref={register({required:true})}/>
                              </div>    
                              <div class="text-center ">
                                 <button type="submit"
                                 class=" btn btn-block send-button btn-primary">
                                 Update Password
                                 </button>
                              </div>
                           </form>
                           {isUpdate && (
                              <Container>
                                 <p>
                                    Your password has been successfully reset, please try logging in again.
                                 </p>
                                 <LinkButton to="Login" class="btn btn-primary">Login</LinkButton>

                              </Container>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </React.Fragment>
            );

      }
      
   }


   


export default ResetForm;