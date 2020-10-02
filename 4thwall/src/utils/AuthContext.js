import React,{useState} from 'react'


//creating context
const AuthContext = React.createContext([{}
,()=>{}]);

const AuthContextProvider = (props)=>{
  //Creating state object that will have multiple objects
  const [state,setState] = useState({});

 
  return(
    <AuthContext.Provider value={[state,setState]}>
      {props.children}
    </AuthContext.Provider>
  );
}
export {AuthContext,AuthContextProvider}