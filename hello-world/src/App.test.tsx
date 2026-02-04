import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders Login form', () => {
  render(<App />);
  const title = screen.getByText(/Login/i);
  expect(title).toBeInTheDocument();
});

test('shows success modal for Alex', async () => {
  render(<App />);
  const input = screen.getByLabelText(/Username/i);
  const button = screen.getByRole('button', { name: /Sign In/i });

  fireEvent.change(input, { target: { value: 'Alex' } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(/Access Granted/i)).toBeInTheDocument();
  });
});

test('shows error modal for Anton', async () => {
  render(<App />);
  const input = screen.getByLabelText(/Username/i);
  const button = screen.getByRole('button', { name: /Sign In/i });

  fireEvent.change(input, { target: { value: 'Anton' } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(/Access Denied/i)).toBeInTheDocument();
  });
});
