import React,{useState,useEffect} from 'react';
import SearchComponent from '../components/SearchComponent'
import axios from 'axios'
const API = '/api/companies'




const Search =() => 
  { 
    const [companies, setCompanies] = useState([])
    
    const getCompanies = () =>{
      axios.get('/api/companies').then(response=>{
        console.log(response)
      }).catch(err=>{
        console.log(err)
      })
    }


    useEffect(() => {
      console.log("Firing")
       getCompanies()
    },[])
  
  
  
  
  return(
    
  <React.Fragment>
  {/* <SearchComponent companies = {companies}/> */}

  </React.Fragment>

)}
export default Search