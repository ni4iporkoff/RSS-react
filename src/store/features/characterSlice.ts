import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSearchCharacters } from '../../lib/data';
import { RootState } from '../store';
import { IData } from '../../lib/definitions';

export interface CharacterState {
  character: IData | null;
  loading: boolean;
  error: boolean;
}

const initialState: CharacterState = {
  character: null,
  loading: true,
  error: false,
};

export const fetchCharacterAsync = createAsyncThunk<IData, string>(
  'character/fetchCharacter',
  async (searchValue: string) => {
    const response = await fetchSearchCharacters(searchValue);
    return response;
  }
);

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacterAsync.fulfilled, (state, action) => {
        state.character = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchCharacterAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setError } = characterSlice.actions;

export const selectCharacter = (state: RootState) => state.character;

export default characterSlice.reducer;
