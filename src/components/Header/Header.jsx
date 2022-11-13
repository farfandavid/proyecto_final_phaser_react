import { Link } from 'react-router-dom';
import './styles/Header.css'

function Header() {
  return (
    <header className='top-header'>
      <div className='menu'>
        <h1 className='titulo'>Grupo 13</h1>
        <div className='caja'>
          <Link className='link' to="/"><p>Inicio</p></Link>
          <Link className='link' to="/juegos"><p>Juegos</p></Link>
          <Link className='link' to="/developer"><p>Desarrolladores</p></Link>
        </div>
      </div>
    </header>
  );
}

export default Header;