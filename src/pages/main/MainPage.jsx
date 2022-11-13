import { Link } from 'react-router-dom';
import './styles/MainPage.css'

function MainPage() {
  return (
    /** fragment que permite devolver mas de un elemento, devuelve un <h2> con el nombre de nuestro grupo, una etiqueta <div> que es un boton que permite acceder al juego y un <h5>con el nombre de la materia. Hay algunas etiquetas div para poder darle diferentes estilos en CSS   */
    <>
      <div className='MenuEstilo'>
        <h2>Grupo 13  </h2>
        <div className='centrar'>
          <div className='boton'><Link to="/juegos">Jugar</Link></div>
        </div>
        <h5>Fundamentos de programacion web </h5>
      </div>

    </>

  );
}

//----------Exportaciones---------//

export default MainPage;
