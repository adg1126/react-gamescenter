import Appbar from './components/Appbar/Appbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Genres from './components/Genres';
import Footer from './components/Footer';

import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, selectGamesArrStatus } from './redux/gamesSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const gamesArrStatus = useSelector(selectGamesArrStatus);

  useEffect(() => {
    if (gamesArrStatus === 'idle') {
      dispatch(fetchGames());
    }
  }, [gamesArrStatus, dispatch]);

  return (
    <main>
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
