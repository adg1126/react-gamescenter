import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RAWG_URL } from '../constants';

const initialState = {
  status: 'idle', // idle | loading | succeeded | failed
  errMessage: '',
  gamesArr: [],
  genres: {
    status: 'idle', // idle | loading | succeeded | failed
    errMessage: '',
    genresArr: [],
  },
  genresSection: {
    status: 'idle', // idle | loading | succeeded | failed
    errMessage: '',
    filteredGamesArr: [],
    filterGenre: '',
  },
  stores: {
    status: 'idle', // idle | loading | succeeded | failed
    errMessage: '',
    storesArr: [],
  },
  banner: {
    status: 'idle', // idle | loading | succeeded | failed
    errMessage: '',
    bannerGame: {},
  },
};

export const fetchGames = createAsyncThunk('/games/fetchGames', async () => {
  try {
    const res = await fetch(
      `${RAWG_URL}/games?key=${import.meta.env.VITE_RAWGAPI_KEY}`,
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

export const fetchGameGenres = createAsyncThunk(
  '/games/fetchGameGenres',
  async () => {
    try {
      const res = await fetch(
        `${RAWG_URL}/genres?key=${import.meta.env.VITE_RAWGAPI_KEY}`,
        {
          method: 'GET',
        }
      );
      const data = await res.json();

      return data.results;
    } catch (err) {
      return err.message;
    }
  }
);

export const fetchGamesByGenre = createAsyncThunk(
  '/games/fetchGamesByGenre',
  async (genre) => {
    try {
      const res = await fetch(
        `${RAWG_URL}/games?genres=${genre}&key=${
          import.meta.env.VITE_RAWGAPI_KEY
        }`,
        {
          method: 'GET',
        }
      );
      const data = await res.json();
      return data.results;
    } catch (err) {
      return err.message;
    }
  }
);

export const fetchStores = createAsyncThunk('/games/fetchStores', async () => {
  try {
    const res = await fetch(
      `${RAWG_URL}/stores?key=${import.meta.env.VITE_RAWGAPI_KEY}`,
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

export const fetchBannerGame = createAsyncThunk(
  '/games/fetchBannerGame',
  async (id) => {
    try {
      const res = await fetch(
        `${RAWG_URL}/games/${id}?key=${import.meta.env.VITE_RAWGAPI_KEY}`,
        {
          method: 'GET',
        }
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGenresSectionFilterGenre: (state, action) => {
      state.genresSection.filterGenre = action.payload;
    },
  },
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
      })
      .addCase(fetchGameGenres.pending, (state) => {
        state.genres.status = 'loading';
      })
      .addCase(fetchGameGenres.fulfilled, (state, action) => {
        state.genres.status = 'succeeded';
        state.genres.genresArr = action.payload;
      })
      .addCase(fetchGameGenres.rejected, (state, action) => {
        state.genres.status = 'failed';
        state.genres.errMessage = action.payload;
      })
      .addCase(fetchGamesByGenre.pending, (state) => {
        state.genresSection.status = 'loading';
      })
      .addCase(fetchGamesByGenre.fulfilled, (state, action) => {
        state.genresSection.status = 'succeeded';
        state.genresSection.filteredGamesArr = action.payload;
      })
      .addCase(fetchGamesByGenre.rejected, (state, action) => {
        state.genresSection.status = 'failed';
        state.genresSection.errMessage = action.payload;
      })
      .addCase(fetchStores.pending, (state) => {
        state.stores.status = 'loading';
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.stores.status = 'succeeded';
        state.stores.storesArr = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.stores.status = 'failed';
        state.stores.errMessage = action.payload;
      })
      .addCase(fetchBannerGame.pending, (state) => {
        state.banner.status = 'loading';
      })
      .addCase(fetchBannerGame.fulfilled, (state, action) => {
        state.banner.status = 'succeeded';
        state.banner.bannerGame = action.payload;
      })
      .addCase(fetchBannerGame.rejected, (state, action) => {
        state.banner.status = 'failed';
        state.banner.errMessage = action.payload;
      });
  },
});

const selectGames = (state) => state.games;

export const selectGamesArr = createSelector(
    [selectGames],
    (games) => games.gamesArr
  ),
  selectGamesArrStatus = createSelector([selectGames], (games) => games.status);

const selectGenres = createSelector([selectGames], (games) => games.genres);
export const selectGenresArrStatus = createSelector(
    [selectGenres],
    (genres) => genres.status
  ),
  selectGenresArr = createSelector(
    [selectGenres],
    (genres) => genres.genresArr
  );

const selectGenresSection = createSelector(
  [selectGames],
  (games) => games.genresSection
);
export const selectGenresSectionFilterGenre = createSelector(
    [selectGenresSection],
    (genresSection) => genresSection.filterGenre
  ),
  selectGenresSectionGamesArrFilteredByGenre = createSelector(
    [selectGenresSection],
    (genresSection) => genresSection.filteredGamesArr
  );

const selectStores = createSelector([selectGames], (games) => games.stores);
export const selectStoresArrStatus = createSelector(
    [selectStores],
    (stores) => stores.status
  ),
  selectStoresArr = createSelector(
    [selectStores],
    (stores) => stores.storesArr
  );

const selectBanner = createSelector([selectGames], (games) => games.banner);
export const selectBannerStatus = createSelector(
    [selectBanner],
    (banner) => banner.status
  ),
  selectBannerGame = createSelector(
    [selectBanner],
    (banner) => banner.bannerGame
  );

export const { setGenresSectionFilterGenre } = gamesSlice.actions;

export default gamesSlice.reducer;
