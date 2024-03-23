import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RAWG_URL } from '../constants';

const initialState = {
  status: 'idle', // idle | loading | succeeded | failed
  errMessage: '',
  gamesArr: [],
  filterOptions: {
    price: { min: 1, max: 1000 },
    category: '',
    sortBy: 'Default',
  },
  filteredGamesArr: [],
};

export const fetchGames = createAsyncThunk('/games/fetchGames', async () => {
  try {
    const res = await fetch(
      `${RAWG_URL}?key=${import.meta.env.VITE_RAWGAPI_KEY}`,
      {
        method: 'GET',
      }
    );
    const data = await res.json();

    return data.results;
  } catch (err) {
    return err.message;
  }
});

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gamesArr = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        state.errMessage = action.payload;
      });
  },
});

const selectGames = (state) => state.games;

export const selectGamesArr = createSelector(
    [selectGames],
    (games) => games.gamesArr
  ),
  selectGamesArrStatus = createSelector([selectGames], (games) => games.status);

export default gamesSlice.reducer;
