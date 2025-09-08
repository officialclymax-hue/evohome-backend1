import * as React from 'react';
import { List, Datagrid, TextField, EditButton, Edit, SimpleForm, TextInput, DateInput, Create } from 'react-admin';
export const BlogList = () => (<List><Datagrid rowClick="edit"><TextField source="title"/><TextField source="slug"/><EditButton/></Datagrid></List>);
export const BlogEdit = () => (<Edit><SimpleForm><TextInput source="title" fullWidth/><TextInput source="slug"/><TextInput source="excerpt" fullWidth/><DateInput source="date"/><TextInput source="author"/><TextInput source="category"/><TextInput source="image" fullWidth/><TextInput source="content" multiline fullWidth/></SimpleForm></Edit>);
export const BlogCreate = () => (<Create><SimpleForm><TextInput source="title" fullWidth/><TextInput source="excerpt" fullWidth/><DateInput source="date"/><TextInput source="author"/><TextInput source="category"/><TextInput source="image" fullWidth/><TextInput source="content" multiline fullWidth/></SimpleForm></Create>);
