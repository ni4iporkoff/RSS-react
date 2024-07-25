import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import characterReducer from '../../store/features/characterSlice';
import CardDetails from './CardDetails';

interface CharacterState {
  character: {
    count: number;
    next: string;
    previous: string;
    results: {
      name: string;
      height: string;
      mass: string;
      hair_color: string;
      eye_color: string;
      birth_year: string;
      gender: string;
      films: string[];
      vehicles: string[];
    }[];
  } | null;
  loading: boolean;
  error: boolean;
}

const createTestStore = (initialState: CharacterState) =>
  configureStore({
    reducer: {
      character: characterReducer,
    },
    preloadedState: { character: initialState },
  });

const renderWithStore = (
  ui: React.ReactElement,
  store: ReturnType<typeof createTestStore>
) =>
  render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );

describe('CardDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display character details when data is loaded', async () => {
    const initialState: CharacterState = {
      character: {
        count: 1,
        next: '',
        previous: '',
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
      },
      loading: false,
      error: false,
    };

    const store = createTestStore(initialState);

    renderWithStore(<CardDetails />, store);

    const character = initialState.character?.results[0];
    if (character) {
      expect(screen.getByText(`Name: ${character.name}`)).toBeInTheDocument();
      expect(
        screen.getByText(`Height: ${character.height}`)
      ).toBeInTheDocument();
      expect(screen.getByText(`Mass: ${character.mass}`)).toBeInTheDocument();
      expect(
        screen.getByText(`Hair color: ${character.hair_color}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Eye color: ${character.eye_color}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Birth year: ${character.birth_year}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Gender: ${character.gender}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Films: ${character.films.length}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Vehicles: ${character.vehicles.length}`)
      ).toBeInTheDocument();
    }
  });

  it('should display Loader with correct alt text when loading', () => {
    const initialState: CharacterState = {
      character: null,
      loading: true,
      error: false,
    };

    const store = createTestStore(initialState);

    renderWithStore(<CardDetails />, store);

    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
  });
});
