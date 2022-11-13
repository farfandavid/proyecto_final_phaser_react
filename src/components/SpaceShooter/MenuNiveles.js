import Phaser from "phaser";

export class MenuNiveles extends Phaser.Scene {

  constructor() {
    super({ key: 'menuNiveles' });
  }

  //Aqui cargaremos e importaremos los archivos necesarios.
  preload() {
    this.load.image('fondoMenu', 'assets/spaceInvader/background/fondoMenu2.png');
    this.load.image('nivel_1', 'assets/spaceInvader/background/Nivel1.png');
    this.load.image('nivel_2', 'assets/spaceInvader/background/Nivel2.png');   
    this.load.image('regresar', 'assets/spaceInvader/background/return (1).png');
  }

  //Aqui los ubicaremos y crearemos.
  create() {
    // se crea el fondo
    this.add.image(400, 300, 'fondoMenu');

    // se crean 2 imagenes interactivas para el nivel1, nivel2 y otra para regresar al menu 
    var nivel_1 = this.add.sprite(400, 140, "nivel_1").setInteractive();
    nivel_1.setScale(0.3, 0.3);

    var nivel_2 = this.add.sprite(400, 400, "nivel_2").setInteractive();
    nivel_2.setScale(0.3, 0.3);

    var regresarBoton = this.add.image(40, 40, 'regresar').setInteractive();

    // aqui se verifica si se presiono la imagen carga la respectiva escena
    nivel_1.on('pointerdown', function () {
      cargarEscena('Game')
    })

    nivel_2.on('pointerdown', function () {
      cargarEscena('nivel2')
    })
    regresarBoton.on('pointerdown', function () {
      cargarEscena('menu')
    })

    //const que funciona para cargar las escenas.
    const cargarEscena = (escena) => {
      this.scene.start(escena)
    }
  }
}