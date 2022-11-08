import Phaser from "phaser";
import Player from "./player";

export class Game extends Phaser.Scene {

    constructor() {
        super({key:'Game'});     
    }

    preload(){
        this.load.image('fondo', 'assets/spaceInvader/background/background.png');
        //this.load.image('gameover', 'img/grameover1.png');
    }


    create(){
        this.add.image(400, 200, 'fondo');
    }
    
}

export default Game;