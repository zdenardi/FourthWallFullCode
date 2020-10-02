import React from 'react';
import LinkButton from './utilcomponents/LinkButton'
import {Card,
        Container,
        Row,
        Col} from 'react-bootstrap'

const ReviewDetail= ({review}) => {

  const repRes = () =>{
    if(review.responseAns == 1 ){
      return("Yes")
    }else {
      return("No")
    }
  }
  
  return(
  <React.Fragment>
      <Card className="card mx-auto mt-2" style={{width: 400}}>
        <Card.Header>
        <Row>
          <Container className="text-center">
            <h5>{review.companyName}</h5>
            <h6>Pay: {review.rateofPay ? review.rateofPay : "The user did not provide details on pay"}</h6>          
            </Container>        
        </Row>
        </Card.Header>
            <Card.Body>
              <Card.Title>
                <h5 className="text-center">Role: {review.role}</h5>
              </Card.Title>
                <Card.Text>
                  <p>{review.comment}</p>
                </Card.Text>
                <Container className="d-flex justify-content-center">
                  <LinkButton to="/profile" class="btn btn-primary">Back To Your Profile</LinkButton>
                </Container>
            </Card.Body>
          <Card.Footer>
            <Row>
              <Col className="text-left">
                <p> Professional Rating:{review.profRating}/5</p>
              </Col>
              <Col className="text-right">
                <p> WorthWhile Rating:{review.worthWhileRating}/5</p>
              </Col>
            </Row>
          </Card.Footer>
      </Card>
  </React.Fragment>
)}
;

export default ReviewDetail;