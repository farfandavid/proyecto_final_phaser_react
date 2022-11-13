import Phaser from "phaser";

export class MenuNiveles extends Phaser.Scene {

  constructor() {
    super({ key: 'menuNiveles' });
  }

  preload() {
    this.load.image('fondoMenu', 'assets/spaceInvader/background/fondoMenu2.png');
    this.load.image('nivel_1', 'assets/spaceInvader/background/Nivel1.png');
    this.load.image('nivel_2', 'assets/spaceInvader/background/Nivel2.png');   
    this.load.image('regresar', 'assets/spaceInvader/background/return (1).png');
  }

  create() {
    this.add.image(400, 300, 'fondoMenu');

    var nivel_1 = this.add.sprite(400, 140, "nivel_1").setInteractive();
    nivel_1.setScale(0.3, 0.3);

    var nivel_2 = this.add.sprite(400, 400, "nivel_2").setInteractive();
    nivel_2.setScale(0.3, 0.3);

    var regresarBoton = this.add.image(40, 40, 'regresar').setInteractive();

    nivel_1.on('pointerdown', function () {
      cargarEscena('Game')
    })

    nivel_2.on('pointerdown', function () {
      cargarEscena('nivel2')
    })
    regresarBoton.on('pointerdown', function () {
      cargarEscena('menu')
    })


    const cargarEscena = (escena) => {
      this.scene.start(escena)
    }
  }
}