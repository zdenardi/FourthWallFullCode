import React,{useEffect,useState,useContext} from 'react';
import reviewsdata from './data/reviews-content'
import ListCompanies from '../components/SearchComponent'
import {Container,Jumbotron,Row,Col,Alert} from 'react-bootstrap'
import Button from '../components/utilcomponents/LinkButton'
import {AuthContext} from '../utils/AuthContext'
import PayPalButton from '../components/PayPalButton'
import changelog from './data/changelog'
import logo from '../img/FourthWall.png'

const HomePage =() => {
  const [reviewsInfo,setReviewsInfo] =useState([]);
  const [companiesInfo,setCompaniesInfo] = useState([]);
  const [state,setState]=useContext(AuthContext)
  const [totalReviews,setTotalReviews]=useState();
  console.log(changelog)




  useEffect(() => {
    const fetchData = async() => {
        const reviews = await fetch(`/api/reviews/`)
        const bodyReviews = await reviews.json();
        const companies = await fetch('/api/companies');
        const bodyCompanies = await companies.json();
        
            
        setReviewsInfo(bodyReviews.data)
        setCompaniesInfo(bodyCompanies.data)
        setTotalReviews(bodyReviews.total)
        
    }
    fetchData()
  },[])
  const companies = companiesInfo
  return(

  <React.Fragment>
   {/* <Jumbotron fluid id="homePageJumbo" className="mt-4"> */}
      <Container>
        <img className="pt-3" src={logo}/>
          <p className="animate__animated animate__fadeIn font-italic">
          “Upon the conduct of each depends the fate of all.” – Alexander the Great
          </p>
      </Container>
  {/* </Jumbotron> */}


  

    {state.loggedIn ? 
    <Container className="text-center border-bottom p-5">
    <h3 className="text-center mb-4">Welcome Back!</h3>
      <Row className="h-50 align-items-center">
        <Col sm>
          <Container className="border h-100 mb-2">
          <h4>App News</h4>
            {changelog.map((item,key) =>(
              <ul key={key}>
              <li className="font-weight-bold">{item.date}</li>
              <p>{item.note}</p>
              </ul>
            ))}
          

          </Container>
        
        </Col>
        <Col sm>
          <Container className="align-items-center h-100">
            <Button className="btn btn-primary mx-auto" to="/addreview">Add a Review</Button>
            <Button className="btn btn-primary ml-2" to="/profile">View Your Profile</Button>
          </Container>
        </Col>
      </Row>
    </Container>    
    :
    <Container className="text-center border-bottom">
      <h3 className="text-center pb-2">Login to start sharing your experiences.</h3>
      <Button className="btn btn-primary mb-4" to="/login">Login</Button>
      <Alert variant='light'>
        Are you a company and want to know what you can do? 
      <Alert.Link href="/forcompanies"> Click here!</Alert.Link> 
      </Alert>

    </Container>
    }
    <Container className="pt-2">
      <Row>
        <Col>
          <PayPalButton/>
        </Col>
        <Col>
          <p className="font-italic">If you found this website helpful, feel free to 'e-gift' a cup of coffee!</p>
        </Col>
      </Row>
      
    </Container>
  
  
  <div className="background pt-5">
    <ListCompanies companies={companies}/>  
  </div>
  

  
  </React.Fragment>
  );
}

export default HomePage
