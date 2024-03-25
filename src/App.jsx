import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGames,
  selectGamesArrStatus,
  fetchGameGenres,
  selectGenresArrStatus,
  fetchStores,
  selectStoresArrStatus,
  selectGamesArr,
  fetchBannerGame,
  selectBannerStatus,
  selectGamesPaginationStatus,
  selectGamesPaginationCurrentPageIndex,
  fetchCurrentPageGamesArr,
  selectGamesPaginationPageSize,
  fetchCreators,
  selectCreatorsArrStatus,
} from './redux/gamesSlice';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Appbar from './components/Appbar/Appbar';
import Home from './pages/Home';
import Creators from './pages/Creators';
import Stores from './pages/Stores';
import Games from './pages/Games';

function App() {
  const dispatch = useDispatch();
  const gamesArrStatus = useSelector(selectGamesArrStatus),
    genresArrStatus = useSelector(selectGenresArrStatus),
    storesArrStatus = useSelector(selectStoresArrStatus),
    gamesArr = useSelector(selectGamesArr),
    bannerStatus = useSelector(selectBannerStatus),
    gamesPaginationStatus = useSelector(selectGamesPaginationStatus),
    gamesPaginationCurrentPageIndex = useSelector(
      selectGamesPaginationCurrentPageIndex
    ),
    gamesPaginationPageSize = useSelector(selectGamesPaginationPageSize),
    creatorsArrStatus = useSelector(selectCreatorsArrStatus);

  const getRandomeGame = (arr) => arr[Math.floor(Math.random() * arr.length)];

  useEffect(() => {
    if (gamesArrStatus === 'idle') {
      dispatch(fetchGames());
    }
    if (genresArrStatus === 'idle') {
      dispatch(fetchGameGenres());
    }
    if (storesArrStatus === 'idle') {
      dispatch(fetchStores());
    }
    if (gamesArr.length > 0) {
      const b = getRandomeGame(gamesArr);
      if (bannerStatus === 'idle') {
        dispatch(fetchBannerGame(b.id));
      }
    }
    dispatch(
      fetchCurrentPageGamesArr({
        currentPageIndex: gamesPaginationCurrentPageIndex,
        pageSize: gamesPaginationPageSize,
      })
    );

    if (creatorsArrStatus === 'idle') {
      dispatch(fetchCreators());
    }
  }, [
    dispatch,
    gamesArrStatus,
    genresArrStatus,
    storesArrStatus,
    gamesArr,
    bannerStatus,
    gamesPaginationStatus,
    gamesPaginationCurrentPageIndex,
    gamesPaginationPageSize,
    creatorsArrStatus,
  ]);

  return (
    <main className='w-full'>
      <BrowserRouter>
        <Appbar>
          <Routes>
            <Route
              exact
              path='/'
              Component={Home}
            />
            <Route
              exact
              path='/creators'
              Component={Creators}
            />
            <Route
              exact
              path='/stores'
              Component={Stores}
            />
            <Route
              exact
              path='/games'
              Component={Games}
            />
          </Routes>
        </Appbar>
      </BrowserRouter>
    </main>
  );
}

export default App;
