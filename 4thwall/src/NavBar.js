import React,{useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import {AuthContext} from './utils/AuthContext';
import {MessageContext} from './utils/MessageContext'

const NavBar = () => {
  //is the user logged in?
  const [state,setState]=useContext(AuthContext)


  const changeLogin=()=>{
      localStorage.removeItem('userToken')
      setState({loggedIn:!state.loggedIn})    
  }

  
 

return(
  
  
  
  <>
  <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">FourthWall</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to= "/">Home <span className="sr-only">(current)</span> </Link>
            </li>
            
            <li className="nav-item mx-2">
            {state.loggedIn ?
              <Link to ="#" onClick={changeLogin}>Logout</Link>
              :
              <Link to ="/Login">Login</Link>
            }
            
            </li>
            <li className="nav-item mx-2">
                <Link to ="/AddReview">Add Review</Link>        
            </li>
            <li className="nav-item mx-2">
                <Link to ="/Companies">View Companies</Link>        
            </li>
            {state.loggedIn && 
            <li className="nav-item mx-2">
                <Link to ="/profile">Profile</Link>        
            </li>
            }
          </ul>
        </div>
      </nav>
    </header>
    
  </>
  
)}
    
export default NavBar