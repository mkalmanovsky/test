import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Calculator by default', () => {
  render(<App />);
  const acButton = screen.getByText(/AC/i);
  expect(acButton).toBeInTheDocument();
});

test('can navigate to Signup page', () => {
  render(<App />);
  const signupLink = screen.getByText(/Sign Up/i);
  fireEvent.click(signupLink);
  const signupTitle = screen.getByText(/Create an Account/i);
  expect(signupTitle).toBeInTheDocument();
});
