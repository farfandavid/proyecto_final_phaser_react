import Phaser from "phaser";

export class Player extends Phaser.GameObjects.Sprite {

    constructor() {
        super({key:'Player'});
    }

    preload(){
        this.load.image('player', 'assets/spaceInvader/sprites/Player.png');
    }


    create(){
        


    }
    


}

export default Player;
