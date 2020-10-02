import React,{useContext,useState,useEffect} from 'react'
import {Alert} from 'react-bootstrap'
import {MessageContext} from '../../utils/MessageContext'

const FlashMessage = () => {
  const [message,setMessage] = useContext(MessageContext);
  const [show,setShow] = useState(false)
  const [isLoading,setIsLoading]=useState(true)

  useEffect(() =>{
    //making show false at load
    if(isLoading === true){
      setIsLoading(false)
    } else{      //Component Loaded
//check to see if there is a message
      if(message.alert){
        //check to see if show is true,if false set to true
          if(show===false){
            setShow(true)
          }else{
            const showTimer = setTimeout(()=>{
              setMessage({alert:null})
            },3000);
            return () =>clearTimeout(showTimer) 
          }     
      }else{
        setShow(false)
      }  
    }
  },[message.alert,isLoading,show])
 
    if (show===true){
      return(
        <>
          <Alert id="alertbox" variant={message.type}>
            <Alert.Heading>{message.alert}</Alert.Heading>
          </Alert>
        
        </>
        )

    }else {
      return null
    }
   
    
    
  
  
};

export default FlashMessage