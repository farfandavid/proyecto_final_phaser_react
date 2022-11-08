import { useEffect, useState } from "react";
import { getPokemon, getCountPokemon } from "../../components/pokemon_game/services/getPokemon";
import './styles/pokemon.css'

function PokemonGame() {
  const [player, setPlayer] = useState([]);
  const [enemy, setEnemy] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      Promise.allSettled([
        getPokemon(1),
        getCountPokemon(),
      ]).then(([val1, count]) => {
        setPlayer(val1.value);
        //setEnemy(val2.value);
        //console.log(count.value.count);
        //setLoading(true);
        let idRandom = Math.floor(Math.random() * 905) + 1;
        return getPokemon(idRandom);
      }).then((enemy) => {
        console.log(enemy);
        setEnemy(enemy);
        setLoading(true);
      })

    }, 750);


  }, [])



  if (loading) {
    return (
      <div>
        <h1>Pokemon</h1>
        <div className="game-content">
          <div className="game">
            <div className="enemy">
              <div className="topscreen enemy">
                <div className="stats">
                  <p>{String(enemy && enemy.name ? enemy.name : '?').toLocaleUpperCase()}</p>
                  <progress max={100} value={80} className="health"></progress>
                  <p>20/20</p>
                </div>
                <img className="sprite" alt="Sprite Player" src={enemy && enemy.sprites.front_default ? enemy.sprites.front_default : ''} />
              </div>
            </div>
            <div className="player">
              <div className="topscreen">
                <img className="sprite" alt="Sprite Player" src={player && player.sprites.back_default ? player.sprites.back_default : ''} />
                <div className="stats">
                  <p>{String(player && player.name ? player.name : '?').toLocaleUpperCase()}</p>
                  <progress max={100} value={80} className="health"></progress>
                  <p>20/20</p>
                </div>
              </div>
              <div className="botscreen">
                <div className="whatdo">
                  <p>What will {String(player && player.name ? player.name : '?').toLocaleUpperCase()} do?</p>
                </div>
                <div className="ataques">
                  <p>Latigo</p>
                  <p>Cabezazo</p>
                  <p>Mordisco</p>
                  <p>Disparo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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