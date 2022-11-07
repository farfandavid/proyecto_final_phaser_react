import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PokemonGame from './pages/PokemonGame';
import NombreJuegoMain from './components/nombre_juego_phaser/NombreJuegoMain';
import './index.css'
import DevelopersPage from './pages/DevelopersPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Header></Header>
    <Routes>
      {/**En esta ruta enlacen su juego para probar */}
      <Route path='/' element={<PokemonGame></PokemonGame>} />
      <Route path = "/Juegos" element = {<NombreJuegoMain/>} />
      <Route path='/Developer' elements = {<DevelopersPage/>} />
      <Route path='*' element={<h1>NOT FOUND!</h1>} />
    </Routes>
    <Footer></Footer>
  </Router>
);
