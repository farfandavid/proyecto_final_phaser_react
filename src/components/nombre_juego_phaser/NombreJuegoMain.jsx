import Phaser from "phaser";
import { useState, useEffect } from "react";

//TODO Cambiar Nombre
function NombreJuegoMain() {
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-phaser',
    };
    const game = new Phaser.Game(config);

    game.events.on("LISTO", setListo);

    return () => {
      setListo(false);
      game.destroy(true);
    }
  }, [listo])

  return (
    <div id="game-phaser"></div>
  );
}

export default NombreJuegoMain;