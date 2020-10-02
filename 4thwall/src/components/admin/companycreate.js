import React from 'react'
import {SimpleForm,ReferenceInput,TextInput,NumberInput,SelectInput,Create} from 'react-admin'


export const CompanyCreate = props => (
  <Create {...props}>
      <SimpleForm>
          <TextInput source="companyName" />
          <TextInput multiline source="companyDetails" />
      </SimpleForm>
  </Create>
)
