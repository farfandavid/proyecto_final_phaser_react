export class NextLevelButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {
        this.relatedScene.load.image('botonNextLevel', 'assets/arkanoid/nextLevell.png');
    }

    create() {
        this.startButton = this.relatedScene.add.image(400, 300, 'botonNextLevel');
        this.startButton.on('pointerdown', () => {
            this.scene.start('Escena2');
            console.log('entro');
        });
    }
}