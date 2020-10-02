import {useContext} from 'react';
import {MessageContext} from '../utils/MessageContext'

const useMessage = () =>{
  const [message,setMessage] = useContext(MessageContext);

  function reviewAlert(){
    setMessage(message=>({...message,message:"Review Added",type:"danger"}));
  }
  return{
    reviewAlert,
    message:message.message,
    type:message.type,
  }
};

export default useMessage;