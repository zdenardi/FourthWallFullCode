import React,{useState} from 'react'

const MessageContext = React.createContext([{}, () => {}]);

const MessageProvider = (props) =>{
  const [message, setMessage] = useState({show:false});
  return(
    <MessageContext.Provider value ={[message,setMessage]}>
      {props.children}
    </MessageContext.Provider>
  );
}

export {MessageContext,MessageProvider}