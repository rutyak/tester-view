import React from 'react';
import { render, screen } from '@testing-library/react';
import Tester from './Tester';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
const BaseUrl = 'http://localhost:5000';
jest.mock('axios');

test('Checking Tester component', () => {
  render(<MemoryRouter><Tester/></MemoryRouter>);
  const linkElement = screen.getByText("Survey");
  expect(linkElement).toBeInTheDocument();
});

// it('Testing Image get api',async()=>{
    
//   const mockResponse = {
//       data:{data: {
//           title: 'Nature',
//           name: 'rutik'
//       }}
//   }
//   axios.get = jest.fn().mockResolvedValue(mockResponse);
//   const res = await axios.get(`${BaseUrl}/imageData`);

//   if(res.data.data && res.data.data.stage === 'published'){
//     render(<MemoryRouter><Tester/></MemoryRouter>);
//     const imgText = screen.getByTestId('survey-block-image');
//     expect(imgText).toBeInTheDocument()
//   }
//   expect(mockResponse.data.data.name).toEqual(res.data.data.name);
//   expect(mockResponse.data.data.title).toEqual(res.data.data.title);
// })

// it('Testing Form get api',async()=>{
    
//   const mockResponse = {
//       data:{data: {
//           title: 'Nature',
//           name: 'rutik'
//       }}
//   }
//   axios.get = jest.fn().mockResolvedValue(mockResponse);
//   const res = await axios.get(`${BaseUrl}/formData`);

//   if(res.data.data && res.data.data.stage === 'published'){
//     render(<MemoryRouter><Tester/></MemoryRouter>);
//     const formText = screen.getByTestId('survey-block-form');
//     expect(formText).toBeInTheDocument()
//   }
//   expect(mockResponse.data.data.name).toEqual(res.data.data.name);
//   expect(mockResponse.data.data.title).toEqual(res.data.data.title);
// })

// it('Testing Video get api',async()=>{
    
//   const mockResponse = {
//       data:{data: {
//           title: 'Nature',
//           name: 'rutik'
//       }}
//   }
//   axios.get = jest.fn().mockResolvedValue(mockResponse);
//   const res = await axios.get(`${BaseUrl}/videoData`);

//   if(res.data.data && res.data.data.stage === 'published'){
//     render(<MemoryRouter><Tester/></MemoryRouter>);
//     const videoText = screen.getByTestId('survey-block-video');
//     const title = screen.getByText('Title:');
//     const desc = screen.getByText('Description:');
//     expect(title).toBeInTheDocument()
//     expect(desc).toBeInTheDocument()
//     expect(videoText).toBeInTheDocument()
//   }
//   expect(mockResponse.data.data.name).toEqual(res.data.data.name);
//   expect(mockResponse.data.data.title).toEqual(res.data.data.title);
// })

