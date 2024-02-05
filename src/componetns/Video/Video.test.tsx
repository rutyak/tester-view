import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Video from './Video';
import axios from 'axios';
const BaseUrl = 'http://localhost:5000'
jest.mock('axios');

test('Cheking Video Component', () => {
  render(<MemoryRouter><Video /></MemoryRouter>);
  const linkElement = screen.getByText("Please cut the important part of video !!");
  expect(linkElement).toBeInTheDocument();
});

test('Cheking user name input', () => {
  render(<MemoryRouter><Video /></MemoryRouter>);
  const userName = screen.getByPlaceholderText("Enter your name");
  expect(userName).toBeInTheDocument();
});


describe('Form questions test',()=>{
 
  test('render form when API call succeeds',async ()=>{

    const mockData = [{
          data: {
            data: {
              desc:"Ne video",
              stage:"published",
              title:"Nature Lover",
              type:"Video",
              videoType:"mp4",
              videoUrl:"http://res.cloudinary.com/daguvaxyh/video/upload/v1706851244/Videos/ke9gqizgh01vfv7ymqyj.mp4",
              _id:"65bc7b8f204919eb7b8d4105"
             }
      }
    }]

      axios.get = jest.fn().mockResolvedValue(mockData)

      render(<MemoryRouter><Video /></MemoryRouter>)
      
      await waitFor(()=>{
        const testId = screen.getByTestId(/video-tag/i);
        expect(testId).toBeInTheDocument();
      })
  })
}) 


// it('Testing videoAns post api', async () => {

//   const mockResponse = {
//     data: {
//       title: 'Nature',
//       name: 'rutik'
//     }
//   }
//   axios.post = jest.fn().mockResolvedValue(mockResponse);

//   render(<MemoryRouter><Video /></MemoryRouter>);

//   const res = await axios.post(`${BaseUrl}/videoAns`);
//   expect(mockResponse.data.name).toEqual(res.data.name);
//   expect(mockResponse.data.title).toEqual(res.data.title);
// })

// it('Testing VideoData get api and Input, Video-tag, and submit btn', async () => {

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
//     render(<MemoryRouter><Video /></MemoryRouter>);
//     const btn = screen.getByText('Submit');
//     const inputText = screen.getByPlaceholderText('Seconds');
//     const videoTag = screen.getByTestId('video-tag');
//     expect(btn).toBeInTheDocument();
//     expect(inputText).toBeInTheDocument();
//     expect(videoTag).toBeInTheDocument();
//   }
//   expect(mockResponse.data.data.name).toEqual(res.data.data.name);
//   expect(mockResponse.data.data.title).toEqual(res.data.data.title);
// })


// it('Testing VideoData Upadate Api', async () => {
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

//   render(<MemoryRouter><Video /></MemoryRouter>)


//   const res = await axios.put(`${BaseUrl}/updateVideo/${id}`, { status: "Answered" })

//   expect(mockData.data.data.title).toEqual(res.data.data.title)

// })
