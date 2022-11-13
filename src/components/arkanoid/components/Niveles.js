import Phaser from "phaser";

export class Niveles extends Phaser.Scene {

  constructor() {
    super({ key: 'niveles' });
  }

  preload() {
    this.load.image('fondo', 'assets/arkanoid/fondo.png');
    this.load.image('nivel_1', 'assets/arkanoid/nivel_1.png');
    this.load.image('nivel_2', 'assets/arkanoid/nivel_2.png');
  }

  create() {
    this.add.image(400, 225, 'fondo');

    var nivel_1 = this.add.sprite(400, 100, "nivel_1").setInteractive();
    nivel_1.setScale(0.2, 0.2);
    nivel_1.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);

    var nivel_2 = this.add.sprite(400, 300, "nivel_2").setInteractive();
    nivel_2.setScale(0.2, 0.2);
    nivel_2.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);

    nivel_1.on('pointerdown', function () {
      cargarEscena('Escena')
    })

    nivel_2.on('pointerdown', function () {
      cargarEscena('Escena2')
    })


    const cargarEscena = (escena) => {
      this.scene.start(escena)
    }
  }
}