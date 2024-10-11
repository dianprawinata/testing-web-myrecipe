import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders footer text', () => {
  render(<Footer />);
  const footerText = screen.getByTestId('footer-text');
  expect(footerText.innerHTML).toBe('© 2024 Company, Inc. All rights reserved.');

});

test('renders link to Facebook', () => {
  render(<Footer />);
  const linkFacebook = screen.getByTestId('link-facebook');
  expect(linkFacebook).toHaveAttribute('href', 'https://facebook.com');
});

test('renders link to X', () => {
  render(<Footer />);
  const linkX = screen.getByTestId('link-x');
  expect(linkX).toHaveAttribute('href', 'https://x.com');
});

test('renders link to Instagram', () => {
  render(<Footer />);
  const linkInstagram = screen.getByTestId('link-instagram');
  expect(linkInstagram).toHaveAttribute('href', 'https://instagram.com/');

});
