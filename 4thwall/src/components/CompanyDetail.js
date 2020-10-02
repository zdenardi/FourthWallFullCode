import React from 'react';
import LinkButton from './utilcomponents/LinkButton'


const CompanyDetail = ({company}) =>{

  const profrating = parseFloat(company.avgProfRating)
  const worthwhilerating = parseFloat(company.avgWorthWhileRating)
  
//Todo - Get Company ID and Info
return(
  <>
  <div class="container p-2 border mt-2">
      <div class="row">
         
          <div class=" mx-2 col-sm">
        
            <h2 >{company.companyName}</h2>
              <p>{company.companyDetails ? company.companyDetails : "No details listed. Email me if you have some!"}</p>
          </div>
          <div class="col-sm text-center">
          {company.avgProfRating ? 
          /* If there are reviews.... */
                                <h4 class="mt-2"> Average Professional Rating - {profrating
                                }/5</h4>
                                :
          /* If there are no reviews.... */
                                <h4 class="mt-2">Be the first to review!</h4>            
          }
          {company.avgWorthWhileRating &&
          /* If there are reviews.... */
                                <h4 class="mt-2">Average WorthWhile Rating - {worthwhilerating}/5</h4>
        
          }         
           
          </div>
      </div>
      <div>
      <LinkButton to={`/addreview/${company.company_id}`}class="btn btn-primary btn-lg btn-block">Add Review</LinkButton>
      </div>
    </div>
  
  </>
)

}
export default CompanyDetail