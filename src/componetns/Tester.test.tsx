import React from 'react';
import { render, screen } from '@testing-library/react';
import Tester from './Tester';
import { MemoryRouter } from 'react-router-dom';

test('Checking Tester component', () => {
  render(<MemoryRouter><Tester/></MemoryRouter>);
  const linkElement = screen.getByText("Survey");
  expect(linkElement).toBeInTheDocument();
});