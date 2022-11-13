import Phaser from "phaser";

export class Menu extends Phaser.Scene {

  constructor() {
    super({ key: 'menu' });
  }
  
  //Aqui cargaremos e importaremos los archivos necesarios.
  preload() {
    this.load.image('fondoMenu', 'assets/spaceInvader/background/fondoMenu2.png');
    this.load.image('LogoJuego', 'assets/spaceInvader/background/Logo.png');
    this.load.image('LogoJuego1', 'assets/spaceInvader/background/Logo2.png');
    this.load.image('LogoJuego2', 'assets/spaceInvader/background/Logo3.png');
    this.load.image('playBoton', 'assets/spaceInvader/background/play.png');
    this.load.image('levelBoton', 'assets/spaceInvader/background/selectLevel.png');
  }
  //Aqui los ubicaremos y crearemos.
  create() {

    //se crean el fondo y el logo
    this.add.image(400, 300, 'fondoMenu');
    this.add.image(420, 150, "LogoJuego");

    //se crearn dos botones para jugar y seleccionar nivel. Tambien se escalan para agrandarlos
    var playBoton = this.add.sprite(400, 400, 'playBoton').setInteractive();
    var levelBoton = this.add.sprite(400, 500, 'levelBoton').setInteractive();
    playBoton.setScale(2, 2);
    levelBoton.setScale(2, 2);

    //Carga el primer nivel
    playBoton.on('pointerdown', function () {
      cargarEscena('Game')
    })

    //Carga el menu con los niveles 
    levelBoton.on('pointerdown', function () {
      cargarEscena('menuNiveles')
    })

    //const que funciona para cargar las escenas.
    const cargarEscena = (escena) => {
      this.scene.start(escena)
    }
  }
}