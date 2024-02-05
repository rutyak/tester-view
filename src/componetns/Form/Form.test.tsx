import React from 'react';
import { logRoles, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useParams, Route, Routes } from 'react-router-dom';
import Form from './Form';
import axios from 'axios';
jest.mock('axios');
const BaseUrl = 'http://localhost:5000';



it('checking rendering', () => {
  render(<MemoryRouter><Form /></MemoryRouter>);
  expect(screen.getByTestId("form-container")).toBeInTheDocument();
  expect(screen.getByText("Please fill the form !!")).toBeInTheDocument();
})

it('checking Form questions', async () => {
  render(<MemoryRouter><Form /></MemoryRouter>);
  const testId = screen.queryByTestId("entire-form");
  expect(testId).not.toBeInTheDocument();
})

it('checking button', () => {
  const { container } = render(<MemoryRouter><Form /></MemoryRouter>);
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  logRoles(container);
})


const mockData = {
  data: [{
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
  }]
};

axios.get = jest.fn().mockResolvedValue({ data: mockData });


test.only('testing entire component', async () => {

  // jest.mock('react-router-dom', () => ({
  //   ...jest.requireActual('react-router-dom'),
  //   useParams: () => ({
  //     formId: 'Malum hamko tumhe',
  //     id: '',
  //   }),
  // }));

  const id = '65bc7b61204919eb7b8d4103';
  render(
    <MemoryRouter initialEntries={[`/form/${id}`]}>
      <Routes>
        <Route path="/form/:formid" element={<Form />}>
        </Route>
      </Routes>
    </MemoryRouter>
  );


  await waitFor(() => {
    expect(screen.getByText(/Kaha na ptya hai/i)).toBeInTheDocument();
    expect(screen.getByText(/SUBMIT/i)).toBeInTheDocument();
  });

  const testId = screen.queryByTestId("image-video-container");
  expect(testId).toBeInTheDocument();
});
