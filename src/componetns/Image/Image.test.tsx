import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Image from './Image';
import axios from 'axios';
const BaseUrl = 'http://localhost:5000';
jest.mock('axios');


test('rendering Image component', () => {
  render(<MemoryRouter><Image/></MemoryRouter>);
  const linkElement = screen.getByTestId("image-container");
  expect(linkElement).toBeInTheDocument();
});

test('Cheking user name input', () => {
  render(<MemoryRouter><Image/></MemoryRouter>);
  const userName = screen.getByPlaceholderText("Enter your name");
  expect(userName).toBeInTheDocument();
});


// it('Testing videoAns post api', async () => {

//   const mockResponse = {
//     data: {
//       title: 'Nature',
//       name: 'rutik'
//     }
//   }
//   axios.post = jest.fn().mockResolvedValue(mockResponse);

//   render(<MemoryRouter><Image /></MemoryRouter>);

//   const res = await axios.post(`${BaseUrl}/imageAns`);
//   expect(mockResponse.data.name).toEqual(res.data.name);
//   expect(mockResponse.data.title).toEqual(res.data.title);
// })

// it('Testing ImageData get api and Input, Image-tag, and submit btn', async () => {

//   const mockResponse = {
//     data: {
//       data: {
//         title: 'Nature',
//         name: 'rutik'
//       }
//     }
//   }
//   axios.get = jest.fn().mockResolvedValue(mockResponse);

//   const res = await axios.get(`${BaseUrl}/videoData`);

//   if (res.data.data.length > 0) {
//     render(<MemoryRouter><Image /></MemoryRouter>);
//     const btn = screen.getByText('Submit');
//     const text = screen.getByText('Please select any two images !!');
//     const videoTag = screen.getByTestId('image-tag');
//     expect(btn).toBeInTheDocument();
//     expect(text).toBeInTheDocument();
//     expect(videoTag).toBeInTheDocument();
//   }
//   expect(mockResponse.data.data.name).toEqual(res.data.data.name);
//   expect(mockResponse.data.data.title).toEqual(res.data.data.title);
// })

// it('Testing ImageData Upadate Api', async () => {
//   const id = '123';

//   const mockData = {
//     data: {
//       data: {
//         id: '123',
//         title: 'River',
//         name: 'Adarsh',
//         status: ""
//       }
//     }
//   }
//   axios.put = jest.fn().mockResolvedValue(mockData);

//   render(<MemoryRouter><Image/></MemoryRouter>)


//   const res = await axios.put(`${BaseUrl}/updateVideo/${id}`, { status: "Answered" })

//   expect(mockData.data.data.title).toEqual(res.data.data.title)

// })
