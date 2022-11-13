import { useEffect, useState } from 'react';
import './Image.css'
import PapelImg from './papel.png';
import PiedraImg from './piedra.png'
import TijeraImg from './tijera.png';

function ImgPlayer({ imagen }) {
  // Val = Img
  // 0 = Papel
  // 1 = Piedra
  // 2 = Tijeras
  const valor = (a) => {
    if (a === "0") {
      return PapelImg;
    } else if (a === "1") {
      return PiedraImg;
    } else if (a === "2") {
      return TijeraImg;
    }
  }
  return (
    <>
      <img src={valor(imagen)} alt='Papel' className='ImgJuego' />
    </>
  );
}

export default ImgPlayer;