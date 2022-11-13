import Phaser from "phaser";

export class Menu extends Phaser.Scene {

  constructor() {
    super({ key: 'menu' });
  }

  preload() {
    this.load.image('fondo', 'assets/spaceInvader/background/background.png');
    this.load.image('playBoton', 'assets/spaceInvader/background/play.png');
    this.load.image('levelBoton', 'assets/spaceInvader/background/selectLevel.png');
  }

  create() {
    this.add.image(400, 300, 'fondo');

    var playBoton = this.add.sprite(400, 200, 'playBoton').setInteractive();
    var levelBoton = this.add.sprite(400, 350, 'levelBoton').setInteractive();

    playBoton.setScale(2, 2);
    levelBoton.setScale(2, 2);

    //Carga el primer nivel Escena
    playBoton.on('pointerdown', function () {
      cargarEscena('Game')
    })

    levelBoton.on('pointerdown', function () {
      cargarEscena('menuNiveles')
    })


    const cargarEscena = (escena) => {
      this.scene.start(escena)
    }
  }
}