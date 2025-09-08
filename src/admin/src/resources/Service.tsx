import * as React from 'react';
import { List, Datagrid, TextField, EditButton, Edit, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, Create } from 'react-admin';

export const ServiceList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="slug" />
      <TextField source="category" />
      <EditButton />
    </Datagrid>
  </List>
);

const jsonTip = 'JSON array/object (use [] or {})';

export const ServiceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" fullWidth />
      <TextInput source="slug" />
      <TextInput source="category" />
      <TextInput source="image" fullWidth />
      <TextInput source="description" multiline fullWidth />
      <TextInput source="longDescription" multiline fullWidth />
      <TextInput source="averageSavings" />
      <TextInput source="installTime" />
      <TextInput source="warranty" />
      <ArrayInput source="benefits"><SimpleFormIterator><TextInput /></SimpleFormIterator></ArrayInput>
      <TextInput source="whatIsIt" multiline fullWidth />
      <TextInput source="whyChooseContent" multiline fullWidth />
      <TextInput source="howEvoHomeHelpsContent" multiline fullWidth />
      <TextInput source="howItWorksSteps" label="How It Works (JSON)" helperText={jsonTip} fullWidth />
      <TextInput source="comparisonTable" label="Comparison Table (JSON)" helperText={jsonTip} fullWidth />
      <TextInput source="serviceTypes" label="Service Types (JSON)" helperText={jsonTip} fullWidth />
      <TextInput source="materials" label="Materials (JSON)" helperText={jsonTip} fullWidth />
      <TextInput source="relatedArticles" label="Related Articles (JSON)" helperText={jsonTip} fullWidth />
      <TextInput source="externalResources" label="External Resources (JSON)" helperText={jsonTip} fullWidth />
    </SimpleForm>
  </Edit>
);

export const ServiceCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" fullWidth />
      <TextInput source="category" />
      <TextInput source="image" fullWidth />
      <TextInput source="description" multiline fullWidth />
    </SimpleForm>
  </Create>
);
