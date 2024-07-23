import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';

import Cards from './Cards';

import { ICharacter } from '../../lib/definitions';

const mockCharacters: ICharacter[] = [
  { name: 'Character1', mass: '70', height: '180' },
  { name: 'Character2', mass: '80', height: '170' },
];

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Cards Component', () => {
  beforeAll(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test('renders without crashing', () => {
    renderWithRouter(<Cards fetchedData={mockCharacters} />);
    expect(screen.getByText(/Name: Character1/i)).toBeInTheDocument();
    expect(screen.getByText(/Name: Character2/i)).toBeInTheDocument();
  });

  test('displays correct number of characters', () => {
    renderWithRouter(<Cards fetchedData={mockCharacters} />);
    const characterElements = screen.getAllByRole('listitem');
    expect(characterElements).toHaveLength(mockCharacters.length);
  });

  test('generates correct links for characters', () => {
    renderWithRouter(<Cards fetchedData={mockCharacters} />, {
      route: '/?page=2',
    });
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/cards/Character1?page=2');
    expect(links[1]).toHaveAttribute('href', '/cards/Character2?page=2');
  });

  test('handles empty data correctly', () => {
    renderWithRouter(<Cards fetchedData={[]} />);
    const characterElements = screen.queryAllByRole('listitem');
    expect(characterElements).toHaveLength(0);
  });

  test('displays correct current page from URL', () => {
    const { container } = renderWithRouter(
      <Cards fetchedData={mockCharacters} />,
      { route: '/?page=3' }
    );
    expect(container.querySelector('ul')).toBeInTheDocument();
    expect(console.log).toHaveBeenCalledWith('3');
  });
});
