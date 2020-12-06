import React from 'react';
import Homepage from './pages/HomePage';
import AddCompany from './pages/AddCompany';
import CompanyListPage from './pages/CompanyListPage';
import AddReview from './pages/AddReviewPage';
import CompanyDetail from './pages/CompanyDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import Register from './pages/UserCreate';
import Login from './pages/LoginUser';
import 'bootstrap/dist/js/bootstrap.js'
import '../src/css/customCSS/style.scss'
import {BrowserRouter as Router,
      Route,Switch} from 'react-router-dom'
import NavBar from './NavBar';
import DetailReviewPage from './pages/DetailReviewPage';
import {AuthContextProvider} from './utils/AuthContext.js';
import {ReviewProvider} from './utils/ReviewContext';
import EditReviewPage from './pages/EditReviewPage';
import ProfilePage from './pages/ProfilePage'
import ResetPage from './pages/ResetPage'
import ResetfromEmail from './pages/ResetViaEmailPage'
import DeleteReview from './pages/DeleteReviewPage'
import AdminPage from './pages/AdminPage'
import RepPage from './pages/RepPage'
import ForCompany from './pages/ForCompanypage'
import {MessageProvider} from './utils/MessageContext'

import FlashMessage from './components/utilcomponents/FlashMessage'




function App() {

  

  return (
    <>

  <MessageProvider>
  <ReviewProvider>
    <AuthContextProvider>
      <Router>
      <div className="App">
        <NavBar/>
          <FlashMessage/>
        
        
           
      <Switch>
        <Route path ="/" component= {Homepage} exact/>
        <Route path ="/forcompanies" component = {ForCompany}/>

        <Route path ="/Profile" component={ProfilePage}/> 
        <Route path ="/Reset" component={ResetPage} exact/>  
        <Route path = "/AddReview/:theaterId" component = {AddReview}/>
        <Route path = "/AddReview/" component = {AddReview}/>
        <Route path ="/admin" component ={AdminPage}/>       
        <Route path = "/review/edit/:id" component ={EditReviewPage}/>
        <Route path = "/review/delete/:id" component ={DeleteReview}/>
        <Route path = "/review/edit/:id" component ={EditReviewPage}/>
        <Route path = "/review/:id" component = {DetailReviewPage}/>
        <Route path = "/AddCompany" component = {AddCompany}/>
        <Route path = "/Register" component ={Register}/>
        <Route path = "/Login" component ={Login}/>
        <Route path = "/companies/:id" component ={CompanyDetail}/>
        <Route path = "/companies" component = {CompanyListPage}/> 
        <Route path = "/rep/:id" component = {RepPage}/>



        <Route path = "/reset/:token" component = {ResetfromEmail}/>
        
        <Route component={NotFoundPage} />
      </Switch>
      
        
      </div>
      </Router>
    </AuthContextProvider>
    </ReviewProvider>
  </MessageProvider> 
    </>
  );
}

export default App;
