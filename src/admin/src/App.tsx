import * as React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { authProvider } from './authProvider';
import { ServiceList, ServiceEdit, ServiceCreate } from './resources/Service';
import { CountyList, CountyEdit, CountyCreate } from './resources/County';
import { BlogList, BlogEdit, BlogCreate } from './resources/BlogPost';
import { GalleryList, GalleryEdit, GalleryCreate } from './resources/Gallery';
import { TestimonialList, TestimonialEdit, TestimonialCreate } from './resources/Testimonial';
import { CompanyEdit } from './resources/Company';
import { SeoList, SeoEdit, SeoCreate } from './resources/Seo';
import { NavList, NavEdit, NavCreate } from './resources/Navigation';
import { HeroList, HeroEdit, HeroCreate } from './resources/Hero';
import { RqEdit } from './resources/RequestQuote';
import { LeadsList } from './resources/Leads';
import { ChatbotEdit } from './resources/Chatbot';

const apiUrl = window.location.origin + '/api';
const dataProvider = simpleRestProvider(apiUrl);

export default function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="services" list={ServiceList} edit={ServiceEdit} create={ServiceCreate} />
      <Resource name="counties" list={CountyList} edit={CountyEdit} create={CountyCreate} />
      <Resource name="blog-posts" options={{ label: 'Blog' }} list={BlogList} edit={BlogEdit} create={BlogCreate} />
      <Resource name="gallery-images" options={{ label: 'Gallery' }} list={GalleryList} edit={GalleryEdit} create={GalleryCreate} />
      <Resource name="testimonials" list={TestimonialList} edit={TestimonialEdit} create={TestimonialCreate} />
      <Resource name="company-info" options={{ label: 'Company' }} list={ListGuesser} edit={CompanyEdit} />
      <Resource name="seo" options={{ label: 'SEO' }} list={SeoList} edit={SeoEdit} create={SeoCreate} />
      <Resource name="navigation" list={NavList} edit={NavEdit} create={NavCreate} />
      <Resource name="hero" options={{ label: 'Hero Slides' }} list={HeroList} edit={HeroEdit} create={HeroCreate} />
      <Resource name="request-quote" options={{ label: 'Request Quote' }} list={ListGuesser} edit={RqEdit} />
      <Resource name="form-submissions" options={{ label: 'Leads' }} list={LeadsList} />
      <Resource name="chatbot" options={{ label: 'Chatbot' }} list={ListGuesser} edit={ChatbotEdit} />
    </Admin>
  );
}
