import React, {useState} from "react";

const Editable = ({
  text,
  type,
  placeholder,
  children,
  ...props
}) => {
  //Manager the state to show label or input box. Default
  //label will be 
  const [isEditing,setEditing] = useState(false);

  const handleKeyDown=(event,type) => {
    //handle when key is pressed
  };


  return(
    <section {...props}>
      {isEditing ? (
        <div
        onBlur={()=>setEditing(false)}
        onKeyDown={e=>handleKeyDown(e,type)}
        >
          {children}

        </div>
      ):(
        <div
          onClick={() => setEditing(true)}
          >
            <span>
              {text || placeholder || "Editable Content"}
            </span>
          </div>
      )}
    </section>
  );
};
export default Editable;