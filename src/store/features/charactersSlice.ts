import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCharacters, fetchSearchCharacters } from '../../lib/data';
import { RootState } from '../store';
import { IData } from '../../lib/definitions';

export interface CharactersState {
  data: IData | null;
  loading: boolean;
  error: boolean;
  pageQty: number;
  initialPage: number;
}

const initialState: CharactersState = {
  data: null,
  loading: true,
  error: false,
  pageQty: 0,
  initialPage: 1,
};

export const fetchCharactersAsync = createAsyncThunk<IData, string>(
  'characters/fetchCharacters',
  async (page: string) => {
    const response = await fetchCharacters(page);
    return response;
  }
);

export const fetchSearchCharactersAsync = createAsyncThunk<IData, string>(
  'characters/fetchSearchCharacters',
  async (searchValue: string) => {
    const response = await fetchSearchCharacters(searchValue);
    return response;
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharactersAsync.fulfilled, (state, action) => {
        state.data = action.payload;
        state.pageQty = Math.ceil(action.payload.count / 10);
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchCharactersAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchSearchCharactersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchCharactersAsync.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchSearchCharactersAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setError } = charactersSlice.actions;

export const selectCharacters = (state: RootState) => state.characters;

export default charactersSlice.reducer;
