import React,{useState,useContext} from 'react';
import {Link,Redirect} from 'react-router-dom'
import useForm from 'react-hook-form'
import {loginUser} from './UserFunctions'
import {Alert} from 'react-bootstrap'
import LinkButton from './utilcomponents/LinkButton'
import {AuthContext} from '../utils/AuthContext';
import jwt_decode from 'jwt-decode'



const Login= ({}) => {
   const {register, handleSubmit} = useForm();
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const [errors,setErrors] = useState();
   const [state,setState]= useContext(AuthContext)
   const userLogin=() => {
      const user ={
         email: email,
         password: password
      }
      loginUser(user).then(res => {
         if(res ==="There was a problem"){ 
            setErrors("Hmm...you want to try that again?")
         }else{
            const token = localStorage.getItem('userToken')
            const decoded = jwt_decode(token)
            const email = decoded.email;
            const id = decoded.user_id;
            const status = decoded.status;
           
            setState({loggedIn:true,id:id,email:email,status:status})
         }
         
      })

   };

   return(
   
   <React.Fragment>
   {state.loggedIn && <Redirect to ="/"></Redirect> }

   <div className="container">
         <div className="col-md-6 mx-auto text-center">
            <div className="header-title">
               <h1 className="wv-heading--title">
                  Login
               </h1>
               <p className="wv-heading--subtitle">
                  We promise to keep your anonymity. Your email will only be used to verify you're not a bot. All reviews are posted anonymously. 
               </p>
            </div>
         </div>
         <div className="row">
            <div className="col-md-4 mx-auto">
               <div className="myform form ">
                  <form onSubmit={handleSubmit(userLogin)} method="post" name="login">
                     <div className="form-group">
                        <input type="email" name="emailField"  className="form-control my-input" id="emailField" value={email} onChange={(event) => setEmail(event.target.value)}  placeholder="Email" ref={register({required:true})}/>
                     </div>
                     <div className="form-group">
                        <input type="password" name="passwordField"  className="form-control my-input" id="passwordField" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} ref={register({required:true})}  />
                     </div>
                     
                     <div className="text-center ">
                        <button  type="submit" className=" btn btn-block send-button btn-primary">Login</button>
                     </div>
                  </form>                  
               </div>
               <div className="container text-center pt-2">
                    <Link to="/reset">I forgot my password...</Link>
               </div>
               <div className="container text-center pt-5">
                    <p>Don't have an account?</p>
                    <LinkButton className="btn btn-primary btn-sm btn-block" to="/register">Create one!</LinkButton>
               </div>
               {errors &&
                  <Alert variant="danger">Hmm...there was a problem....Try again?</Alert>
               }
            </div>
         </div>
      </div>
   </React.Fragment>
   )
}
  

export default Login;