import TarjetaPokemon from "./TarjetaPokemon";

function BusquedaComp({ filtrarPokemon, cambiarPokemon, searchList }) {
  return (
    <>
      <div className="div-search">
        <input className="input-search"
          placeholder="Ingrese el Nombre del Pokemon ej.: Pikachu"
          onInput={(e) => filtrarPokemon(e)}></input>
      </div>
      <div className="lista-pokemon">
        {searchList.map((val) => {
          return <TarjetaPokemon key={'pokemon_id:' + val.id} pokemon={val} cambiar={cambiarPokemon}></TarjetaPokemon>
        })}
      </div>
    </>
  );
}

export default BusquedaComp;