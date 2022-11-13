function TarjetaJuego({ imagen, nombre }) {
  return (
    <div className='tarjeta-juego'>
      <img className='img-juego' alt="imagen-juego" src={imagen} />
      <div className='letra'>{nombre}</div>
    </div>
  );
}

export default TarjetaJuego;