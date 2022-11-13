import Phaser from 'phaser';
import {RestartButton} from './boton-Restart.js'

export class Win extends Phaser.Scene{
    
    constructor(){
        super({key:'Win'});
        this.RestartButton = new RestartButton(this);
    }

    preload(){
        this.load.image('fondoNivel2', 'assets/spaceInvader/background/fondoNivel2.jpg');
        this.RestartButton.preload();
    }

    create(){
        this.add.image(400,225, 'fondoNivel2');
        this.RestartButton.create();
        this.GanasteImage = this.add.image(400, 125, 'ganaste');
        this.input.on('pointerdown',() =>{
            this.scene.start('menu');
        });
    }
}