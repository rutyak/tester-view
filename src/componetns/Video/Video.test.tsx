import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Video from './Video';

test('Cheking Video Component', () => {
  render(<MemoryRouter><Video/></MemoryRouter>);
  const linkElement = screen.getByText("Please cut the important part of video !!");
  expect(linkElement).toBeInTheDocument();
});