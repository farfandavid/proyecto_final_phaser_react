import { useEffect, useState } from "react";
import { getPokemon } from "../components/pokemon_game/services/getPokemon";

function PokemonGame() {
  const [player, setPlayer] = useState([]);
  const [enemy, setEnemy] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      Promise.allSettled([
        getPokemon(1),
        getPokemon(1),
      ]).then(([val1, val2]) => {
        setPlayer(val1.value);
        setEnemy(val2.value);
        setLoading(true);
      })

    }, 750);


  }, [])
  /*try {
    
  } catch (error) {
    
  }*/
  if (loading) {
    return (
      <div>
        <h1>Pokemon</h1>
        <img alt="Sprite Player" src={player.sprites.back_default} />
        <img alt="Sprite Player" src={enemy.sprites.front_default} />
      </div >
    )
  } else {
    return (
      <div>
        <h1>Pokemon</h1>
        <h2>Cargando...</h2>
      </div >
    )

  }
}

export default PokemonGame;