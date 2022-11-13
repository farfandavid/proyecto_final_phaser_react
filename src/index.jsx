import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PokemonGame from './pages/pokemon/PokemonGame';
import './index.css';
import MainPage from './pages/main/MainPage';
import Juegos from './pages/juegos/Juegos';
import Arkanoid from './pages/arkanoid/Arkanoid';
import AhorcadoPage from './pages/ahorcado/AhorcadoPage';
import PiedraPapelTijerasPage from './pages/piedrapapeltijeras/PiedraPapelTijerasPage';
import DeveloperPage from './pages/developer/DeveloperPage';
import SpaceShooter from './components/space/SpaceShooter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Header></Header>
    <Routes>
      {/**En esta ruta enlacen su juego para probar */}
      <Route path='/' element={<MainPage></MainPage>} />
      <Route path='/juegos' element={<Juegos></Juegos>} />
      <Route path='/developer' element={<DeveloperPage></DeveloperPage>} />
      <Route path='/pokemon' element={<PokemonGame></PokemonGame>} />
      <Route path='/arkanoid' element={<Arkanoid></Arkanoid>} />
      <Route path='/ahorcado' element={<AhorcadoPage></AhorcadoPage>} />
      <Route path='/piedrapapeltijeras' element={<PiedraPapelTijerasPage></PiedraPapelTijerasPage>} />
      {/**MOdificar el router */}
      <Route path='/spaceshooter' element={<SpaceShooter></SpaceShooter>} />
      <Route path='*' element={<h1>NOT FOUND!</h1>} />
    </Routes>
    <Footer></Footer>
  </Router>
);