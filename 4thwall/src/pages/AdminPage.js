import React, {useEffect,useState,useContext} from 'react';
import {Redirect} from 'react-router-dom'
import {Admin,Resource,ListGuesser,EditGuesser} from 'react-admin';
import {ReviewList} from '../components/admin/reviews'
import {CompanyList} from '../components/admin/companies.js'
import {ReviewEdit} from '../components/admin/reviewedit'
import {CompanyEdit} from '../components/admin/companyedit'
import {CompanyCreate} from '../components/admin/companycreate'
import dataprovider from '../dataprovider/dataprovider'
import {AuthContext} from '../utils/AuthContext';




const AdminPage =()=>{
  const [loaded,setLoaded] = useState(false)
  const [state,setState]=useContext(AuthContext)

  const dataProvider = dataprovider



  return (
    <>
    {(!state.loggedIn ? "Not Logged in": "Logged in")}
    
      <Admin dataProvider={dataProvider}>
        <Resource name="reviews" list={ReviewList} edit={ReviewEdit}/>
        <Resource name="companies" list={CompanyList} edit={CompanyEdit} create={CompanyCreate}/>

      </Admin>
    </>
  )
}

export default AdminPage