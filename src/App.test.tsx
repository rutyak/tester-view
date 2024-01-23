import React from 'react';
import { render, screen } from '@testing-library/react';
import Tester from './componetns/Tester';
import { MemoryRouter } from 'react-router-dom';

test('renders learn react link', () => {
  render(<MemoryRouter><Tester /></MemoryRouter>);
  const linkElement = screen.getByText("Survey");
  expect(linkElement).toBeInTheDocument();
});