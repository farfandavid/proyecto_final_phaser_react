import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import AtackComp from "../../components/pokemon_game/components/AtackComp";
import BusquedaComp from "../../components/pokemon_game/components/SearchList";
import Stats from "../../components/pokemon_game/components/Stats";
import { getPokemon, getCountPokemon, getAllPokemon } from "../../components/pokemon_game/services/getPokemon";
import { Howl, Howler } from "howler";
import BattleSong from '../../sounds/battle_song_pokemon.mp3';
import BattleSong2 from '../../sounds/battle_song_2_pokemon.mp3';
import HitEffect from '../../sounds/hit_pokemon.mp3';
import './styles/pokemon.css'

function PokemonGame() {
  //Datos del enemigo y jugador
  const [player, setPlayer] = useState([]);
  const [enemy, setEnemy] = useState([]);

  //Pokemon elegido comienza con el primero : Bulbasaur
  const [pokemonElegido, setPokemonElegido] = useState(1);
  //Condicion de carga
  const [loading, setLoading] = useState(false);

  //Vida del Enemigo y Jugador que varia segun el daño recibido
  const [vidaPlayer, setVidaPlayer] = useState(0);
  const [vidaEnemy, setVidaEnemy] = useState();

  //Turno
  const [turno, setTurno] = useState(1);
  //Condiciones
  const [atacando, setAtacando] = useState(false);

  const [victoria, setVictoria] = useState(false);

  const [estadoModal, setEstadoModal] = useState(false);
  const [recibioDanio, setRecibioDanio] = useState(false);
  //Lista de todos los Pokemons
  const [listaPokemon, setListaPokemon] = useState([]);
  //Lista filtrada segun el nombre del Pokemon
  const [searchList, setSearchList] = useState([]);



  useEffect(() => {
    setTimeout(() => {
      Promise.allSettled([
        //Obtiene el primer Pokemon
        getPokemon(pokemonElegido),
        //Los Pokemon Totales
        getCountPokemon(),
      ]).then(([val1]) => {
        //Carga los datos del jugador con un Pokemon
        setPlayer(val1.value);
        //Se crea un numero random para elegir y asignar al enemigo
        let idRandom = Math.floor(Math.random() * 905) + 1;
        //Se carga la vida del Jugador comienza con la vida total del pokemon
        setVidaPlayer(val1.value.stats[0].base_stat);
        return getPokemon(idRandom);
      }).then((enemy) => {
        console.log(enemy);
        //Se carga el enemigo con el Pokemon elegido aleatoriamente
        setEnemy(enemy);
        //Se carga la vida del Enemigo comienza con la vida total del pokemon
        setVidaEnemy(enemy.stats[0].base_stat);
        //La pantalla de carga finaliza
        setLoading(true);

      })

    }, 750);


  }, [victoria]);

  useEffect(() => {
    if (atacando) {
      //Ataca el enemigo
      if (vidaEnemy <= 0) {
        console.log("Ganaste");
        setAtacando(false);
        setTurno(1);
        setVictoria(!victoria);
      } else {
        new Promise((resolve, reject) => {
          //***Tiempo de espera para atacar*/
          setTimeout(() => {
            atacar(enemy, player, false);
            setTurno(2);
            resolve();
          }, 1500);
        }).then(() => {
          //Cambia el turno y el modo atacando
          setTimeout(() => {
            setAtacando(false);
            setRecibioDanio(true);
            setTurno(1);
          }, 1500);

        });

      }
    } else {
      new Promise((resolve, reject) => {
        //***Cambia el filtro para recibir danio */
        console.log("atacando");
        setTimeout(() => {
          setRecibioDanio(false);
          resolve();
        }, 1500);
      })
    }

  }, [atacando]);

  useEffect(() => {
    //Activa el Modal
  }, [estadoModal])

  useEffect(() => {
    //Reproduce la lista de musica
    soundBattle.play();
    fetchPokemons();
  }, [])

  //Configuracion de los Sonidos de Batallas
  const soundBattle = new Howl({
    src: [BattleSong],
    volume: 0.3,
    onend: function () {
      soundBattle2.play();
    }
  });
  const soundBattle2 = new Howl({
    src: [BattleSong2],
    volume: 0.3,
    onend: function () {
      soundBattle.play();
    }
  });
  //Configuracion del Sonido de Golpear
  const soundHit = new Howl({
    src: HitEffect,
    volume: 0.7,
  });

  //Se carga la lista de todos los pokemons
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

  //Filtra los Pokemon que incluya lo escrito en el Input
  const filtrarPokemon = (e) => {
    const filtro = listaPokemon.filter(item => {
      //console.log(item.name);
      return item.name.toLowerCase().includes(e.target.value.toLowerCase())
    });
    //Se agrega a la lista de Filtrados
    setSearchList(filtro);
    //console.log(filtro);
  }

  //Cambia de pokemon segun la Id del Pokemon Seleccionado
  const cambiarPokemon = (idPokemon) => {
    setPokemonElegido(idPokemon);
    setEstadoModal(false);
    setVictoria(!victoria);
  }

  //Al derrotar cambia de contricante
  const cambiarContricante = () => {
    setVictoria(!victoria);
  }
  //Abre el modal
  const abrirModal = () => {
    setEstadoModal(true);
  }

  //Metodo para Atacar se Recibe un Atacan Defensor y si es Jugador o No
  const atacar = (atacante, defensor, isPlayer) => {
    //Variable de suerte
    let variacion = Math.floor(Math.random() * (100 - 85) + 85);
    //Formula de Danio
    let danio = 0.01 * variacion * (((0.2 + 1 * atacante.stats[1].base_stat * 100) / (25 * defensor.stats[2].base_stat)) + 2);
    if (isPlayer) {
      //Si el jugador ataca se reduce la vida al enemigo
      if (vidaPlayer > 0) {
        setVidaEnemy(parseInt(vidaEnemy - danio));
        soundHit.play();
      }

    } else {
      //Si el enemigo ataca se reduce la vida al jugador
      if (danio > vidaPlayer) {
        setVidaPlayer(0);
        setEstadoModal(true);
        soundHit.play();
      } else {
        setVidaPlayer(parseInt(vidaPlayer - danio));

        soundHit.play();
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
                <img className={`sprite ${turno === 2 ? 'take-damage' : ''}`} alt="Sprite Player" src={enemy && enemy.sprites.front_default ? enemy.sprites.front_default : ''} />
              </div>
            </div>
            <div className="player">
              <div className="topscreen">
                <img className={`sprite ${recibioDanio === true ? 'take-damage' : ''}`} alt="Sprite Player" src={player && player.sprites.back_default ? player.sprites.back_default : ''} />
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