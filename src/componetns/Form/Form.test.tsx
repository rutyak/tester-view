import React from 'react';
import { logRoles, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import Form from './Form';
import axios from 'axios';
jest.mock('axios');
const BaseUrl = 'http://localhost:5000';



it('checking rendering',()=>{
  render(<MemoryRouter><Form /></MemoryRouter>);
  expect(screen.getByTestId("form-container")).toBeInTheDocument();
  expect(screen.getByText("Please fill the form !!")).toBeInTheDocument();
})

it('checking Form questions',async ()=>{
  render(<MemoryRouter><Form /></MemoryRouter>);
  const testId = screen.queryByTestId("entire-form");
  expect(testId).not.toBeInTheDocument();
})

it('checking button',()=>{
  const  {container} = render(<MemoryRouter><Form /></MemoryRouter>);
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  logRoles(container);
})


test('testing entire component', async () => {
  const formID = "Malum hamko tumhe";
  const mockData = {
    data: {
      data: {
        _id: '65bc7b61204919eb7b8d4103',
        type: "Survey",
        title: "Malum hamko tumhe",
        desc: "Kis bat ka intte jar hai",
        questions: [
          {
            type: "",
            question: "",
            options: []
          },
          {
            type: "single",
            question: "Ka ho na pyarr hai",
            options: []
          },
          {
            type: "radio",
            question: "Kaha na ptya hai",
            options: ["gertg", "xrdget"]
          },
          {
            type: "checkbox",
            question: "sddfetgf",
            options: ["dgdt", "sgrthr"]
          },
          {
            type: "single",
            question: "sdfgt",
            options: []
          }
        ],
        stage: "published",
        status: "Answered"
      }
    }
  };

  axios.get = jest.fn().mockResolvedValue({ data: mockData });

  render(<MemoryRouter><Form /></MemoryRouter>);

  await waitFor(() => {
    expect(screen.getByText('Ka ho na pyarr hai')).toBeInTheDocument();
    expect(screen.getByText('SUBMIT')).toBeInTheDocument();
  });
  
  const element = screen.getByRole('button');
  const text = screen.getByText('Please add your name');

  expect(element).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});
