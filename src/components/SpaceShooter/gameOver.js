import Phaser from 'phaser';
import { RestartButton } from "./boton-Restart";

export class GameOver extends Phaser.Scene{
    
    constructor(){
        super({key:'gameover'});
        this.RestartButton = new RestartButton(this);
    }
    //Aqui cargaremos e importaremos los archivos necesarios.
    preload(){
        this.load.image('gameover', 'assets/spaceInvader/background/gameover1.png');
        this.RestartButton.preload();
    }
    //Aqui los ubicaremos y crearemos.
    create(){
        this.add.image(400,225, 'fondo');
        this.RestartButton.create();
        this.gameoverImage = this.add.image(400, 125, 'gameover');
        //en caso de perder se mostrara la pantalla de gameover y si se da un clic se recargara nuevamente la escena del juego.
        this.input.on('pointerdown',() =>{
            this.scene.start('menu');
        });
    }

}