const express = require("express")
const companies = express.Router();
import {addNewCompany,getAllCompanies,getCompanyById,updateCompany} from '../src/controllers/theatercompaniesController'
import {TheaterCompany,Review} from '../db/db'
import Sequelize  from 'sequelize';
const cors = require('cors')
var connection = require('../src/connection').connection

companies.use(cors());

const SELECT_ALL_THEATERCOMPANIES_QUERY = 'SELECT theatercompanies.*,count(reviews.company_id) as num_of_reviews FROM theatercompanies LEFT JOIN reviews on (theatercompanies.company_id = reviews.company_id) group by theatercompanies.company_id'

//Get All Companies
companies.get('/',getAllCompanies)
//Add a company
companies.post('/',addNewCompany),
//Get Company by ID
companies.get("/company/:id",getCompanyById),
//update Company
companies.put("company/:id",updateCompany),
//delete Company






//delete company by ID




    



module.exports=companies