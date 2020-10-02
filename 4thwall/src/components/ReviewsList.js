import React, {useEffect,useState,useContext} from 'react';

import {Card,
        Accordion,
        Container,
        Row,
        Col,
        Modal,
        Button} from 'react-bootstrap'


const ReviewsList =({reviews}) => {

  const [show,setShow] = useState(false);
  const [activeReview, setActiveReview]=useState()

  
  const changeShow = (review) =>{
    setActiveReview(review)
    const showIs = !show
    setShow(showIs)
  }

  

  if(!reviews){
    return(
      <>
      <Container>
        <h5>There are no reviews, why don't you add one?</h5>
      </Container>
      </>
    )
  }else
  return(
      <>
      <Container>
      {reviews.map((review,key)=>
        <Accordion defaultActiveKey="0">
          <Card className="card mt-5" key = {key}>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <Card.Header>
                <Row>
                  <Container className="text-center">
                    <h5>{review.companyName}</h5>
                    <h6>Pay: {review.rateofPay ? review.rateofPay : "The user did not provide details on pay"}</h6>
                    <h6>Click to see full review</h6>
                  </Container>
                </Row>
              </Card.Header>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Container>
                <Row>
                  <Col sm={12} lg={6}>
                    <Card.Title>
                      <h5>Role: {review.role}</h5>
                    </Card.Title>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Card-text>{review.comment ? review.comment : "No Comment Given"}</Card-text>
                  </Col>
                </Row>
                </Container>
                <Container className="text-center pt-3 text-">
                <Row>
                  <Col>
                  <a className=""href="mailto:zdenardi@gmail.com?subject=Reported Review">Report Review</a>
                  </Col>
                  {review.response &&
                    <Col>
                      <Button variant="primary" onClick={()=>{changeShow(review)}}>
                        Show Theater Response
                      </Button>
                    </Col>
                  }
                  </Row>
                </Container>
              
            </Card.Body>
            </Accordion.Collapse>
            <Card.Footer>
            <Row>
              <Col className="text-left">
                <p> Professional Rating: {review.profRating}/5</p>
              </Col>
              <Col className="text-right">
                <p> WorthWhile Rating: {review.worthWhileRating}/5</p>
              </Col>
            </Row>            
          </Card.Footer>                   
          </Card>
        </Accordion>
          )}

          <Modal show={show} onHide={changeShow}>
                    <Modal.Header closeButton>
                      <Modal.Title>Theater Rep's Response</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{activeReview ? activeReview.response : "No response given"}</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={changeShow}>
                        Close
                      </Button>
                    </Modal.Footer>
                </Modal>
      </Container>
      
      
      
    </>
  );
}



export default ReviewsList