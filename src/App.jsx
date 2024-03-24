import Appbar from './components/Appbar/Appbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Genres from './components/Genres';
import Footer from './components/Footer';

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
} from './redux/gamesSlice';
import { useEffect } from 'react';
import OurStore from './components/OurStore';

function App() {
  const dispatch = useDispatch();
  const gamesArrStatus = useSelector(selectGamesArrStatus),
    genresArrStatus = useSelector(selectGenresArrStatus),
    storesArrStatus = useSelector(selectStoresArrStatus),
    gamesArr = useSelector(selectGamesArr),
    bannerStatus = useSelector(selectBannerStatus);

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
  }, [
    dispatch,
    gamesArrStatus,
    genresArrStatus,
    storesArrStatus,
    gamesArr,
    bannerStatus,
  ]);

  return (
    <main className='w-full'>
      <Appbar>
        <Hero />
        <Highlights />
        <Genres />
        <OurStore />
        <Footer />
        <Footer />
      </Appbar>
    </main>
  );
}

export default App;
