import axios from 'axios';
import {fetchUtils} from 'react-admin';
import {qs,stringify} from 'querystring';
const apiUrl = 'https://localhost:8001';
const httpClient = fetchUtils.fetchJson;

export default {
  create: async (resource, params) =>{
    const {companyName,companyDetails} = params.data
    const API = `/api/${resource}`
    

    axios.post(`${API}`,{
      companyName:`${companyName}`,
      companyDetails:`${companyDetails}`
    }).then(dataValues => ({
      data: { ...dataValues, id: dataValues.company_id },
  }))
},

  

 


  
        


        
  getList: async (resource,params) =>{    

    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
        sort: JSON.stringify([field, order]),        
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
    };
  

    const apiURL = `/api/`
    const url =`${apiURL}/${resource}?order=${order}&sort=${field}&page=${page}&pageSize=${perPage}`;

    const fetchedData = await (axios.get(`${url}`));
    const content = await fetchedData.data.data
    
    const total = await fetchedData.data.total
    
    switch (resource) {
      case "reviews":
        return ({
          data: content.map(review => ({...review, id: review.review_id }) ),
          total:total
      });
      break;
      case "companies":
        return({
          data: content.map(company => ({ ...company, id: company.company_id }) ),
          total:total
      });
      break;
      case "users":
        return({
          data: content.map(user => ({ ...user, id: user.user_id }) ),
          total:total
      });
      break;

    }
  },
  
  getMany: async (resource, params) => {
    const query = {
        filter: JSON.stringify({ id: params.company_ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return await axios.get(url).then(({ json }) => ({ data: json }));
  },

  getOne: async (resource,params) =>{
    switch (resource){
      case "reviews":
         const reviews = await axios.get(`/api/${resource}/review/${params.id}`);
         return ({...reviews.data, id: reviews.data.review_id})        

        break;
      case "companies":
         const companies = await axios.get(`/api/${resource}/company/${params.id}`);
         return ({...companies.data, id: companies.data.company_id})          

        break;
        }
    
    },

  update: async (resource, params) =>{
    switch (resource){
      case "reviews":
            const reqBody={
              review_id:params.params_id,
              company_id:params.company_id, 
              date: params.date,
              role: params.role,
              profRating: params.profRating, 
              worthWhileRating: params.worthWhileRating, 
              rateofPay: params.rateofPay,  
              comment:params.comment
            }
            const config ={
              headers:{
                'content-type': 'application/x-www-form-urlencoded'
              }
            }
            await axios.put(`/api/${resource}/review/${params.id}`,qs.stringify(reqBody),config).then(({ json }) => ({ data: json }))
        break;
      case "companies":

    }
  },


  

  delete: (resource, params) =>{
    console.log("Trying to delete",params)
    alert("Deleting")
  return(
  httpClient(`/api/reviews/review/${params.id}`, {
      method: 'DELETE',
  }).then(({ json }) => ({ data: json }))
  )},

  deleteMany: (resource, params) => {
      console.log(params)
      const query = {
          filter: JSON.stringify({ id: params.ids}),
          
      };
      return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
          method: 'DELETE',
          body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));
    },




};

  // export const findOneReview = async (id)=>{
  //   const reviews = await axios.get(`/api/reviews/${id}`)
  //   return (reviews.data);
  // }
  




    // getManyReference: (resource, params) => {
    //     const { page, perPage } = params.pagination;
    //     const { field, order } = params.sort;
    //     const query = {
    //         sort: JSON.stringify([field, order]),
    //         range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    //         filter: JSON.stringify({
    //             ...params.filter,
    //             [params.target]: params.id,
    //         }),
    //     };
    //     const url = `${apiUrl}/${resource}?${stringify(query)}`;

    //     return httpClient(url).then(({ headers, json }) => ({
    //         data: json,
    //         total: parseInt(headers.get('content-range').split('/').pop(), 10),
    //     }));
    // },



    // updateMany: (resource, params) => {
    //     const query = {
    //         filter: JSON.stringify({ id: params.ids}),
    //     };
    //     return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({ data: json }));
    // },

 
 

    

  
export const listReviews = async () =>{
  const reviews= await axios.get('/api/reviews',);
  return(reviews.data) 
}

export const createReview = review =>{
  console.log(review);
  const reqBody = {
    review_id:review.review_id,
    user_id: review.user_id,
    company_id:review.company_id, 
    date: review.date,
    role: review.role,
    profRating: review.profRating, 
    worthWhileRating: review.worthWhileRating, 
    rateofPay: review.rateofPay,  
    comment:review.comment
  }
  const config ={
    headers:{
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return axios
  .post('/api/reviews/add',qs.stringify(reqBody),config)
  .then(res => {
    console.log("Trying to add review... ")
    return(res)
  })
  .catch(err=> {
    console.log(err)    
    return("There was a problem")
    })

}

export const findOneReview = async (id)=>{
  const reviews = await axios.get(`/api/reviews/${id}`)
  return (reviews.data);
}



export const deleteReview = review =>{
  console.log(review);
  const reqBody = {
    user_id: review.user_id,
    review_id: review.review_id
  }
  const config ={
    headers:{
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  
  return axios
  .post('/api/reviews/delete',qs.stringify(reqBody),config)
  .then(res => {
    console.log(res)
    console.log("Review Delete")
    return(res.data)
  })

}
export const editReview = review =>{
  //check to see if role is a number, find in array and get value and pass it.
  if (isNaN(review.role)){
    const ROLES=["Actor","Designer","Director","Production"]
    const givenRoleValue=ROLES.indexOf(review.role)
    review.role=givenRoleValue
  }

  const reqBody = {
    review_id:review.review_id,
    company_id:review.company_id, 
    date: review.date,
    role: review.role,
    profRating: review.profRating, 
    worthWhileRating: review.worthWhileRating, 
    rateofPay: review.rateofPay,  
    comment:review.comment
  }
  const config ={
    headers:{
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return axios.put('/api/reviews/update',qs.stringify(reqBody),config)
  .then(res => {
    console.log(res)
    return(res.data)
  });
}