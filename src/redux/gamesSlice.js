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
    currentPageIndex: 1,
    pageSize: 10,
  },
  banner: {
    status: 'idle', // idle | loading | succeeded | failed
    errMessage: '',
    bannerGame: {},
  },
  platforms: {
    status: 'idle', // idle | loading | succeeded | failed
    errMessage: '',
    platformsArr: [],
  },
  gamesPagination: {
    currentPage: {
      status: 'idle', // idle | loading | succeeded | failed
      errMessage: '',
      gamesArr: [],
    },
    currentPageIndex: 1,
    pageSize: 10,
    filterOptions: {
      genre: '',
      platform: '',
    },
  },
  creators: {
    status: 'idle', // idle | loading | succeeded | failed
    errMessage: '',
    creatorsArr: [],
  },
  game: {
    status: 'idle', // idle | loading | succeeded | failed
    errMessage: '',
    game: {},
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

export const fetchPlatforms = createAsyncThunk(
  '/games/fetchPlatforms',
  async () => {
    try {
      const res = await fetch(
        `${RAWG_URL}/platforms?key=${import.meta.env.VITE_RAWGAPI_KEY}`,
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

export const fetchCurrentPageGamesArr = createAsyncThunk(
  '/games/fetchCurrentPageGamesArr',
  async ({ currentPageIndex, pageSize, genre, platform }) => {
    try {
      const res = await fetch(
        `${RAWG_URL}/games?page=${currentPageIndex}&page_size=${pageSize}&${
          genre.length ? `genres=${genre}&` : ''
        }${platform.length ? `platforms=${platform}&` : ''}key=${
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

export const fetchCreators = createAsyncThunk(
  '/games/fetchCreators',
  async () => {
    try {
      const res = await fetch(
        `${RAWG_URL}/creators?key=${import.meta.env.VITE_RAWGAPI_KEY}`,
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

export const fetchGame = createAsyncThunk('/games/fetchGame', async (id) => {
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
});

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGenresSectionFilterGenre: (state, action) => {
      state.genresSection.filterGenre = action.payload;
    },
    setGamesPaginationCurrentPageIndex: (state, action) => {
      state.gamesPagination.currentPageIndex = action.payload;
    },
    setGamesPaginationPageSize: (state, action) => {
      state.gamesPagination.pageSize = action.payload;
    },
    setStoresCurrentPageIndex: (state, action) => {
      state.stores.currentPageIndex = action.payload;
    },
    setStoresPageSize: (state, action) => {
      state.stores.pageSize = action.payload;
    },
    setGamesPaginationFilterOptionsGenre: (state, action) => {
      state.gamesPagination.filterOptions.genre = action.payload;
    },
    setGamesPaginationFilterOptionsPlatforms: (state, action) => {
      state.gamesPagination.filterOptions.platform = action.payload;
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
      })
      .addCase(fetchPlatforms.pending, (state) => {
        state.platforms.status = 'loading';
      })
      .addCase(fetchPlatforms.fulfilled, (state, action) => {
        state.platforms.status = 'succeeded';
        state.platforms.platformsArr = action.payload;
      })
      .addCase(fetchPlatforms.rejected, (state, action) => {
        state.platforms.status = 'failed';
        state.platforms.errMessage = action.payload;
      })
      .addCase(fetchCurrentPageGamesArr.pending, (state) => {
        state.gamesPagination.currentPage.status = 'loading';
      })
      .addCase(fetchCurrentPageGamesArr.fulfilled, (state, action) => {
        state.gamesPagination.currentPage.status = 'succeeded';
        state.gamesPagination.currentPage.gamesArr = action.payload;
      })
      .addCase(fetchCurrentPageGamesArr.rejected, (state, action) => {
        state.gamesPagination.currentPage.status = 'failed';
        state.gamesPagination.currentPage.errMessage = action.payload;
      })
      .addCase(fetchCreators.pending, (state) => {
        state.creators.status = 'loading';
      })
      .addCase(fetchCreators.fulfilled, (state, action) => {
        state.creators.status = 'succeeded';
        state.creators.creatorsArr = action.payload;
      })
      .addCase(fetchCreators.rejected, (state, action) => {
        state.creators.status = 'failed';
        state.creators.errMessage = action.payload;
      })
      .addCase(fetchGame.pending, (state) => {
        state.game.status = 'loading';
      })
      .addCase(fetchGame.fulfilled, (state, action) => {
        state.game.status = 'succeeded';
        state.game.game = action.payload;
      })
      .addCase(fetchGame.rejected, (state, action) => {
        state.game.status = 'failed';
        state.game.errMessage = action.payload;
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
  ),
  selectStoresCurrentPageIndex = createSelector(
    [selectStores],
    (stores) => stores.currentPageIndex
  ),
  selectStoresPageSize = createSelector(
    [selectStores],
    (stores) => stores.pageSize
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

const selectPlatforms = createSelector(
  [selectGames],
  (games) => games.platforms
);
export const selectPlatformsArrStatus = createSelector(
    [selectPlatforms],
    (platforms) => platforms.status
  ),
  selectPlatformsArr = createSelector(
    [selectPlatforms],
    (platforms) => platforms.platformsArr
  );

// Pagination
const selectGamesPagination = createSelector(
  [selectGames],
  (games) => games.gamesPagination
);
export const selectGamesPaginationStatus = createSelector(
    [selectGamesPagination],
    (gamesPagination) => gamesPagination.status
  ),
  selectGamesPaginationCurrentPageIndex = createSelector(
    [selectGamesPagination],
    (gamesPagination) => gamesPagination.currentPageIndex
  ),
  selectGamesPaginationCurrrentPageGamesArr = createSelector(
    [selectGamesPagination],
    (gamesPagination) => gamesPagination.currentPage.gamesArr
  ),
  selectGamesPaginationPageSize = createSelector(
    [selectGamesPagination],
    (gamesPagination) => gamesPagination.pageSize
  );
const selectGamesPaginationFilterOps = createSelector(
  [selectGamesPagination],
  (gamesPagination) => gamesPagination.filterOptions
);
export const selectGamesPaginationFilterOptionsGenre = createSelector(
    [selectGamesPaginationFilterOps],
    (filterOptions) => filterOptions.genre
  ),
  selectGamesPaginationFilterOptionsPlatform = createSelector(
    [selectGamesPaginationFilterOps],
    (filterOptions) => filterOptions.platform
  );

const selectCreators = createSelector([selectGames], (games) => games.creators);
export const selectCreatorsArrStatus = createSelector(
    [selectCreators],
    (creators) => creators.status
  ),
  selectCreatorsArr = createSelector(
    [selectCreators],
    (creators) => creators.creatorsArr
  );

const selectGame = createSelector([selectGames], (games) => games.game);
export const selectGameStatus = createSelector(
    [selectGame],
    (game) => game.status
  ),
  selectGameGame = createSelector([selectGame], (game) => game.game);

export const {
  setGenresSectionFilterGenre,
  setGamesPaginationCurrentPageIndex,
  setGamesPaginationPageSize,
  setStoresCurrentPageIndex,
  setStoresPageSize,
  setGamesPaginationFilterOptionsGenre,
  setGamesPaginationFilterOptionsPlatforms,
} = gamesSlice.actions;

export default gamesSlice.reducer;
