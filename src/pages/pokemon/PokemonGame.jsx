import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import AtackComp from "../../components/pokemon_game/components/AtackComp";
import BusquedaComp from "../../components/pokemon_game/components/SearchList";
import Stats from "../../components/pokemon_game/components/Stats";
import { getPokemon, getCountPokemon, getAllPokemon } from "../../components/pokemon_game/services/getPokemon";
import './styles/pokemon.css'

function PokemonGame() {
  const [player, setPlayer] = useState([]);
  const [enemy, setEnemy] = useState([]);

  const [pokemonElegido, setPokemonElegido] = useState(1);
  const [loading, setLoading] = useState(false);

  const [vidaPlayer, setVidaPlayer] = useState(0);
  const [vidaEnemy, setVidaEnemy] = useState();

  const [turno, setTurno] = useState(1);

  const [atacando, setAtacando] = useState(false);

  const [victoria, setVictoria] = useState(false);

  const [estadoModal, setEstadoModal] = useState(false);

  const [listaPokemon, setListaPokemon] = useState([]);
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      Promise.allSettled([
        getPokemon(pokemonElegido),
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


  }, [victoria]);

  useEffect(() => {
    if (atacando) {

      //console.log("Atacando")
      //Ataca el enemigo
      if (vidaEnemy <= 0) {
        console.log("Ganaste");
        setAtacando(false);
        setTurno(1);
        setVictoria(!victoria);
      } else {

        new Promise((resolve, reject) => {
          setTimeout(() => {
            atacar(enemy, player, false);
            setTurno(2);
            resolve();
          }, 1500);
        }).then(() => {
          //Cambia el turno y el modo atacando
          setTimeout(() => {
            setAtacando(false);
            setTurno(1);
          }, 1500);
        })
      }
    }

  }, [atacando]);

  useEffect(() => {
    //console.log(listaPokemon[0]);
  }, [estadoModal])

  useEffect(() => {
    fetchPokemons();
  }, [])

  const fetchPokemons = async () => {
    try {
      const data = await getAllPokemon();
      const promises = data.results.map(async (pokemon, id) => {
        return await getPokemon(id + 1)
      });
      const results = await Promise.all(promises);
      //console.log(results);
      setListaPokemon(results);
    } catch (error) {

    }
  }

  const filtrarPokemon = (e) => {
    const filtro = listaPokemon.filter(item => {
      //console.log(item.name);
      return item.name.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setSearchList(filtro);
    //console.log(filtro);
  }

  const cambiarPokemon = (idPokemon) => {
    setPokemonElegido(idPokemon);
    setEstadoModal(false);
    setVictoria(!victoria);
  }

  const cambiarContricante = () => {
    setVictoria(!victoria);
  }

  const abrirModal = () => {
    setEstadoModal(true);
  }

  const atacar = (atacante, defensor, isPlayer) => {
    //Variable de suerte
    let variacion = Math.floor(Math.random() * (100 - 85) + 85);
    //Formula de Danio
    let danio = 0.01 * variacion * (((0.2 + 1 * atacante.stats[1].base_stat * 100) / (25 * defensor.stats[2].base_stat)) + 2);
    if (isPlayer) {
      //Si el jugador ataca se reduce la vida al enemigo
      if (vidaPlayer > 0) {
        setVidaEnemy(parseInt(vidaEnemy - danio));
      }

    } else {
      //Si el enemigo ataca se reduce la vida al jugador
      if (danio > vidaPlayer) {
        setVidaPlayer(0);
        setEstadoModal(true);
      } else {
        setVidaPlayer(parseInt(vidaPlayer - danio));
      }

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
                <AtackComp
                  character={turno === 1 ? player : enemy}
                  atacar={() => atacar(player, enemy, true)}
                  atacando={atacando}
                  cambiarContricante={cambiarContricante}
                  cambiarPokemon={abrirModal}
                ></AtackComp>
              </div>
            </div>
          </div>
        </div>
        <Modal
          estado={estadoModal} cambiarEstado={setEstadoModal} titulo="Perdiste"
          mostrarHeader={vidaPlayer <= 0}>
          <BusquedaComp
            filtrarPokemon={filtrarPokemon}
            cambiarPokemon={cambiarPokemon}
            searchList={searchList}>

          </BusquedaComp>
        </Modal >
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