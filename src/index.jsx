import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PokemonGame from './pages/pokemon/PokemonGame';
import './index.css';
import MainPage from './pages/main/MainPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Header></Header>
    <Routes>
      {/**En esta ruta enlacen su juego para probar */}
      <Route path='/' element={<MainPage></MainPage>} />
      <Route path='/juegos' element={<PokemonGame></PokemonGame>} />
      <Route path='*' element={<h1>NOT FOUND!</h1>} />
    </Routes>
    <Footer></Footer>
  </Router>
);
