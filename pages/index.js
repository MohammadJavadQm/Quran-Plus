import Header from '../components/home/Header';
import Herosection from '../components/home/Herosection';
import QuranPlus from '../components/home/QuranPlus';
import ChatSimulator from '../components/home/ChatSimulator';
import Footer from '../components/home/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <Herosection />
      <QuranPlus />
      <ChatSimulator />
      <Footer />
    </div>
  );
}

export default App;