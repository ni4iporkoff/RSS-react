import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

const mockCardData = {
  name: 'F',
  height: '175',
  mass: '90',
};

test('renders card component with character data', () => {
  render(<Card character={mockCardData} />);
  expect(screen.getByText(/Name: F/i)).toBeInTheDocument();
  expect(screen.getByText(/Height: 175/i)).toBeInTheDocument();
  expect(screen.getByText(/Weight: 90/i)).toBeInTheDocument();
});
