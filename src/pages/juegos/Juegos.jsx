import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TarjetaJuego from '../../components/juegos/TarjetaJuego';
import './styles/Juegos.css'
import { Howler } from 'howler';

function ListarJuegos() {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    Howler.stop();
    fetch("json/juegos.json")
      .then(response => response.json())
      .then(datos => {
        setJuegos(datos)
      })
  }, []);
  return juegos;
}

function Juegos() {
  const juegos = ListarJuegos();
  return (
    <div>
      <h1>Juegos</h1>
      <div className="contenedor-juegos">
        {
          juegos.map((item) => (
            <Link to={item.link} key={"game_id" + item.id}>
              <TarjetaJuego imagen={item.imagen} nombre={item.titulo}></TarjetaJuego>
            </Link>
          ))
        }
      </div>


    </div>
  );
}

export default Juegos;