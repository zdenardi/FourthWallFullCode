import React,{useContext,useEffect,useState} from 'react'
import {Redirect} from 'react-router-dom'

import ReviewTable from './utilcomponents/ReviewTable'
import {AuthContext} from '../utils/AuthContext';
import {Container,Col,Row,Spinner} from 'react-bootstrap'



const Profile =() => {
  const [state,setState]=useContext(AuthContext)
  const id = state.id
  const [isLoaded,setIsLoaded]= useState(false);

  const sitepermissions = () => {
      switch(state.status){
        case "rep":
          return ("Representative")
          break;
        case "user":
          return("User")
          break;
        case "admin":
          return("Administrator")
          break;
      }
  }

  useEffect(()=>{
    console.log("Is loaded")
  },[])

  if(isLoaded === false){
    setIsLoaded(true)
    return(
    <Container>
      <Spinner />
    </Container>
    )
  }

return(
  <>
        {(!state.loggedIn && <Redirect to = "/login"/>)}

  <div>
    <h3 class="text-center bg-white p-2 ml-5 mr-5"> User Profile</h3>
    <div class="container mt-3 border bg-white">
          <p>Email: {state.email}</p>
          <p>Status: {sitepermissions()}</p>
    </div>
      
    <div class="container mt-3 p-5 border bg-white">
    {state.status==="rep" && <p>Here are all the reviews that are respondable.</p>}
    <ReviewTable id={id} status={state.status}/>
    </div>
  </div>
  
  </>
  );
}



export default Profile