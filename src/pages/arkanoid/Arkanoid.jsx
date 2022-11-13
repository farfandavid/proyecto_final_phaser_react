import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import { Escena } from '../../components/arkanoid/components/Escena';
import { GameOver } from '../../components/arkanoid/components/GameOver';
import { Win } from '../../components/arkanoid/components/Win';
import { Escena2 } from '../../components/arkanoid/components/Escena2';
import { NextLevel } from '../../components/arkanoid/components/NextLevel';
import { Menu } from '../../components/arkanoid/components/Menu';
import { Niveles } from '../../components/arkanoid/components/Niveles';
import './styles/Arkanoid.css'

function Arkanoid() {

  const [Listo, setListo] = useState(false);

  useEffect(() => {

    var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 450,
      pixelArt: true,
      parent: "game-arkanoid",
      physics: {
        default: 'arcade',
        arcade: {
        }
      },
      scene: [Menu, Niveles, Escena, GameOver, Win, Escena2, NextLevel],

      scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
      },

    };


    var game = new Phaser.Game(config);

    game.events.on("Listo", setListo)

    return () => {
      setListo(false);
      game.destroy(true);
    }

  }, [Listo]);
  return (
    <div id='game-arkanoid'></div>
  );

}

export default Arkanoid;