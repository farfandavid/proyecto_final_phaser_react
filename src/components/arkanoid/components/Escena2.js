import Phaser from 'phaser';
import { TablaPuntaje } from '../components/TablaPuntaje';

export class Escena2 extends Phaser.Scene {

    constructor() {
        super({ key: 'Escena2' });
    }

    init() {
        this.TablaPuntaje = new TablaPuntaje(this);
    }

    preload() {
        this.load.image('fondo', 'assets/arkanoid/fondo.png');
        this.load.image('platform', 'assets/arkanoid/player.png');
        this.load.image('pelota', 'assets/arkanoid/pelota.png');
        this.load.image('bloqueRojo', 'assets/arkanoid/BloqueRojo.png');
        this.load.image('bloqueCeleste', 'assets/arkanoid/BloqueCeleste.png');
        this.load.image('bloqueMorado', 'assets/arkanoid/BloqueMorado.png');
        this.load.image('bloqueNaranja', 'assets/arkanoid/BloqueNaranja.png');
        this.load.image('bloqueRosado', 'assets/arkanoid/BloqueRosado.png');

    }

    create() {
        //Con esto gestionaremos las colisiones que se produzcan.
        this.physics.world.setBoundsCollision(true, true, true, false);
        //Se agrega el fondo.
        this.add.image(400, 225, 'fondo');
        //creamos la tabla del puntaje y asi visualizarlo.
        this.TablaPuntaje.create();
        //Aqui agregaremos los bloques.
        this.bloques = this.physics.add.staticGroup({
            key: ['bloqueRojo', 'bloqueCeleste', 'bloqueMorado', 'bloqueNaranja', 'bloqueRosado'],
            frameQuantity: 10,
            gridAlign: {
                widht: 10,
                height: 5,
                cellWidth: 67,
                cellHeight: 34,
                x: 100,
                y: 100
            }

        });

        //Se agrega el personaje, sus fisicas y evitamos que caiga por la gravedad.
        this.platforms = this.physics.add.image(400, 400, 'platform').setImmovable();
        this.platforms.body.allowGravity = false;

        //Agregamos la pelota con sus fisicas.
        this.ball = this.physics.add.image(400, 370, 'pelota');

        //Aqui veremos si la pelota esta "pegada" a nuestro player.
        this.ball.setData('pegada', true);

        //Le agregamos la colision a la pelota.
        this.physics.add.collider(this.ball, this.platforms, this.ImpactoPlataforma, null, this);
        this.physics.add.collider(this.ball, this.bloques, this.ImpactoBloque, null, this);
        //Aqui haremos que nuestra pelota pueda colisionar con nuestros bordes.
        this.ball.setCollideWorldBounds(true);
        this.platforms.setCollideWorldBounds(true);



        //Aqui le diremos cuantos rebotes hara al chocar con algo.
        this.ball.setBounce(1);
        //Añadimos movimiento a nuestro personaje con el objeto cursos.
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    //En esta parte veremos si nuestra pelota impacta con los bloques y si es asi los bloques desaparecen. Tambien comprobamos si la cantidad de bloques es 0 entonces se muestra la escena de victoria.
    ImpactoBloque(ball, bloques) {
        bloques.disableBody(true, true);
        this.TablaPuntaje.incrementoPuntaje(10);
        if (this.bloques.countActive() === 0) {
            this.showNextLevel();
        }
    }

    //Aqui veremos si la pelota colisiono con cierta parte de nuestra plataforma para mandarla en una direccion distinta.
    ImpactoPlataforma(ball, platforms) {
        let relativeImpact = ball.x - platforms.x;
        console.log(relativeImpact);
        if (relativeImpact < 0.1 && relativeImpact > -0.1) {
            ball.setVelocityX(Phaser.Math.Between(-10, 10))
        } else {
            ball.setVelocityX(8 * relativeImpact);
        }
    }

    update() {
        if (this.cursors.left.isDown) {
            this.platforms.setVelocityX(-600);
            if (this.ball.getData('pegada')) {
                this.ball.setVelocityX(-500);
            }
        }
        else if (this.cursors.right.isDown) {
            this.platforms.setVelocityX(600);
            if (this.ball.getData('pegada')) {
                this.ball.setVelocityX(500);
            }
        }
        else {
            this.platforms.setVelocityX(0);
            if (this.ball.getData('pegada')) {
                this.ball.setVelocityX(0);
            }
        }
        //Con esta linea de codigo haremos que si la posicion de la pelota es menor al limite del juego se muestre la pantalla de Game Over.
        if (this.ball.y > 500) {
            console.log('fin');
            this.showGameOver();
        }
        //En esta parte veremos si la tecla(de la flecha hacia arriba) fue presionada esta lanzara la pelota.
        if (this.cursors.up.isDown) {
            this.ball.setVelocity(-75, -300);
            this.ball.setData('pegada', false);
        }

    }

    showGameOver() {
        this.scene.start('gameover', { escena: 'Escena2' });
    }
    ShowWin() {
        this.scene.start('Win');
    }
    showNextLevel() {
        this.scene.start('Win');
    }

}

export default Escena2;
