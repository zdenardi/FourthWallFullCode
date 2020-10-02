import React,{useState,useEffect, forwardRef} from 'react'
import {Form,Dropdown} from 'react-bootstrap'

const ComboBox = ({companies}) =>{
  const [query,setQuery] = useState("");
  const [searchResults, setSearchResults]=useState(companies)

  const handleChange = e =>{
    setQuery(e.target.value)
  }

  useEffect(()=>{
    if(query===""){
      setSearchResults(companies)
    }
    const results = companies.filter(company =>
      company.companyName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  },[query,companies]);


  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));
  

  return (
    <>
    <Dropdown>

    </Dropdown>
    </>
  )
}
export default ComboBox