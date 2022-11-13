import Phaser from 'phaser';


export class Win extends Phaser.Scene {

    constructor() {
        super({ key: 'Win' });
    }

    preload() {
        this.load.image('Ganaste', 'assets/arkanoid/Win.png');
        this.RestartButton.preload();
    }

    create() {
        this.add.image(400, 225, 'fondo');

        this.RestartButton.create();
        this.GanasteImage = this.add.image(400, 125, 'Ganaste');
        this.input.on('pointerdown', () => {
            this.scene.start('menu');
        });

    }
}