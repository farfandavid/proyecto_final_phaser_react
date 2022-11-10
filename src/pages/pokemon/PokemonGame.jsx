import { useEffect, useState } from "react";
import AtackComp from "../../components/pokemon_game/components/AtackComp";
import Stats from "../../components/pokemon_game/components/Stats";
import { getPokemon, getCountPokemon } from "../../components/pokemon_game/services/getPokemon";
import './styles/pokemon.css'

function PokemonGame() {
  const [player, setPlayer] = useState([]);
  const [enemy, setEnemy] = useState([]);
  const [loading, setLoading] = useState(false);

  const [vidaPlayer, setVidaPlayer] = useState(0);
  const [vidaEnemy, setVidaEnemy] = useState();

  const [turno, setTurno] = useState(1);

  const [atacando, setAtacando] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      Promise.allSettled([
        getPokemon(383),
        getCountPokemon(),
      ]).then(([val1]) => {
        setPlayer(val1.value);
        let idRandom = Math.floor(Math.random() * 905) + 1;
        setVidaPlayer(val1.value.stats[0].base_stat);
        return getPokemon(idRandom);
      }).then((enemy) => {
        console.log(enemy);
        setEnemy(enemy);
        setVidaEnemy(enemy.stats[0].base_stat);
        setLoading(true);

      })

    }, 750);


  }, []);

  useEffect(() => {
    if (atacando) {

      //console.log("Atacando")
      new Promise((resolve, reject) => {
        setTimeout(() => {
          atacar(enemy, player, false);
          setTurno(2);
          resolve();
        }, 1500);
      }).then(() => {
        setTimeout(() => {
          setAtacando(false);
          setTurno(1);
        }, 1500);
      })
    }

  }, [atacando]);

  function atacar(atacante, defensor, isPlayer) {

    let variacion = Math.floor(Math.random() * (100 - 85) + 85);
    let danio = 0.01 * variacion * (((0.2 + 1 * atacante.stats[1].base_stat * 100) / (25 * defensor.stats[2].base_stat)) + 2);
    if (isPlayer) {
      setVidaEnemy(parseInt(vidaEnemy - danio));
      console.log("juegador")
      setTurno(1);
    } else {
      setVidaPlayer(parseInt(vidaPlayer - danio));

      //setTurno(2);
      //setAtacando(false);
      console.log("enemigo")
      //setTurno(1);
    }

    setAtacando(true);

  }

  if (loading) {
    return (
      <div>
        <h1>Pokemon</h1>
        <div className="game-content">
          <div className="game">
            <div className="enemy">
              <div className="topscreen enemy">
                <Stats player={enemy} vida={vidaEnemy}></Stats>
                <img className="sprite" alt="Sprite Player" src={enemy && enemy.sprites.front_default ? enemy.sprites.front_default : ''} />
              </div>
            </div>
            <div className="player">
              <div className="topscreen">
                <img className="sprite" alt="Sprite Player" src={player && player.sprites.back_default ? player.sprites.back_default : ''} />
                <Stats player={player} vida={vidaPlayer}></Stats>
              </div>
              <div className="botscreen">
                <div className="whatdo">
                  <p>What will {String(player && player.name ? player.name : '?').toLocaleUpperCase()} do?</p>
                </div>
                <AtackComp character={turno === 1 ? player : enemy} atacar={() => atacar(player, enemy, true)} atacando={atacando}></AtackComp>
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