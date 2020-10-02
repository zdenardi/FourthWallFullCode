import React,{useEffect,useState} from 'react';
import CompanyDetail from "../components/CompanyDetail"
import ReviewsList from '../components/ReviewsList';


const CompanyDetailPage =({match}) => {
  const id = match.params.id
  console.log(id)

  const [reviewsInfo,setReviewsInfo] =useState([]);
  const [companiesInfo,setCompaniesInfo] = useState([]);




  useEffect(() => {
    const fetchData = async() => {

        const reviews = await fetch(`/api/reviews/companies/${id}`)
        const bodyReviews = await reviews.json();
        const companyres = await fetch(`/api/companies/company/${id}`)
        const bodyCompRes = await companyres.json();


            
        setReviewsInfo(bodyReviews.data)
        setCompaniesInfo(bodyCompRes.data)
    }
    fetchData()
  },[])
  
  const reviews = reviewsInfo
  const company = companiesInfo
  return(
  <React.Fragment>
  <CompanyDetail company={company}/>
  <ReviewsList reviews={reviews}/>
  </React.Fragment>
  

)
  }
export default CompanyDetailPage