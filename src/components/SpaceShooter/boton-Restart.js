export class RestartButton{

    constructor(scene){
        this.relatedScene = scene;
    }

    preload() {
        this.relatedScene.load.image('botonRestart', 'assets/spaceInvader/background/ResetButton.png');
    }

    create(){
        this.startButton = this.relatedScene.add.image(400,300, 'botonRestart');
        this.startButton.on('pointerdown', () => {
            this.scene.start('Game');
            console.log('entro');
        });
    }
}