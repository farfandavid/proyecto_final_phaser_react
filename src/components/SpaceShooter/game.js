import Phaser from "phaser";

export class Game extends Phaser.Scene {

    constructor() {
        super({key:'game'});     
    }

    preload(){
        this.load.image('fondo', './assets/Images/background.png');
        //this.load.image('gameover', 'images/grameover1.png');
    }


    create(){
        this.add.image(400, 200, 'fondo');
    }
    

}
export default Game;