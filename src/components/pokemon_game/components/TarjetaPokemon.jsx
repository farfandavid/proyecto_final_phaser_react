import './styles/TarjetaPokemon.css'

function TarjetaPokemon({ pokemon, cambiar }) {

  return (
    <div className='tarjeta-pokemon' onClick={() => cambiar(pokemon.id)}>
      <img src={pokemon.sprites.front_default} alt={'sprite ' + pokemon.name} />
      <label>{pokemon.name.toUpperCase()}</label>
    </div>
  );
}

export default TarjetaPokemon;