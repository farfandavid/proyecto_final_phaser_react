import { useEffect, useState } from 'react';
import ImgPlayer from '../../components/piedraPapelTijera/ImgPlayer';
import './styles/PiedraPapelTijeras.css';

function PiedraPapelTijerasPage() {
  const [ganador, setGanador] = useState("");
  const [puntajes, setPuntajes] = useState([0, 0]);
  const [playerOne, setPlayerOne] = useState("0");
  const [playerTwo, setPlayerTwo] = useState("0");
  const [jugar, setJugar] = useState();

  let varPlayerOne = "0";
  let varPlayerTwo = "0";
  let playerWin = "";

  function LanzarDados() {
    setJugar(true);
  }

  useEffect(() => {
    if (jugar) {

      varPlayerOne = Math.floor(Math.random() * 3).toString();
      varPlayerTwo = Math.floor(Math.random() * 3).toString();
      // Val = Img
      // 0 = Papel
      // 1 = Piedra
      // 2 = Tijeras
      console.log(varPlayerOne + " " + varPlayerTwo);
      setPlayerOne(varPlayerOne);
      setPlayerTwo(varPlayerTwo);
      if (varPlayerOne === varPlayerTwo) {
        //setGanador("Empate");
        playerWin = "Empate";
        setPuntajes([puntajes[0], puntajes[1]]);
      } else if (varPlayerOne === "0" && varPlayerTwo === "1") {
        //setGanador("El Jugador 1 es el Ganador!");
        playerWin = "Ganador Jugador 1!";
        setPuntajes([puntajes[0] = 1 + puntajes[0], puntajes[1]]);
      } else if (varPlayerOne === "1" && varPlayerTwo === "2") {
        //setGanador("El Jugador 1 es el Ganador!");
        playerWin = "Ganador Jugador 1!";
        setPuntajes([puntajes[0] = 1 + puntajes[0], puntajes[1]]);
      } else if (varPlayerOne === "2" && varPlayerTwo === "0") {
        //setGanador("El Jugador 1 es el Ganador!");
        playerWin = "Ganador Jugador 1!";
        setPuntajes([puntajes[0] = 1 + puntajes[0], puntajes[1]]);
      } else {
        //setGanador("El Jugador 2 es el Ganador!")
        playerWin = "Ganador Jugador 2!";
        setPuntajes([puntajes[0], puntajes[1] = puntajes[1] + 1]);
      }
      console.log(playerWin);
      setGanador(playerWin);
      setJugar(false);
    }



  }, [jugar]);




  return (
    <div className='Contenedor'>
      <div className='Jugador'>
        <div className='uno'>
          <h1>Jugador 1</h1>
          <ImgPlayer imagen={playerOne}></ImgPlayer>
          <label>Puntaje: {puntajes[0]}</label>
        </div>
        <div className='Estado'>
          <p>{ganador}</p>
        </div>
        <div className='dos'>
          <h1>Jugador 2</h1>
          <ImgPlayer imagen={playerTwo}></ImgPlayer>
          <label>Puntaje:{puntajes[1]} </label>
        </div>
      </div>
      <button className='boton' onClick={LanzarDados} >Jugar</button>
    </div>
  );
}

export default PiedraPapelTijerasPage;