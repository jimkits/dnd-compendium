import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import './App.css';
import Header from "./components/Header";
import Home from './components/Home';
import Hero from './components/Hero';
import Monster from './components/Monster';
import Navigation from './components/Navigation'

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <div className='flex-center'>
          <div className="flex-centre-top">
            <Header />
          </div>
          <div className="nav-bar">
            <Navigation />
          </div>
          <div className="flex-centre-bottom">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/hero' element={<Hero />} />
              <Route path='/monster' element={<Monster />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
