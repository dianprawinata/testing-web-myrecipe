import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

test('renders form search in navbar', () => {
  render(<NavBar />);
  const formSearch = screen.getByTestId('form-search');
  expect(formSearch).toBeInTheDocument();
});
