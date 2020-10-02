import React from 'react'
import {List,Datagrid,TextField,NumberField,ReferenceField,EmailField,EditButton,Pagination} from 'react-admin'


export const CompanyList = props => (
  <List {...props}
  
  sort={{ field: 'companyName', order: 'ASC' }}
  >
      <Datagrid rowClick="edit">
          <TextField source="companyName" />
          <TextField source="companyDetails" />
          <NumberField source="num_of_reviews" />
          <EditButton/>
      </Datagrid>
  </List>
);