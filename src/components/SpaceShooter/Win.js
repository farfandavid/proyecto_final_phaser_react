import Phaser from 'phaser';
import {RestartButton} from './boton-Restart.js'

export class Win extends Phaser.Scene{
    
    constructor(){
        super({key:'Win'});
        this.RestartButton = new RestartButton(this);
    }

    preload(){
        this.load.image('ganaste', 'assets/spaceInvader/background/Win.png');
        this.RestartButton.preload();
    }

    create(){
        this.add.image(400,225, 'fondo');
        this.RestartButton.create();
        this.GanasteImage = this.add.image(400, 125, 'ganaste');
        this.input.on('pointerdown',() =>{
            this.scene.start('Game');
        });
    }
}