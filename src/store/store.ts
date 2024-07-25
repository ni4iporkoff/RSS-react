import { configureStore } from '@reduxjs/toolkit';
import charactersReducer, { CharactersState } from './features/charactersSlice';
import characterReducer, { CharacterState } from './features/characterSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    character: characterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { CharactersState, CharacterState };
