import Phaser from 'phaser';
import { NextLevelButton } from '../components/boton-nextLevel';

export class NextLevel extends Phaser.Scene {

    constructor() {
        super({ key: 'NextLevel' });
        this.NextLevelButton = new NextLevelButton(this);
    }

    preload() {
        this.load.image('Ganaste', 'assets/arkanoid/Win.png');
        this.load.image('SiguienteNivel', 'assets/arkanoid/nextLevell.png');
        this.NextLevelButton.preload();
    }

    create() {
        this.add.image(400, 225, 'fondo');

        this.NextLevelButton.create();
        this.GanasteImage = this.add.image(400, 125, 'Ganaste');
        this.input.on('pointerdown', () => {
            this.scene.start('Escena2');
        });

    }
}
export default NextLevel;