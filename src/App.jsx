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
} from './redux/gamesSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const gamesArrStatus = useSelector(selectGamesArrStatus),
    genresArrStatus = useSelector(selectGenresArrStatus);

  useEffect(() => {
    if (gamesArrStatus === 'idle') {
      dispatch(fetchGames());
    }
    if (genresArrStatus === 'idle') {
      dispatch(fetchGameGenres());
    }
  }, [dispatch, gamesArrStatus, genresArrStatus]);

  return (
    <main className='w-full'>
      <Appbar>
        <Hero />
        <Highlights />
        <Genres />
        <Footer />
      </Appbar>
    </main>
  );
}

export default App;
