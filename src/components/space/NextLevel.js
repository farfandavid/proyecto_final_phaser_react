import Phaser from 'phaser';
import { NextLevelButton } from './boton-nextLevel';

export class NextLevel extends Phaser.Scene{

    constructor(){
        super({key:'NextLevel'});
        this.NextLevelButton = new NextLevelButton(this);
    }

    preload(){
        this.load.image('Ganaste', 'img/Win.png');
        this.load.image('SiguienteNivel', 'assets/spaceInvader/background/nextLevell.png');
        this.NextLevelButton.preload();
    }

    create(){
        this.add.image(400,225, 'fondo');
     
        this.NextLevelButton.create();
        this.GanasteImage = this.add.image(400, 125, 'Ganaste');
        this.input.on('pointerdown',() =>{
            this.scene.start('nivel2');
        });

    }
}
export default NextLevel;