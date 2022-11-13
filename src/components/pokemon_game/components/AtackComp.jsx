function AtackComp({ atacando, character, atacar, cambiarContricante, cambiarPokemon }) {

  if (atacando === false) {

    return (
      <div className="opciones cuadro-ataques">
        <p onClick={atacar}>Attack</p>
        <p onClick={cambiarPokemon}>Cambiar Pokemon</p>
        <p onClick={cambiarContricante}>Cambiar Contricante</p>
        <p onClick={() => window.location.reload()}>Recargar</p>
      </div>
    )
  }
  else if (atacando === true) {
    return (
      <div className="atacando cuadro-ataques">
        <p>{String(character && character.name ? character.name : '?').toLocaleUpperCase()} use {String(character && character.moves[0] ? character.moves[0].move.name : '?').toLocaleUpperCase()}</p>
      </div>
    );
  }
}

export default AtackComp;