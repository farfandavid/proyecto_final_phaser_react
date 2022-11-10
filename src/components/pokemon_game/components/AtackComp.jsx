function AtackComp({ atacando, character, atacar }) {

  if (atacando === false) {

    return (
      <div className="ataques">
        <p onClick={atacar}>Attack</p>
        <p>Cambiar Pokemon</p>
        <p>Cambiar Contricante</p>
        <p>Recargar</p>
      </div>
    )
  }
  else if (atacando === true) {
    return (
      <div className="ataques">
        <p>{String(character && character.name ? character.name : '?').toLocaleUpperCase()} use {String(character && character.moves[0] ? character.moves[0].move.name : '?').toLocaleUpperCase()}</p>
      </div>
    );
  }
}

export default AtackComp;