import React,{useState} from 'react'

const ReviewContext = React.createContext([{}, () => {}]);

const ReviewProvider = (props) =>{    
  
  const [review, setReview] = useState({});
  console.log("context loading")

  return(
    <ReviewContext.Provider value ={[review,setReview]}>
      {props.children}
    </ReviewContext.Provider>
  );
}

export {ReviewContext,ReviewProvider}