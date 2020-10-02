import React,{useEffect, useState} from 'react';
import AddReview from '../components/AddReview'

const AddReviewPage =({match}) => {
  const [reviewInfo, setReviewInfo] = useState();
  const [companiesInfo,setCompaniesInfo] = useState([]);


  const theaterId=match.params.theaterId



  useEffect(() => {
    const fetchData = async() => {        
        const companies = await fetch('/api/companies');
        const bodyCompanies = await companies.json();    
        setCompaniesInfo(bodyCompanies.data)

    }
    fetchData()


  },[])
  const companies = companiesInfo
  const givenCompany = (companiesInfo.find(x=>x.company_id == theaterId))

  return(
    <React.Fragment>
  
    <AddReview setReviewInfo = {reviewInfo}  companies= {companies} theaterId={theaterId}/>

    </React.Fragment>

    )
}
export default AddReviewPage