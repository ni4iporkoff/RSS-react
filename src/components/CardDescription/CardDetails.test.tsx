// src/components/CardDescription/CardDetails.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Используем для расширенных матчеров, таких как .toBeInTheDocument()
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CardDetails from './CardDetails';

// Мок данных для useLoaderData
const mockData = {
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      films: ['A New Hope', 'The Empire Strikes Back'],
      vehicles: ['Speeder Bike'],
    },
  ],
};

// Мокируем модуль react-router-dom
vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    useLoaderData: () => mockData,
    MemoryRouter: original.MemoryRouter,
  };
});

describe('CardDetails Component', () => {
  test('renders card details with correct data', () => {
    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );

    // Проверяем, что все данные отображаются корректно
    expect(screen.getByText('Name: Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
    expect(screen.getByText('Hair color: blond')).toBeInTheDocument();
    expect(screen.getByText('Eye color: blue')).toBeInTheDocument();
    expect(screen.getByText('Birth year: 19BBY')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Films: 2')).toBeInTheDocument(); // films.length = 2
    expect(screen.getByText('Vehicles: 1')).toBeInTheDocument(); // vehicles.length = 1
  });
});
