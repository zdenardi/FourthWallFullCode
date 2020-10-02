import {TheaterCompany,Review} from '../../db/db'
import Sequelize  from 'sequelize';



const getAllCompanies = async (req,res) =>{

  const totalCompanies = await TheaterCompany.count({});
  console.log(totalCompanies)

  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || totalCompanies
  const offset = (page-1)*pageSize
  
  const field = req.query.sort || "companyName"
  const order = req.query.order || "ASC"
  TheaterCompany.findAll({
    subQuery:false,
    offset: page != 0 ? offset : totalCompanies,
    limit:pageSize,
 
    order:[
      [field,order]    
    ],
    where:[],
    include:[{
      model:Review,attributes:[],   
    }],    
    attributes:{
      include:[[Sequelize.fn("COUNT",Sequelize.col("reviews.company_id")),"num_of_reviews"] 
            
              ]
    },
   
    group:['company_id'],

    }).then(companies=>{
      if(!companies){
        res.json({error:"There are no companies to show!"})
      }
      res.json({data:companies,total:totalCompanies})
    }).catch(err =>{
      console.log(err,err.message)
    })
  }
  
 const addNewCompany = async (req,res)=>{
  try {
    const company = await TheaterCompany.create(req.body)
    console.log("Here is the company id " , company.dataValues.company_id)
    return res.status(201).send(company.dataValues);
  }catch(error){
    return res.status(500).json({error:error.message})
  }
}

const getCompanyById = (req,res)=>{
  const id = req.params.id;
  console.log("...Finding matching company...")
  TheaterCompany.findOne({
    attributes:{
      include:[
        [Sequelize.fn("AVG",Sequelize.col("reviews.profrating")),"avgProfRating"],
        [Sequelize.fn("AVG",Sequelize.col("reviews.worthWhileRating")),"avgWorthWhileRating"]
      ]
    },
    include:[{
      model:Review,attributes:[]}],
    where:{
      company_id:id
    }
  }).then(company=>{
    if(company){
      res.send({data:company})
    }else{
      res.send("There was an error")
    }
  })
}

const updateCompany = (req,res) =>{
  console.log("...Trying to update Company...")
  const id = req.params.id;
  const [updatedCompany] = req.body

  TheaterCompany.find({
    where:{
      company_id:id
    }
  }).then(company =>{
    if (company){
      console.log("Company found!")
      TheaterCompany.update(updatedCompany,{
        where:{
          company_id:id
        }
      }).then(company => {
        res.send(company)
      }).catch(err =>{
        console.log(err,err.message)
      })
    }
  })
}
module.exports={
  addNewCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  
}