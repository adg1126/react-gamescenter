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
} from './redux/gamesSlice';
import { useEffect } from 'react';
import OurStore from './components/OurStore';

function App() {
  const dispatch = useDispatch();
  const gamesArrStatus = useSelector(selectGamesArrStatus),
    genresArrStatus = useSelector(selectGenresArrStatus),
    storesArrStatus = useSelector(selectStoresArrStatus);

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
  }, [dispatch, gamesArrStatus, genresArrStatus, storesArrStatus]);

  return (
    <main className='w-full'>
      <Appbar>
        <Hero />
        <Highlights />
        <Genres />
        <OurStore />
        <Footer />
      </Appbar>
    </main>
  );
}

export default App;
