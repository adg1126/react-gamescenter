import Appbar from './components/Appbar/Appbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Genres from './components/Genres';
import Footer from './components/Footer';

function App() {
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
