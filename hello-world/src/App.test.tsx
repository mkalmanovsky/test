import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Calculator', () => {
  render(<App />);
  const acButton = screen.getByText(/AC/i);
  expect(acButton).toBeInTheDocument();
});
