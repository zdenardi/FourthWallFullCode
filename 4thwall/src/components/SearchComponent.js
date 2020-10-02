import React,{useState,useEffect} from 'react'
import {Form,Container,Card,Alert,Badge} from 'react-bootstrap'
import LinkButton from './utilcomponents/LinkButton'


const SearchComponent= ({companies}) => {
  console.log("Here are the companies: ",companies)
  const [query, setQuery] = useState("");
  const [searchResults,setSearchResults]= useState(companies)
  const [onlyReviewed,setOnlyReviewed]=useState(false)
  //Change Handler
  const handleChange = e => {
    setQuery(e.target.value)
    }
  
    const onlyReviewedHandler = e =>{
      setOnlyReviewed(!onlyReviewed)
    }
  
  
  
//when change happens
  useEffect(() => {
    console.log(companies)
    if(query===""){
      setSearchResults(companies.data)
    }
    const results = companies.filter(company =>
      company.companyName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
    //only show reviewed companies
    if (onlyReviewed){
      const reviewedCompanies = companies.filter(company =>
        company.num_of_reviews != 0)
        setSearchResults(reviewedCompanies)
    }
  }, [query,companies,onlyReviewed]);

   
    return (
    <>
      <Container>
        <Form>
          <Form.Group controlId="SearchBar">
            <Form.Label>
              <h5>What company are you looking for reviews for?</h5>
            </Form.Label>
              <Form.Control 
              type="input"
              placeholder="Search for..."
              value ={query}
              onChange={handleChange}
              />
              <Form.Check
                type='checkbox'
                id='showReviewedchkbox'
                label='Only show companies with reviews'
                onChange={onlyReviewedHandler}
                />
            
          </Form.Group>
        </Form>
          {
            searchResults.map((company,key) =>
            
            <Card 
            className="card mt-3"
            key={key}>
              <Card.Body>
                <Card.Title className="d-flex justify-content-center">
                    <h3>{company.companyName}</h3> <h5><Badge className="ml-2"variant="info">Reviews: {company.num_of_reviews}</Badge></h5> 
                </Card.Title>
                <Card.Text className="d-flex justify-content-center">
                <LinkButton  id={company.company_id} className="btn btn-primary" to={`/companies/${company.company_id}`}>See reviews</LinkButton>
                </Card.Text>
              </Card.Body>
            </Card> 
            )}
            
        
      </Container>
        
    
    {query  && 
    <Container>
    <Alert variant="primary">Can't find what you are looking for? <a href="mailto:zdenardi@gmail.com?subject=Add Company Request">Email me if you think I'm missing a company.</a></Alert>
    </Container>
    }
    
    </>


  )}


export default SearchComponent