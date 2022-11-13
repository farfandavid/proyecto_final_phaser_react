import Phaser from "phaser";

export class Enemy extends Phaser.Scene {

        constructor() {
        super({key:'Enemy'});  
    }

    preload(){
        this.load.image('enemy', 'assets/spaceInvader/sprites/Enemigo.png');
        this.load.image('fondo', 'assets/spaceInvader/background/background.png');
    }


    create (){
               
        this.add.image(400, 300, 'fondo');


    }

}