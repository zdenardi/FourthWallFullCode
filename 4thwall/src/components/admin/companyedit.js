import React from 'react'
import {SimpleForm,ReferenceInput,TextInput,NumberInput,SelectInput,Edit} from 'react-admin'


export const CompanyEdit = props => (
  <Edit {...props}>
      <SimpleForm>
          <ReferenceInput source="company_id" reference="companies"><SelectInput optionText="id" /></ReferenceInput>
          <TextInput source="companyName" />
          <TextInput source="companyDetails" />
          <NumberInput source="num_of_reviews" />
          <TextInput source="id" />
      </SimpleForm>
  </Edit>
)