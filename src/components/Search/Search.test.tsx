import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import Search from './Search';

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders the search component', () => {
    render(<Search handleSearch={vi.fn()} />);
    expect(
      screen.getByPlaceholderText('Search pokemon...')
    ).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('displays initial value from localStorage', () => {
    localStorage.setItem('searchValue', 'Pikachu');
    render(<Search handleSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText('Search pokemon...')).toHaveValue(
      'Pikachu'
    );
  });

  test('updates input value on change', () => {
    render(<Search handleSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(
      'Search pokemon...'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Charizard' } });
    expect(input).toHaveValue('Charizard');
  });

  test('calls handleSearch and updates localStorage on form submit', () => {
    const handleSearch = vi.fn();
    render(<Search handleSearch={handleSearch} />);
    const input = screen.getByPlaceholderText(
      'Search pokemon...'
    ) as HTMLInputElement;
    const submitButton = screen.getByText('Search') as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'Bulbasaur' } });
    fireEvent.click(submitButton);

    expect(handleSearch).toHaveBeenCalledWith('Bulbasaur');
    expect(localStorage.getItem('searchValue')).toBe('Bulbasaur');
  });

  test('does not call handleSearch if input is empty on submit', () => {
    const handleSearch = vi.fn();
    render(<Search handleSearch={handleSearch} />);
    const submitButton = screen.getByText('Search') as HTMLButtonElement;

    fireEvent.click(submitButton);

    expect(handleSearch).not.toHaveBeenCalled();
    expect(localStorage.getItem('searchValue')).toBe(null);
  });
});
