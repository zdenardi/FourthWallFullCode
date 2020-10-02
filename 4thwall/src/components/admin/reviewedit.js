import React from 'react'
import {SimpleForm,ReferenceInput,TextInput,NumberInput,SelectInput,Edit} from 'react-admin'


export const ReviewEdit = props => (
  <Edit {...props}>
      <SimpleForm>
          <ReferenceInput source="review_id" reference="reviews"><SelectInput optionText="id" /></ReferenceInput>
          <TextInput source="role" />
          <NumberInput source="profRating" />
          <NumberInput source="worthWhileRating" />
          <TextInput source="rateofPay" />
          <TextInput source="comment" />
          <TextInput source="companyName" />
      </SimpleForm>
  </Edit>
);