import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header></Header>
      <Routes>
        {/**En esta ruta enlacen su juego para probar */}
        <Route path='/' />
        <Route path='/Developer' />
        <Route path='*' element={<h1>NOT FOUND!</h1>} />
      </Routes>
      <Footer></Footer>
    </Router>
  </React.StrictMode>
);
