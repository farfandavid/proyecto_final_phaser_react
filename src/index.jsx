import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PokemonGame from './pages/PokemonGame';
import './index.css'
import SpaceShooter from './components/spaceShooter/SpaceShooter'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Header></Header>
    <Routes>
      <Route path='/' element={<PokemonGame />} />
      <Route path="/Juegos" element={<SpaceShooter />} />
      <Route path='/Developer' elements={<h1>NOT FOUND!</h1>} />
      <Route path='*' element={<h1>NOT FOUND!</h1>} />
    </Routes>
    <Footer></Footer>
  </Router>
);