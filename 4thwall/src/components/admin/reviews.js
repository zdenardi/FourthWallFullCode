import React from 'react'
import {List,Datagrid,TextField,NumberField,ReferenceField,EmailField,EditButton} from 'react-admin'


export const ReviewList = props =>{  
  return(
      
      <List {...props} 
      title="List of Reviews"
      sort={{ field: 'review_id', order: 'ASC' }}
      >
          <Datagrid rowClick="edit">
              <TextField source="review_id" />
              <TextField source="companyName" />
              <TextField source="role" />
              <TextField source="profRating" />
              <TextField source="worthWhileRating" />
              <TextField source="rateofPay" />
              <TextField source="comment" />
              <EditButton/>>              
          </Datagrid>
      </List>
  );
  }