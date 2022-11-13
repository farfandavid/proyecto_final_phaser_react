export class NextLevelButton{

    constructor(scene){
        this.relatedScene = scene;
    }

    preload() {
        this.relatedScene.load.image('botonNextLevel', 'assets/spaceInvader/background/nextLevell.png');
    }

    create(){
        this.startButton = this.relatedScene.add.image(400,300, 'botonNextLevel');
        this.startButton.on('pointerdown', () => {
            this.scene.start('nivel2');
            console.log('entro');
        });
    }
}