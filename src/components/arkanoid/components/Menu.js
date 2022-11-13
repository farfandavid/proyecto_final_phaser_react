import Phaser from "phaser";

export class Menu extends Phaser.Scene {

  constructor() {
    super({ key: 'menu' });
  }

  preload() {
    this.load.image('fondo', 'assets/arkanoid/fondo.png');
    this.load.image('play_btn', 'assets/arkanoid/play_btn.png');
    this.load.image('load_btn', 'assets/arkanoid/load_btn.png');
  }

  create() {
    this.add.image(400, 225, 'fondo');

    var play_btn = this.add.sprite(400, 150, 'play_btn').setInteractive();
    var load_btn = this.add.sprite(400, 250, 'load_btn').setInteractive();

    play_btn.setScale(2, 2);
    load_btn.setScale(2, 2);


    //Carga el primer nivel Escena
    play_btn.on('pointerdown', function () {
      cargarEscena('Escena')
    })

    load_btn.on('pointerdown', function () {
      cargarEscena('niveles')
    })


    const cargarEscena = (escena) => {
      this.scene.start(escena)
    }
  }
}