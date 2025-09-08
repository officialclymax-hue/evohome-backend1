import * as React from 'react';
import { List, Datagrid, TextField, DateField } from 'react-admin';
export const LeadsList = () => (
  <List>
    <Datagrid>
      <DateField source="createdAt"/>
      <TextField source="firstName"/><TextField source="lastName"/>
      <TextField source="email"/><TextField source="phone"/>
      <TextField source="service"/><TextField source="postcode"/>
    </Datagrid>
  </List>
);
