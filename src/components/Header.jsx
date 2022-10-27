import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header clearfix" >
      <div className="logo" >
        <p href="#"><em>grupo</em> 13</p>
      </div >
      <a href="#menu" className="menu-link"><i className="fa fa-bars"></i></a>
      <nav id="menu" className="main-nav" role="navigation">
        <ul className="main-menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/Juegos">Juegos</Link></li>
          <li className="has-submenu"><Link to="/Developer">Desarrolladores</Link>
          </li>
        </ul>
      </nav>
    </header >
  );
}

export default Header;