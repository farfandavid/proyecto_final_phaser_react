import Phaser from 'phaser';
import { RestartButton } from './boton-Restart.js'

export class Win extends Phaser.Scene {

    constructor() {
        super({ key: 'Win' });
        this.RestartButton = new RestartButton(this);
    }

    preload() {
        this.load.image('fondoNivel2', 'assets/spaceInvader/background/fondoNivel2.jpg');
        this.load.image('Win', 'assets/spaceInvader/background/Win.png');
        this.RestartButton.preload();
    }

    create() {
        this.add.image(400, 300, 'fondoNivel2');
        this.RestartButton.create();
        this.GanasteImage = this.add.image(400, 125, 'Win');
        this.input.on('pointerdown', () => {
            this.scene.start('menu');
        });
    }
}