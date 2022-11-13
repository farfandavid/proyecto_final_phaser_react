import Phaser from 'phaser';
import { Button } from './BotonRestart';

export class GameOver extends Phaser.Scene {

    currentScene = null;

    constructor() {
        super({ key: 'gameover' });
        //this.RestartButton = new RestartButton(this);
    }

    init(data) {
        //console.log(this.init, data);
        this.currentScene = data.escena;
        console.log(this.currentScene);
    }
    preload() {
        this.load.image('gameover', 'assets/arkanoid/gameover1.png');
        this.load.image('botonRestart', 'assets/arkanoid/Restart.png');
        //this.RestartButton.preload();
    }

    create() {


        const actionOnClick = () => {
            this.scene.start(this.currentScene);
        }
        this.add.image(400, 225, 'fondo');

        let btn1 = new Button(this, 400, 300, 'botonRestart', actionOnClick)
        btn1.onInputOut = () => {
            console.log('Btn1: onInputOut')
        }
        //this.RestartButton.create();
        this.gameoverImage = this.add.image(400, 125, 'gameover');
        /*this.input.on('pointerdown', () => {
            this.scene.start('Escena');
        });*/


    }

}