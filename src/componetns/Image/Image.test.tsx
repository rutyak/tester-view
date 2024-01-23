import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Image from './Image';


test('rendering Image component', () => {
  render(<MemoryRouter><Image/></MemoryRouter>);
  const linkElement = screen.getByTestId("image-container");
  expect(linkElement).toBeInTheDocument();
});