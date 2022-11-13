import './styles/DeveloperPage.css'
import { useState, useEffect } from 'react';

function ListarDevelopers() {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    fetch("json/desarrolladores.json")
      .then(response => response.json())
      .then(datos => {
        setDevelopers(datos)
      })
  }, []);
  return developers;
}

function DeveloperPage() {
  const desarrolladores = ListarDevelopers();

  return (
    <div>
      <div className="centrar">
        <h1 className="text-shadow">Developers</h1>
      </div>

      <div className="contenedor-juegos">
        {
          desarrolladores.map((item) => (
            <div className="tarjeta-dev">
              <img alt='foto' src={item.img} />
              <label>{item.nombre}</label>
              <label>Edad: {item.edad}</label>
              <label>Intereses: {item.intereses}</label>
              <label><a href={item.github}>GitHub</a></label>
            </div>
          ))
        }
      </div>


    </div>
  );
}

export default DeveloperPage;