import React from 'react';
import {Link} from 'react-router-dom'


const CompanyList = ({companies}) => {

let data = companies.reduce((r,e)=>{
  //Make groups for each first letter of CompanyName
  let group = e.companyName[0];
  group = group.toUpperCase()
  //if group doesn't exist, add it.
  if(!r[group]) r[group] = {group, children:[e]}
  else r[group].children.push(e)
  //return reducer
  return r;
},{})
let result = Object.values(data)


//Todo - Get Company ID

  return(
    <>
   
    <div class="container text-center">
    {/* Map Letter Groups*/}
      {result.map((section,key)=>
      <ul key={key}>
        <li><span class="font-weight-bold">{section.group}</span></li>
        {/* Map Company Names */}
        {(section.children).map((child,key) =>
        <Link key={child.company_id} to={`/companies/${child.company_id}`}>{child.companyName}
        <br/>
        </Link>

        )}
          
      </ul>)}
    </div>
    </>
  )

}
export default CompanyList