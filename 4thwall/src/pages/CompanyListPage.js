import React,{useState,useEffect} from 'react';
import CompanyList from '../components/CompanyList'

const CompanyListPage =() => {
  const [companiesInfo, setCompaniesInfo] = useState([])


  

  useEffect(() => {
    const fetchData = async() => {        
        const response = await fetch('/api/companies');
        const bodyCompanies = await response.json();
        setCompaniesInfo(bodyCompanies.data)
    }
    fetchData()
  },[])
  const companies = companiesInfo
  console.log(companiesInfo)

  return(
    <React.Fragment>
    <CompanyList companies = {companies}/>


    </React.Fragment>

  )
}

export default CompanyListPage