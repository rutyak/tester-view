import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Form from './Form';


test('rendering Image component', () => {
  render(<MemoryRouter><Form/></MemoryRouter>);
  const linkElement = screen.getByTestId("form-container");
  expect(linkElement).toBeInTheDocument();
})