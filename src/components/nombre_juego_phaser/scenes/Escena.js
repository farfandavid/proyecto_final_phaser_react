import Phaser from "phaser";

class Escena extends Phaser.Scene{

    preload()
    {
        this.load.image("espacio", 'assets/backgrounds/EspacioJuegoPhaserPrueba.jpg');

    }

    create()
    {
        this.add.image(400, 370, "espacio");
    }






}

export default Escena;